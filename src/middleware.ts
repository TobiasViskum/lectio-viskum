import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { lectioAPI } from "./lib/lectio-api";

export async function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-url", request.url);

  const cookies = request.cookies;
  let obj = {
    username: cookies.get("username")?.value,
    password: cookies.get("password")?.value,
    schoolCode: cookies.get("schoolCode")?.value,
  };
  const revalidateCookies = request.url.includes("revalidateCookies=true");

  if (!revalidateCookies && cookies.get("lectioCookies")?.value) {
    return NextResponse.next({
      headers: requestHeaders,
    });
  }

  try {
    const data = z
      .object({
        username: z.string().min(1),
        password: z.string().min(1),
        schoolCode: z.string().min(1),
      })
      .parse(obj);

    const res = await lectioAPI.getIsAuthenticated(data);
    if (res && res.isAuthenticated) {
      const expireDate = new Date();
      expireDate.setFullYear(expireDate.getFullYear() + 1);
      if (request.url.includes("/log-ind")) {
        const newUrl = request.url.replace("revalidateCookies=true", "");

        const response = NextResponse.redirect(new URL("/", newUrl), {
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
        const nextUrl = request.nextUrl.clone();
        nextUrl.searchParams.delete("revalidateCookies");

        const response = NextResponse.redirect(nextUrl, {
          headers: requestHeaders,
        });
        response.cookies.set({
          name: "lectioCookies",
          value: res.lectioCookies,
          path: "/",
          expires: expireDate,
        });
        return response;
      }
    }
    return NextResponse.redirect(
      new URL("/log-ind?redirected=true", request.url),
      { headers: requestHeaders },
    );
  } catch {
    if (request.url.includes("/log-ind")) {
      return NextResponse.next({ headers: requestHeaders });
    }
    return NextResponse.redirect(
      new URL("/log-ind?redirected=true", request.url),
      { headers: requestHeaders },
    );
  }
}

export const config = {
  matcher: ["/", "/skema/:path*", "/afleveringer/:path*", "/log-ind"],
};
