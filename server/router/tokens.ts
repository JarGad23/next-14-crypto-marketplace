import * as z from "zod";
import { privateProcedure, publicProcedure, router } from "../trpc";
import { createTokenSchema } from "@/schemas";
import { getUserById } from "@/lib/get-user";
import { TRPCError } from "@trpc/server";
import { db } from "@/lib/db";

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
      let url = "";
      return url;
    }),
});
