import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-url", pathname + search);

  const cookies = req.cookies;
  const username = cookies.get("username")?.value;
  const password = cookies.get("password")?.value;
  const schoolCode = cookies.get("schoolCode")?.value;
  const lectioCookies = cookies.get("lectioCookies")?.value;
  const userId = cookies.get("userId")?.value;

  if (!username || !password || !schoolCode || !lectioCookies || !userId) {
    return NextResponse.redirect(new URL("/log-ind?redirected=true", req.url), {
      headers: requestHeaders,
    });
  }

  if (
    req.nextUrl.pathname === "/skema" ||
    req.nextUrl.pathname === "/skema/elev" ||
    req.nextUrl.pathname === "/skema/lære"
  ) {
    return NextResponse.redirect(new URL(`/skema/elev/${userId}`, req.url), {
      headers: requestHeaders,
    });
  }

  if (lectioCookies) {
    if (req.nextUrl.pathname === "/") {
      return NextResponse.redirect(new URL("/forside", req.url), {
        headers: requestHeaders,
      });
    }
    return NextResponse.next({
      headers: requestHeaders,
    });
  }

  return NextResponse.next({
    headers: requestHeaders,
  });
}

export const config = {
  matcher: [
    "/",
    "/skema/:path*",
    "/afleveringer/:path*",
    "/forside",
    "/opdater-adgang",
    "/beskeder",
    "/indstillinger",
    "/lektier",
  ],
};
