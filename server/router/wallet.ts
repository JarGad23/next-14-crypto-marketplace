import * as z from "zod";
import { privateProcedure, router } from "../trpc";
import { TRPCError } from "@trpc/server";
import { db } from "@/lib/db";

export const walletRouter = router({
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
  getTokenFromUserWallet: privateProcedure
    .input(
      z.object({
        walletUserId: z.string(),
        tokenId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { userId } = ctx;
      const { walletUserId, tokenId } = input;

      if (!userId || walletUserId !== userId) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      if (!tokenId) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Miisting token ID",
        });
      }

      const tokenFromUserWallet = await db.userWallet.findFirst({
        where: {
          userId: walletUserId,
          tokenId,
        },
        include: {
          token: true,
        },
      });

      if (!tokenFromUserWallet) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      return tokenFromUserWallet;
    }),
});
