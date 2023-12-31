import { getLastAuthenticatedCookie } from "@/api-functions/getLastAuthenticatedCookie";
import { getAssignmentTag } from "@/api-functions/getTags";
import { standardFetchOptions } from "@/api-functions/standardFetchOptions";
import { getLectioProps } from "@/lib/auth/getLectioProps";
import { getRedisClient } from "@/lib/get-redis-client";
import { load } from "cheerio";
import { NextRequest, NextResponse } from "next/server";

function getFirstForm(fileData: any, folder: string, ev: string, vsk: string) {
  let formData = new FormData();
  formData.append("time", "0");
  formData.append("__LASTFOCUS", "");
  formData.append("__EVENTTARGET", "ctl00$Content$newfileOK");
  formData.append("__EVENTARGUMENT", "");
  formData.append("__SCROLLPOSITION", "");
  formData.append("__VIEWSTATEY_KEY", vsk);
  formData.append("__VIEWSTATEX", "");
  formData.append("__VIEWSTATE", "");
  formData.append("__VIEWSTATEENCRYPTED", "");
  formData.append("__EVENTVALIDATION", ev);
  formData.append("ctl00$Content$saveHomeworkHidden", "");
  formData.append("ctl00$Content$unittestInjectFileHidden", "");
  formData.append("ctl00$Content$FolderTreeView2$folders", folder);
  formData.append("ctl00$Content$selectContentHiddenArg", "");
  formData.append("ctl00$Content$fileUpload", "1");
  formData.append("ctl00$Content$fileUpload_up", fileData, fileData.name);
  formData.append("LectioPostbackId", "");
  return formData;
}
function getSecondForm(arg: string, ev: string, vsk: string, vsk2: string) {
  let form = new FormData();
  form.append("time", "0");
  form.append("__EVENTTARGET", "m$Content$choosedocument");
  form.append("__EVENTARGUMENT", "documentId");
  form.append("__LASTFOCUS", "");
  form.append("__SCROLLPOSITION", "");
  form.append("__VIEWSTATEX", vsk);
  form.append("__VIEWSTATEY_KEY", vsk2);
  form.append("__VIEWSTATE", "");
  form.append("__VIEWSTATEENCRYPTED", "");
  form.append("__EVENTVALIDATION", ev);
  form.append("s$m$searchinputfield", "");
  form.append("m$Content$CommentsTB$tb", "");
  form.append("m$Content$choosedocument$selectedDocumentId", arg);

  form.append("masterfootervalue", "X1!ÆØÅ");
  form.append("LectioPostbackId", "");
  return form;
}

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const fileData = form.get("fileData");
  const assignmentId = form.get("assignmentId") as string | null;

  const lectioProps = getLectioProps();
  const schoolCode = lectioProps.schoolCode;
  const userId = lectioProps.userId;
  let year = new Date().getFullYear();
  let form2Info = {
    __EVENTVALIDATION: "",
    __VIEWSTATEY_KEY: "",
    __VIEWSTATEX: "",
  };

  const url2 = `https://www.lectio.dk/lectio/${schoolCode}/ElevAflevering.aspx?elevid=${userId}&exerciseid=${assignmentId}`;

  await fetch(url2, {
    headers: { Cookie: getLastAuthenticatedCookie() },
    method: "GET",
    ...standardFetchOptions,
  })
    .then(async (r) => {
      const text = await r.text();
      const $ = load(text);
      form2Info.__VIEWSTATEY_KEY = $("#__VIEWSTATEX").val();
      form2Info.__EVENTVALIDATION = $("#__EVENTVALIDATION").val();
      form2Info.__VIEWSTATEY_KEY = $("#__VIEWSTATEY_KEY").val();

      year = Number($("select#m_ChooseTerm_term > option").val());
      console.log(year);
    })
    .catch(() => null);

  const url1 = `https://www.lectio.dk/lectio/${schoolCode}/documentchoosercontent.aspx?year=${year}&ispublic=0&showcheckbox=0&mode=pickfile`;

  const textContent = await fetch(url1, {
    headers: { Cookie: getLastAuthenticatedCookie() },
    method: "GET",
    ...standardFetchOptions,
  })
    .then(async (r) => {
      const text = await r.text();
      const $ = load(text);
      const __ev = $("#__EVENTVALIDATION").val();
      const __vsk = $("#__VIEWSTATEY_KEY").val();
      const folder = $("#ctl00_Content_FolderTreeView2_folders").val();

      if (__ev && __vsk)
        return {
          __EVENTVALIDATION: __ev,
          __VIEWSTATEY_KEY: __vsk,
          folder: folder,
        };
      return null;
    })
    .catch(() => null);

  if (textContent !== null && fileData && assignmentId) {
    const firstForm = getFirstForm(
      fileData,
      textContent.folder,
      textContent.__EVENTVALIDATION,
      textContent.__VIEWSTATEY_KEY,
    );

    const arg = await fetch(url1, {
      headers: { Cookie: getLastAuthenticatedCookie() },
      method: "POST",
      ...standardFetchOptions,
      body: firstForm,
    })
      .then(async (r) => {
        const text = await r.text();
        const match = text.match(/\"data\":({.*\"})/);
        if (match) {
          return match[1];
        }
        return null;
      })
      .catch(() => null);

    if (arg !== null) {
      const v2 = await fetch(url2, {
        headers: { Cookie: getLastAuthenticatedCookie() },
        method: "GET",
        ...standardFetchOptions,
      })
        .then(async (r) => {
          const text = await r.text();
          const $ = load(text);
          const __ev = $("#__EVENTVALIDATION").val();

          return {
            __EVENTVALIDATION: __ev,
            __VIEWSTATEY_KEY: form2Info.__VIEWSTATEY_KEY,
            __VIEWSTATEX: form2Info.__VIEWSTATEX,
          };
        })
        .catch(() => null);

      if (v2 !== null) {
        const secondForm = getSecondForm(
          arg,
          v2.__EVENTVALIDATION,
          v2.__VIEWSTATEX,
          v2.__VIEWSTATEY_KEY,
        );

        const finalResult = await fetch(url2, {
          headers: { Cookie: getLastAuthenticatedCookie() },
          method: "POST",
          ...standardFetchOptions,
          body: secondForm,
        })
          .then(async (r) => {
            const text = await r.text();
            if (text.includes("Eleven")) {
              return true;
            }
            return false;
          })
          .catch(() => false);
        if (finalResult) {
          const client = await getRedisClient();
          if (client) {
            const tag = getAssignmentTag(userId, assignmentId);
            await client.json.del(tag, "$");
            await client.quit();
          }

          return NextResponse.json({
            status: "success",
            message: "Uploaded file",
          });
        }
      }
    }
  }

  return NextResponse.json({ status: "error", message: "An error happened" });
}
