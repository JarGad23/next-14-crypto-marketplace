import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "@/server";
import { NextRequest } from "next/server";
import { createTRPCContext } from "@/server/context";
import { getAuth } from "@clerk/nextjs/server";

const createContext = async (req: NextRequest) => {
  return createTRPCContext({
    headers: req.headers,
    auth: getAuth(req),
  });
};

const handler = (req: NextRequest) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () => createContext(req),
  });

export { handler as GET, handler as POST };
