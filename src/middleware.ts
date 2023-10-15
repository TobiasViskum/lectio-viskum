import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function middleware(request: NextRequest) {
  const cookies = request.cookies;

  let obj = {
    username: cookies.get("username")?.value,
    password: cookies.get("password")?.value,
    schoolCode: cookies.get("schoolCode")?.value,
  };

  try {
    z.object({
      username: z.string().min(1),
      password: z.string().min(1),
      schoolCode: z.string().min(1),
    }).parse(obj);

    if (request.url.includes("/log-ind")) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
  } catch {
    if (request.url.includes("/log-ind")) {
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL("/log-ind?redirected=true", request.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|sw.|!).*)"],
};
