import { createTRPCReact } from "@trpc/react-query";
import { type AppRouter } from "@/server";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import superjson from "superjson";
import { env } from "@/lib/env/client";

export const trpc = createTRPCReact<AppRouter>();

export const trpcVanilla = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: `${env.NEXT_PUBLIC_BASE_URL}/api/t`,
    }),
  ],
  transformer: superjson,
});
