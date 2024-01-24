import { router } from "./trpc";
import { walletRouter } from "./router/wallet";
import { salesRouter } from "./router/sales";
import { tokensRouter } from "./router/tokens";

export const appRouter = router({
  tokens: tokensRouter,
  wallet: walletRouter,
  sales: salesRouter,
});

export type AppRouter = typeof appRouter;
