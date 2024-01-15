import * as trpc from "@trpc/server";
import { getAuth } from "@clerk/nextjs/server";

type AuthContext = ReturnType<typeof getAuth>;

export const createTRPCContext = async (opts: {
  headers: Headers;
  auth: AuthContext;
}) => {
  return {
    userId: opts.auth.userId,
    ...opts,
  };
};

export type Context = trpc.inferAsyncReturnType<typeof createTRPCContext>;
