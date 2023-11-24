import { getLectioProps } from "@/lib/auth/getLectioProps";
import { getAuthenticatedPage } from ".";
import { getMessageForm } from "./getForm/get-message-form";
import { standardFetchOptions } from "../standardFetchOptions";
import { getLastAuthenticatedCookie } from "../getLastAuthenticatedCookie";
import { load } from "cheerio";

export async function getMessagePage(messageId: string) {
  const res = await getAuthenticatedPage({
    page: "messages-all",
  });

  if (res === null) return res;
  if (res === "Not authenticated") return res;
  if (res === "Forbidden access") return res;
  if (res === "Invalid school") return res;

  const $ = res.$;
  const fetchCookie = res.fetchCookie;

  const __VIEWSTATEY_KEY = $("input#__VIEWSTATEY_KEY").val();
  const masterFooterValue = $('input[name="masterfootervalue"]').val();

  if (__VIEWSTATEY_KEY && masterFooterValue) {
    const schoolCode = getLectioProps().schoolCode;
    const url = `https://www.lectio.dk/lectio/${schoolCode}/beskeder2.aspx?mappeid=-30`;
    const form = getMessageForm(messageId, __VIEWSTATEY_KEY, masterFooterValue);

    return await fetchCookie(url, {
      method: "POST",
      body: form,
      ...standardFetchOptions,
      headers: { Cookie: getLastAuthenticatedCookie() },
    })
      .then(async (res) => {
        const text = await res.text();
        if (text.includes("Log ind")) {
          return "Not authenticated";
        } else if (text.includes("Der opstod en ukendt fejl")) {
          return null;
        } else {
          return { $: load(text), fetchCookie: fetchCookie };
        }
      })
      .catch(() => null);
  }
  return null;
}
