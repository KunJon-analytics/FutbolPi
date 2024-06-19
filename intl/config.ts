import { Pathnames, LocalePrefix } from "next-intl/routing";

export const defaultLocale = "en" as const;
export const locales = ["en"] as const;

export const pathnames: Pathnames<typeof locales> = {
  "/": "/",
  "/app/competitions": {
    en: "/app/competitions",
  },
  "/app/login": {
    en: "/app/login",
  },
  "/app/settings/appearance": {
    en: "/app/settings/appearance",
  },
  "/app/settings/user": {
    en: "/app/settings/user",
  },
  "/legal/terms": {
    en: "/legal/terms",
  },
  "/legal/privacy": {
    en: "/legal/privacy",
  },
  "/about": {
    en: "/about",
  },
};

export const localePrefix: LocalePrefix<typeof locales> = "always";

export const port = process.env.PORT || 3000;
export const host = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : `http://localhost:${port}`;
