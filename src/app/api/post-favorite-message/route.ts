import { getLastAuthenticatedCookie } from "@/api-functions/getLastAuthenticatedCookie";
import { getAuthenticatedPage } from "@/api-functions/getPage";
import { getMessagesTag } from "@/api-functions/getTags";
import { standardFetchOptions } from "@/api-functions/standardFetchOptions";
import { getLectioProps } from "@/lib/auth/getLectioProps";
import { getRedisClient } from "@/lib/get-redis-client";
import { load } from "cheerio";
import { NextRequest, NextResponse } from "next/server";

function getFavoriteMessageForm(
  messageId: string,
  __VIEWSTATE: string,
  masterfootervalue: string,
  doDelete: boolean = false,
) {
  const form = new FormData();

  form.append("time", "0");
  form.append("__EVENTTARGET", "__Page");
  form.append(
    "__EVENTARGUMENT",
    `${doDelete ? "UN" : ""}FLAGMESSAGE_${messageId}`,
  );
  form.append("__LASTFOCUS", "");
  form.append(
    "__SCROLLPOSITION",
    '{"tableId":"","rowIndex":-1,"rowScreenOffsetTop":-1,"rowScreenOffsetLeft":-1,"pixelScrollTop":0,"pixelScrollLeft":0}',
  );
  form.append("__VIEWSTATEY_KEY", doDelete ? "" : __VIEWSTATE);
  form.append("__VIEWSTATEX", doDelete ? __VIEWSTATE : "");
  form.append("__VIEWSTATE", "");
  form.append("__SCROLLPOSITIONX", "0");
  form.append("__SCROLLPOSITIONY", "0");
  form.append("__VIEWSTATEENCRYPTED", "");
  form.append("s$m$searchinputfield", "");
  form.append(
    "s$m$Content$Content$ListGridSelectionTree$folders",
    doDelete ? "-50" : "-30",
  );
  form.append("s$m$Content$Content$MarkChkDD", "-80");
  form.append("s$m$Content$Content$SPSearchText$tb", "");
  form.append("masterfootervalue", masterfootervalue);
  form.append("LectioPostbackId", "");

  return form;
}

export async function POST(req: NextRequest) {
  const { messageId, doDelete } = await req.json();

  if (!isNaN(Number(messageId)) && typeof doDelete === "boolean") {
    const lectioProps = getLectioProps();
    const userId = lectioProps.userId;
    const schoolCode = lectioProps.schoolCode;
    const url = doDelete
      ? `beskeder2.aspx?mappeid=-50`
      : `beskeder2.aspx?mappeid=-30`;

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
    const __VIEWSTATE = doDelete
      ? $("#__VIEWSTATEX").val()
      : $("#__VIEWSTATEY_KEY").val();

    const masterfootervalue = $("input[name='masterfootervalue']").val();

    if (__VIEWSTATE && masterfootervalue) {
      const form = getFavoriteMessageForm(
        messageId,
        __VIEWSTATE,
        masterfootervalue,
        doDelete,
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

          if (text.includes("Eleven ")) {
            const client = await getRedisClient();
            if (client) {
              const tag1 = getMessagesTag(userId, "favorites");
              const tag2 = getMessagesTag(userId, "newest");
              const tag3 = getMessagesTag(userId, "sent");
              await client.json.del(tag1, "$");
              await client.json.del(tag2, "$");
              await client.json.del(tag3, "$");
              await client.quit();
            }
            return true;
          }

          return null;
        })
        .catch((e) => {
          return null;
        });

      if (isSuccess) {
        return NextResponse.json({
          status: "success",
          message: "Made message favorite",
        });
      }
    }
  }

  return NextResponse.json({ status: "error", message: "An error happened" });
}
