import * as z from "zod";
import { privateProcedure, publicProcedure, router } from "../trpc";
import { createTokenSchema } from "@/schemas";
import { getUserById } from "@/lib/get-user";
import { TRPCError } from "@trpc/server";
import { db } from "@/lib/db";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";

export const tokensRouter = router({
  createToken: privateProcedure
    .input(createTokenSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const { userId } = ctx;
        const { name, price, quantity, imageUrl } = input;
        const user = await getUserById(userId);

        const userFullName = `${user.firstName} ${user.lastName}` || "User";

        if (!userId) {
          throw new TRPCError({ code: "UNAUTHORIZED" });
        }

        if (!name || !price || !quantity || !imageUrl) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Missing required data",
          });
        }

        const capitalizeName = name.charAt(0).toUpperCase() + name.substring(1);

        const existingToken = await db.token.findFirst({
          where: {
            name: {
              equals: name.charAt(0).toUpperCase() + name.substring(1),
              mode: "insensitive",
            },
          },
        });

        if (existingToken) {
          throw new TRPCError({
            code: "CONFLICT",
            message: "Token with that name already exists",
          });
        }

        const token = await db.token.create({
          data: {
            name: capitalizeName,
            price,
            quantity,
            imageUrl,
            creatorUserName: userFullName,
          },
        });

        const userToken = await db.userWallet.create({
          data: {
            userId,
            tokenId: token.id,
            userQuantityOfToken: token.quantity,
          },
        });

        return { token, userToken };
      } catch (error: any) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message,
        });
      }
    }),
  getToken: publicProcedure
    .input(
      z.object({
        tokenId: z.string(),
      })
    )
    .query(async ({ input }) => {
      const { tokenId } = input;

      if (!tokenId) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Missing token Id",
        });
      }

      const token = await db.token.findFirst({
        where: {
          id: tokenId,
        },
      });

      if (!token) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Token not found" });
      }

      return { token };
    }),
  buyToken: privateProcedure
    .input(
      z.object({
        saleId: z.string(),
        quantityForBuy: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx;
      const { saleId, quantityForBuy } = input;

      const user = await getUserById(userId);

      if (!userId) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      if (!saleId || !quantityForBuy) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Missing required saleId or quantity for buy",
        });
      }

      const existingSale = await db.tokenForSale.findFirst({
        where: {
          id: saleId,
        },
      });

      if (!existingSale) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Sale not found" });
      }

      if (quantityForBuy > existingSale.quantityForSale) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "You cannot buy more than quantity for sale",
        });
      }

      let transaction = await db.transaction.create({
        data: {
          tokenId: existingSale.tokenId,
          quantity: quantityForBuy,
          pricePerToken: existingSale.pricePerToken,
          sellerUserId: existingSale.sellerUserId,
          buyerUserId: userId,
          transactionState: "PENDING",
        },
        include: {
          token: true,
        },
      });

      const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [
        {
          quantity: quantityForBuy,
          price_data: {
            currency: "USD",
            product_data: {
              name: transaction.token.name,
              images: [transaction.token.imageUrl!],
            },
            unit_amount: Math.round(transaction.pricePerToken * 100),
          },
        },
      ];

      let stripeCustomer = await db.stripeCustomer.findUnique({
        where: {
          userId,
        },
        select: {
          stripeCustomerId: true,
        },
      });

      if (!stripeCustomer) {
        const customer = await stripe.customers.create({
          email: user.emailAddresses[0].emailAddress,
        });

        stripeCustomer = await db.stripeCustomer.create({
          data: {
            userId,
            stripeCustomerId: customer.id,
          },
        });
      }

      const session = await stripe.checkout.sessions.create({
        customer: stripeCustomer.stripeCustomerId,
        line_items,
        mode: "payment",
        success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/dashboard/wallet`,
        cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/dashboard/browse?canceled=1`,
        metadata: {
          transactionId: transaction.id,
          saleId: existingSale.id,
          userId,
        },
      });

      return session.url;
    }),
});
