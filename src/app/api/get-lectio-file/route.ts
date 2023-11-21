import { getLastAuthenticatedCookie } from "@/api-functions/getLastAuthenticatedCookie";
import { standardFetchOptions } from "@/api-functions/standardFetchOptions";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const href = searchParams.get("href");
  if (href) {
    const res = await fetch("https://www.lectio.dk" + href, {
      headers: { Cookie: getLastAuthenticatedCookie() },
      ...standardFetchOptions,
    })
      .then(async (res) => {
        try {
          const arrayBuffer = await res.arrayBuffer();
          const contentType = res.headers.get("content-type");
          const base64 = Buffer.from(arrayBuffer).toString("base64");
          const fullSrc = `data:${contentType};base64,${base64}`;

          return base64;
        } catch {
          return null;
        }
      })
      .catch(() => null);

    if (res !== null) {
      return NextResponse.json({
        status: "success",
        message: "Successfully got data",
        data: res,
      });
    }
  }

  throw new Error("Error");
}
