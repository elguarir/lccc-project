import { httpBatchLink } from "@trpc/client";

import { appRouter } from "@/server";
import { env } from "@/lib/env/server";

export const serverClient = appRouter.createCaller({
  links: [
    httpBatchLink({
      url: `${env.BASE_URL}/api/t`,
    }),
  ],
});