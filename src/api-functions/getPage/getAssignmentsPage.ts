import "server-only";
import { load } from "cheerio";
import { getAuthenticatedPage } from ".";
import { getAssignmentsForm } from "./getForm/assignment-form";
import { getLectioProps } from "@/lib/auth/getLectioProps";
import { standardFetchOptions } from "../standardFetchOptions";
import { getLastAuthenticatedCookie } from "../getLastAuthenticatedCookie";

export async function getAssignmentsPage() {
  const res = await getAuthenticatedPage({
    page: "assignments",
  });

  if (res === null) return res;
  if (res === "Not authenticated") return res;
  if (res === "Forbidden access") return res;
  if (res === "Invalid school") return res;
  const $ = res.$;
  const fetchCookie = res.fetchCookie;

  const __VIEWSTATEX = $("input#__VIEWSTATEX").val();
  const __EVENTVALIDATION = $("input#__EVENTVALIDATION").val();
  const masterFooterValue = $('input[name="masterfootervalue"]').val();

  if (__VIEWSTATEX && __EVENTVALIDATION && masterFooterValue) {
    const form = getAssignmentsForm({
      __VIEWSTATEX: __VIEWSTATEX,
      __EVENTVALIDATION: __EVENTVALIDATION,
      masterFooterValue: masterFooterValue,
    });
    const cookies = getLectioProps();

    const pageContent = await fetchCookie(
      "https://www.lectio.dk/lectio/243/OpgaverElev.aspx",
      {
        method: "POST",
        body: form,
        headers: { Cookie: getLastAuthenticatedCookie() },
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
