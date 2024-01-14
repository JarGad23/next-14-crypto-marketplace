import { privateProcedure, publicProcedure, router } from "./trpc";

export const appRouter = router({
  getTodos: publicProcedure.query(async ({ ctx }) => {
    return {
      greetings: `hello: ${ctx.auth?.userId}`,
    };
  }),
  createTodo: privateProcedure.query(({ ctx }) => {
    return {
      data: `This is protected procedure, request sended by user with Id ${ctx.auth?.userId}`,
    };
  }),
});

export type AppRouter = typeof appRouter;
