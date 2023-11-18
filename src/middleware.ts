import { NextRequest, NextResponse } from "next/server";
import { lectioAPI } from "./lib/lectio-api";
import { getLastAuthenticatedCookie } from "./api-functions/getLastAuthenticatedCookie";

export async function middleware(req: NextRequest) {
  const cookies = req.cookies;
  const username = cookies.get("username")?.value;
  const password = cookies.get("password")?.value;
  const schoolCode = cookies.get("schoolCode")?.value;
  const lectioCookies = cookies.get("lectioCookies")?.value;
  const userId = cookies.get("userId")?.value;

  const { pathname } = req.nextUrl;
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    pathname.startsWith("/log-ind") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/manifest.json") ||
    pathname.startsWith("/icon")
  ) {
    return NextResponse.next();
  }

  if (pathname.includes("/lectio/")) {
    return NextResponse.next({
      headers: { Cookie: getLastAuthenticatedCookie() },
    });
  }

  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-url", pathname + req.nextUrl.search);

  let xSidebar: XSidebar = "none";

  requestHeaders.set("x-sidebar", "none");

  if (req.nextUrl.pathname === "/afleveringer") {
    xSidebar = "all-assignments";
  } else if (req.nextUrl.pathname.includes("/afleveringer/")) {
    xSidebar = "assignment";
  } else if (req.nextUrl.pathname.includes("/elevfeedback")) {
    xSidebar = "student-feedback";
  } else if (req.nextUrl.pathname.includes("/modul/")) {
    xSidebar = "lesson";
  }
  requestHeaders.set("x-sidebar", xSidebar);

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

  if (req.nextUrl.pathname === "/opdater-adgang") {
    const res = await lectioAPI.getIsAuthenticated({
      username: username,
      password: password,
      schoolCode: schoolCode,
    });

    if (res && res.isAuthenticated) {
      const expireDate = new Date();
      expireDate.setFullYear(expireDate.getFullYear() + 1);
      const response = NextResponse.redirect(new URL("/forside", req.url), {
        headers: requestHeaders,
      });

      response.cookies.set({
        name: "lectioCookies",
        value: res.lectioCookies,
        path: "/",
        expires: expireDate,
      });
      response.cookies.set({
        name: "userId",
        value: res.studentId,
        path: "/",
        expires: expireDate,
      });
      return response;
    } else {
      return NextResponse.redirect(
        new URL("/log-ind?redirected=true", req.url),
        {
          headers: requestHeaders,
        },
      );
    }
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

// export const config = {
//   matcher: [
//     "/",
//     "/skema/:path*",
//     "/afleveringer/:path*",
//     "/forside",
//     "/opdater-adgang",
//     "/beskeder",
//     "/indstillinger",
//     "/lektier",
//   ],
// };
