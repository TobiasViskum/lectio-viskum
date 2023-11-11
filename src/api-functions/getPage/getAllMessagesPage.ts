import { load } from "cheerio";
import { getAuthenticatedPage } from ".";
import { getAllMessagesForm } from "./getForm/all-messages-form";
import { standardFetchOptions } from "../standardFetchOptions";

export async function getAllMessagesPage() {
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
    const form = getAllMessagesForm({
      __VIEWSTATEY_KEY: __VIEWSTATEY_KEY,
      masterFooterValue: masterFooterValue,
    });

    const pageContent = await fetchCookie(
      "https://www.lectio.dk/lectio/243/beskeder2.aspx?selectedfolderid=-30",
      {
        method: "POST",
        body: form,
        ...standardFetchOptions,
      },
    ).then(async (res) => {
      try {
        const text = await res.text();
        if (text.includes("Log ind")) {
          return "Not authenticated";
        } else if (text.includes("Der opstod en ukendt fejl")) {
          return null;
        } else {
          return { $: load(text), fetchCookie: fetchCookie };
        }
      } catch {
        return null;
      }
    });

    return pageContent;
  } else {
    return null;
  }
}
