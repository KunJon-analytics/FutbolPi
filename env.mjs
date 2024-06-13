import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    PI_PLATFORM_API_URL: z.string().url(),
    PI_API_KEY: z.string().min(1),
    AUTH_SECRET: z.string().min(1),
    FOOTBALL_API_KEY: z.string().min(1),
    TELEGRAM_BOT_TOKEN: z.string().min(1),
    TELEGRAM_PRIVATE_CHANNEL: z.string().min(1),
    TELEGRAM_PUBLIC_CHANNEL: z.string().min(1),
    NODE_ENV: z.enum(["development", "production", "test"]),
  },
  client: {
    NEXT_PUBLIC_APP_URL: z.string().url(),
    NEXT_PUBLIC_SUPPORT_EMAIL: z.string().email(),
    NEXT_PUBLIC_ADMIN_USERNAME: z.string().min(1),
    NEXT_PUBLIC_GOOGLE_TAG: z.string().min(1),
  },
  runtimeEnv: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_SUPPORT_EMAIL: process.env.NEXT_PUBLIC_SUPPORT_EMAIL,
    NEXT_PUBLIC_ADMIN_USERNAME: process.env.NEXT_PUBLIC_ADMIN_USERNAME,
    NODE_ENV: process.env.NODE_ENV,
    AUTH_SECRET: process.env.AUTH_SECRET,
    // PI NETWORK
    PI_PLATFORM_API_URL: process.env.PI_PLATFORM_API_URL,
    PI_API_KEY: process.env.PI_API_KEY,
    // FOOTBALL API
    FOOTBALL_API_KEY: process.env.FOOTBALL_API_KEY,
    // GOOGLE ANALYTICS
    NEXT_PUBLIC_GOOGLE_TAG: process.env.NEXT_PUBLIC_GOOGLE_TAG,
    // TELEGRAM BOT
    TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN,
    TELEGRAM_PUBLIC_CHANNEL: process.env.TELEGRAM_PUBLIC_CHANNEL,
    TELEGRAM_PRIVATE_CHANNEL: process.env.TELEGRAM_PRIVATE_CHANNEL,
  },
});
