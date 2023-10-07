import {
  FetchCreateContextFnOptions,
  fetchRequestHandler,
} from "@trpc/server/adapters/fetch";
import { appRouter } from "@/server";

const handler = (req: Request) =>

  fetchRequestHandler({
    endpoint: "/api/t",
    req,
    router: appRouter,
    createContext: function (
      opts: FetchCreateContextFnOptions,
    ): object | Promise<object> {
      return {
        req: opts.req,
      };
    },
  });

export { handler as GET, handler as POST };
