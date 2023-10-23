import { NextRequest, NextResponse } from "next/server";
import { lectioAPI } from "./lib/lectio-api";

export async function middleware(req: NextRequest) {
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-url", req.url);

  const cookies = req.cookies;

  const revalidateCookies = req.url.includes("revalidateCookies=true");
  if (revalidateCookies) {
    let newUrl = req.url;
    newUrl = newUrl.replace("revalidateCookies=true", "");

    const username = cookies.get("username")?.value;
    const password = cookies.get("password")?.value;
    const schoolCode = cookies.get("schoolCode")?.value;

    if (!username || !password || !schoolCode) {
      return NextResponse.redirect(
        new URL("/log-ind?redirected=true", newUrl),
        {
          headers: requestHeaders,
        },
      );
    }

    const res = await lectioAPI.getIsAuthenticated({
      username: username,
      password: password,
      schoolCode: schoolCode,
    });

    if (res && res.isAuthenticated) {
      const expireDate = new Date();
      expireDate.setFullYear(expireDate.getFullYear() + 1);
      const response = NextResponse.next({
        headers: requestHeaders,
      });
      response.cookies.set({
        name: "lectioCookies",
        value: res.lectioCookies,
        path: "/",
        expires: expireDate,
      });
      return response;
    } else {
      return NextResponse.redirect(
        new URL("/log-ind?redirected=true", newUrl),
        {
          headers: requestHeaders,
        },
      );
    }
  }

  const lectioCookies = cookies.get("lectioCookies")?.value;
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
  matcher: ["/", "/skema/:path*", "/afleveringer/:path*", "/forside"],
};
