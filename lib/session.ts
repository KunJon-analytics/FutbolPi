import { SessionOptions } from "iron-session";

import { env } from "@/env.mjs";
import { siteConfig } from "@/config/site";

export const sessionOptions: SessionOptions = {
  password: env.AUTH_SECRET,
  cookieName: siteConfig.name,
  ttl: 35000,
  cookieOptions: {
    // secure only works in `https` environments
    // if your localhost is not on `https`, then use: `secure: process.env.NODE_ENV === "production"`
    secure: process.env.NODE_ENV === "production",
    maxAge: undefined,
    sameSite: process.env.NODE_ENV === "production" ? "strict" : "none",
    httpOnly: true,
  },
};
