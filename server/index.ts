import * as z from "zod";
import { privateProcedure, publicProcedure, router } from "./trpc";
import { createTokenSchema } from "@/schemas";
import { TRPCError } from "@trpc/server";
import { db } from "@/lib/db";

export const appRouter = router({
  createToken: privateProcedure
    .input(createTokenSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const { userId } = ctx;
        const { name, price, quantity, imageUrl } = input;

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
            creatorUserId: userId,
          },
        });

        const userToken = await db.userWallet.create({
          data: {
            userId: token.creatorUserId,
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
      });

      if (userWallet.length === 0) {
        return { data: "You dont have any tokens in your wallet" };
      }

      if (!userWallet) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Wallet not found" });
      }

      return { data: userWallet };
    }),
});

export type AppRouter = typeof appRouter;
