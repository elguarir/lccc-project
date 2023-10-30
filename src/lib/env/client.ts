import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  client: {
    NEXT_PUBLIC_BASE_URL: z.string().nonempty(),
    NEXT_PUBLIC_MAPBOX_API_TOKEN: z.string().nonempty(),
  },
  runtimeEnv: {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    NEXT_PUBLIC_MAPBOX_API_TOKEN: process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN,
  },
});
