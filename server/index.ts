import * as z from "zod";
import { privateProcedure, publicProcedure, router } from "./trpc";
import { createTokenSchema } from "@/schemas";
import { TRPCError } from "@trpc/server";
import { db } from "@/lib/db";
import { getUserById } from "@/lib/get-user";

export const appRouter = router({
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
  getSelledTokensForSeller: privateProcedure.query(async ({ ctx }) => {
    const { userId } = ctx;

    const selledTokens = await db.tokenForSale.findMany({
      where: {
        sellerUserId: userId,
      },
      include: {
        token: true,
      },
    });

    return selledTokens;
  }),
  getTokensForSale: publicProcedure.query(async ({ ctx }) => {
    const { userId } = ctx;

    let tokensForSale;

    if (!userId) {
      tokensForSale = await db.tokenForSale.findMany({
        include: {
          token: true,
        },
      });

      return { tokensForSale };
    }

    tokensForSale = await db.tokenForSale.findMany({
      where: {
        NOT: {
          sellerUserId: userId,
        },
      },
      include: {
        token: true,
      },
    });

    return { tokensForSale };
  }),
  sellToken: privateProcedure
    .input(
      z.object({
        tokenId: z.string(),
        quantityForSale: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx;
      const { tokenId, quantityForSale } = input;

      if (!userId) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      if (!tokenId || !quantityForSale) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Missing required tokenId or quantityForSale",
        });
      }

      const existingToken = await db.token.findFirst({
        where: {
          id: tokenId,
        },
      });

      if (!existingToken) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Token with provided Id not found",
        });
      }

      if (existingToken.quantity < quantityForSale) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Quantity for sale cannot be higher than quantity of token",
        });
      }

      await db.userWallet.update({
        where: {
          userId_tokenId: {
            userId,
            tokenId,
          },
        },
        data: {
          userQuantityOfToken: {
            decrement: quantityForSale,
          },
        },
      });

      const existingTokenSale = await db.tokenForSale.findFirst({
        where: {
          sellerUserId: userId,
          tokenId,
        },
      });

      let tokenForSale;

      if (existingTokenSale) {
        tokenForSale = await db.tokenForSale.update({
          where: {
            tokenId_sellerUserId: {
              tokenId: existingTokenSale.tokenId,
              sellerUserId: existingTokenSale.sellerUserId,
            },
          },
          data: {
            quantityForSale: {
              increment: quantityForSale,
            },
          },
        });

        return tokenForSale;
      }

      tokenForSale = await db.tokenForSale.create({
        data: {
          tokenId,
          sellerUserId: userId,
          quantityForSale,
          pricePerToken: existingToken.price,
        },
      });

      return tokenForSale;
    }),
  getUserWallet: privateProcedure
    .input(
      z.object({
        walletUserId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { walletUserId } = input;
      const { userId } = ctx;

      if (!userId || walletUserId !== userId) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      const userWallet = await db.userWallet.findMany({
        where: {
          userId: walletUserId,
        },
        include: {
          token: true,
        },
      });

      if (!userWallet) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Wallet not found" });
      }

      return userWallet;
    }),
});

export type AppRouter = typeof appRouter;
