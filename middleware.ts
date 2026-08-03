import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { STUDIO_COOKIE, isValidStudioSession } from "@/lib/studio-auth";

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  if (path === "/exam-prep" || path.startsWith("/exam-prep/")) {
    const url = req.nextUrl.clone();
    url.pathname = path.replace(/^\/exam-prep/, "/skills");
    return NextResponse.redirect(url);
  }

  // Studio pages and their APIs require a valid signed session. The unlock
  // screen and the auth endpoint itself stay reachable.
  const isStudioPage =
    (path === "/studio" || path.startsWith("/studio/")) && path !== "/studio/unlock";
  const isProtectedStudioApi =
    path.startsWith("/api/studio/") && !path.startsWith("/api/studio/auth");

  if (isStudioPage || isProtectedStudioApi) {
    const authorized = await isValidStudioSession(req.cookies.get(STUDIO_COOKIE)?.value);
    if (!authorized) {
      if (isProtectedStudioApi) {
        return NextResponse.json({ error: "Not authorized." }, { status: 401 });
      }
      const url = req.nextUrl.clone();
      url.pathname = "/studio/unlock";
      url.search = path === "/studio" ? "" : `?next=${encodeURIComponent(path)}`;
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Studio APIs are matched explicitly; everything else skips /api.
    "/api/studio/:path*",
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|txt|xml|webmanifest)$).*)",
  ],
};
