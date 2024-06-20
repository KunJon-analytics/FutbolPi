import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import createMiddleware from "next-intl/middleware";

import { SessionData } from "./types";
import { locales, defaultLocale, localePrefix, pathnames } from "./intl/config";
import { sessionOptions } from "./lib/session";

const publicAppPaths = [
  "/app/sign-in",
  "/app/sign-up",
  "/app/login",
  "/",
  "/about",
  "/legal/privacy",
  "/legal/terms",
  "/blog/iphone-enable-cookies",
];

const intlMiddleware = createMiddleware({
  defaultLocale,
  locales,
  localePrefix,
  pathnames,
});

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  const publicPathnameRegex = RegExp(
    `^(/(${locales.join("|")}))?(${publicAppPaths
      .flatMap((p) => (p === "/" ? ["", "/"] : p))
      .join("|")})/?$`,
    "i"
  );

  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);

  if (!session.isLoggedIn && !isPublicPage) {
    return NextResponse.redirect(
      new URL(
        `/app/login?redirectTo=${encodeURIComponent(req.nextUrl.href)}`,
        req.url
      )
    );
  } else {
    return intlMiddleware(req);
  }
}

// See "Matching Paths" below to learn more
export const config = {
  // Skip all paths that should not be internationalized
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
