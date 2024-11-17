import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "production"]),
    DATABASE_URL: z.string().url(),
    REPLICATE_API_TOKEN: z.string(),
    STRIPE_SECRET_KEY: z.string(),
    STRIPE_PRICE_9: z.string(),
    STRIPE_PRICE_PROD_9: z.string(),
    STRIPE_WEBHOOK_SECRET: z.string(),
  },
  client: {},
  experimental__runtimeEnv: {
    NEXT_PUBLIC_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_PUBLISHABLE_KEY,
  },
});
