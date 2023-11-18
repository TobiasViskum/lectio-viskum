import { getLastAuthenticatedCookie } from "@/api-functions/getLastAuthenticatedCookie";
import { getIsAuthenticated } from "@/api-functions/scrapeFunctions/getIsAuthenticated";
import { standardFetchOptions } from "@/api-functions/standardFetchOptions";
import { getLectioProps } from "@/lib/auth/getLectioProps";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const lectioProps = getLectioProps();
  const username = lectioProps.username;
  const password = lectioProps.password;
  const schoolCode = lectioProps.schoolCode;

  const isCookiesValid = await fetch(
    `https://www.lectio.dk/lectio/${schoolCode}/forside.aspx`,
    {
      headers: { Cookie: getLastAuthenticatedCookie() },
      ...standardFetchOptions,
    },
  )
    .then(async (res) => {
      const text = await res.text();

      if (text.includes("Eleven ")) {
        return true;
      }
      return false;
    })
    .catch(() => false);

  if (isCookiesValid) {
    return NextResponse.json({
      status: "success",
      message: "Existing cookies were valid",
    });
  }

  const res = await getIsAuthenticated({
    username: username,
    password: password,
    schoolCode: schoolCode,
  });

  if (res) {
    if (res === "Forbidden access" || res === "Invalid school") {
      return NextResponse.json({ status: "error", message: res });
    } else {
      const expireDate = new Date();
      expireDate.setFullYear(expireDate.getFullYear() + 1);

      if (res.isAuthenticated) {
        return NextResponse.json(
          { status: "success", message: "Updated cookies" },
          {
            headers: {
              "Set-Cookie": `lectioCookies=${encodeURIComponent(
                res.lectioCookies,
              )}; Path=/; Expires=${expireDate}`,
            },
          },
        );
      } else {
        redirect("/log-ind?redirected=true");
      }
    }
  }
  return NextResponse.json({ status: "error", message: "Lectio is down" });
}
