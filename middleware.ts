import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { getIronSession } from "iron-session";

import { SessionData } from "./types";
import { sessionOptions } from "./lib/session";

const publicAppPaths = ["/app/sign-in", "/app/sign-up", "/app/login"];

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  const pathname = req.nextUrl.pathname;

  const isPublicAppPath = publicAppPaths.some((path) =>
    pathname.startsWith(path)
  );

  if (!session.isLoggedIn && !isPublicAppPath) {
    return NextResponse.redirect(
      new URL(
        `/app/login?redirectTo=${encodeURIComponent(req.nextUrl.href)}`,
        req.url
      )
    );
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/app/:path*",
};
