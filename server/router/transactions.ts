import * as z from "zod";
import { privateProcedure, router } from "../trpc";
import { TRPCError } from "@trpc/server";
import { db } from "@/lib/db";

export const transactionsRouter = router({
  getUserTransactions: privateProcedure.query(async ({ ctx }) => {
    const { userId } = ctx;

    if (!userId) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    const userSales = await db.transaction.findMany({
      where: {
        sellerUserId: userId,
      },
      include: {
        token: true,
      },
    });

    const userOrders = await db.transaction.findMany({
      where: {
        buyerUserId: userId,
      },
      include: {
        token: true,
      },
    });

    return { userSales, userOrders };
  }),
});
