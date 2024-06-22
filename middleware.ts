import type { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";

import { locales, defaultLocale, localePrefix, pathnames } from "./intl/config";

const intlMiddleware = createMiddleware({
  defaultLocale,
  locales,
  localePrefix,
  pathnames,
});

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
  return intlMiddleware(req);
}

// See "Matching Paths" below to learn more
export const config = {
  // Skip all paths that should not be internationalized
  matcher: ["/", "/(zh|en|ko)/:path*"],
};
