import { router } from "./trpc";
import { walletRouter } from "./router/wallet";
import { salesRouter } from "./router/sales";
import { tokensRouter } from "./router/tokens";
import { transactionsRouter } from "./router/transactions";

export const appRouter = router({
  tokens: tokensRouter,
  wallet: walletRouter,
  sales: salesRouter,
  transactions: transactionsRouter,
});

export type AppRouter = typeof appRouter;
