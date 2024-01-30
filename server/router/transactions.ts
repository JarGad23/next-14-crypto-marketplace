import * as z from "zod";
import { privateProcedure, router } from "../trpc";
import { TRPCError } from "@trpc/server";
import { db } from "@/lib/db";
import { Sale } from "@/app/dashboard/_components/columns";

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
  getSalesDataForTable: privateProcedure.query(async ({ ctx }) => {
    const { userId } = ctx;

    if (!userId) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    const userSales = await db.transaction.findMany({
      where: {
        sellerUserId: userId,
      },
      select: {
        token: {
          select: {
            name: true,
          },
        },
        quantity: true,
        pricePerToken: true,
      },
    });

    if (!userSales) {
      throw new TRPCError({ code: "NOT_FOUND" });
    }

    const resultData = userSales.map((sale): Sale => {
      return {
        name: sale.token.name,
        quantity: sale.quantity,
        total: sale.pricePerToken * sale.quantity,
      };
    });
    return resultData;
  }),
});
