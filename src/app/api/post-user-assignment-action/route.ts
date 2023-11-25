import { getLastAuthenticatedCookie } from "@/api-functions/getLastAuthenticatedCookie";
import { getAuthenticatedPage } from "@/api-functions/getPage";
import { getUserActionAssignmentForm } from "@/api-functions/getPage/getForm/add-user-action-assignment-form";
import { getAssignmentTag } from "@/api-functions/getTags";
import { getLectioProps } from "@/lib/auth/getLectioProps";
import { getRedisClient } from "@/lib/get-redis-client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  let deleteIndex = 0;
  const foundDeleteIndex = Number(searchParams.get("deleteIndex"));
  if (!isNaN(foundDeleteIndex)) {
    deleteIndex = foundDeleteIndex;
  }

  const lectioProps = getLectioProps();
  const userId = lectioProps.userId;
  const schoolCode = lectioProps.schoolCode;

  const {
    assignmentId,
    newUserId,
  }: { assignmentId: string; newUserId: string } = await req.json();

  const url = `ElevAflevering.aspx?elevid=${userId}&exerciseid=${assignmentId}&prevurl=OpgaverElev.aspx`;

  const res = await getAuthenticatedPage({
    specificPage: url,
  });
  if (res === null || typeof res === "string") {
    return NextResponse.json({
      status: "error",
      message: res || "Unkown error",
    });
  }
  const $ = res.$;
  const fetchCookie = res.fetchCookie;
  const __VIEWSTATEY_KEY = $("#__VIEWSTATEY_KEY").val();
  const __EVENTVALIDATION = $("#__EVENTVALIDATION").val();
  const masterfootervalue = $("input[name='masterfootervalue']").val();

  if (__EVENTVALIDATION && __VIEWSTATEY_KEY && masterfootervalue) {
    const form = getUserActionAssignmentForm(
      __EVENTVALIDATION,
      __VIEWSTATEY_KEY,
      masterfootervalue,
      newUserId,
      deleteIndex,
    );

    const isSuccess = await fetchCookie(
      `https://www.lectio.dk/lectio/${schoolCode}/` + url,
      {
        method: "POST",
        body: form,
        headers: { Cookie: getLastAuthenticatedCookie() },
      },
    )
      .then(async (response) => {
        const text = await response.text();
        if (text.includes("Kan ikke tilføje et medlem som har en aflevering")) {
          return false;
        } else if (text.includes("Eleven ")) {
          return true;
        }

        return null;
      })
      .catch((e) => {
        return null;
      });
    if (isSuccess !== null) {
      const client = await getRedisClient();
      if (client) {
        const tag = getAssignmentTag(userId, assignmentId);
        await client.json.del(tag, "$");
        await client.quit();
      }

      return NextResponse.json({
        status: "success",
        data: { isSuccess: isSuccess },
        message: "Event was successful",
      });
    }
  }

  return NextResponse.json({
    status: "error",
    message: "Could not add user for unknown reasons",
  });
}
