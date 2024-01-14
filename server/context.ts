import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import {
  getAuth,
  SignedInAuthObject,
  SignedOutAuthObject,
} from "@clerk/nextjs/server";

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

// interface AuthContext {
//   auth: SignedInAuthObject | SignedOutAuthObject;
// }

// export const createContextInner = async ({ auth }: AuthContext) => {
//   return {
//     auth,
//   };
// };

// export const createContext = async (
//   opts: trpcNext.CreateNextContextOptions
// ) => {
//   return await createContextInner({ auth: getAuth(opts.req) });
// };

export type Context = trpc.inferAsyncReturnType<typeof createTRPCContext>;
