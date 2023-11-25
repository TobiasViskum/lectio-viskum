import { getAuthenticatedPage } from "../getPage";
import { getStudentById, getTeacherById } from ".";

export async function getMessageSender(name: string) {
  name = name.trim();
  name = name.split(" (")[0];
  name = name.toLowerCase();

  const res = await getAuthenticatedPage({
    specificPage: "FindSkema.aspx?type=laerer",
  });
  if (res === null) return null;
  if (res === "Not authenticated") return null;
  if (res === "Forbidden access") return null;
  if (res === "Invalid school") return null;
  const $ = res.$;

  const $as = $("#m_Content_listecontainer > ul > li > a");

  let hasFoundSender = false;
  let foundSender = {} as Student | Teacher;

  for (let i = 0; i < $as.length; i++) {
    const a = $as[i];
    const $a = $(a);
    const text = $a.text().trim();
    let id = ($a.attr("data-lectiocontextcard") || "").replace(/[a-z]+/gi, "");
    if (text.toLowerCase().includes(name) && id) {
      const newSender = await getTeacherById({ teacherId: id });
      if (newSender !== null && typeof newSender !== "string") {
        foundSender = newSender;
      }
    }
  }

  if (hasFoundSender) return foundSender;

  const firstLetter = name.charAt(0);

  const res2 = await getAuthenticatedPage({
    specificPage: `FindSkema.aspx?type=elev&forbogstav=${firstLetter}`,
  });
  if (res2 === null) return null;
  if (res2 === "Not authenticated") return null;
  if (res2 === "Forbidden access") return null;
  if (res2 === "Invalid school") return null;
  const $2 = res2.$;

  const $as2 = $2("#m_Content_listecontainer > ul > li > a");

  for (let i = 0; i < $as2.length; i++) {
    const a = $as2[i];
    const $a = $2(a);
    const text = $a.text().trim();

    let id = ($a.attr("data-lectiocontextcard") || "").replace(/[a-z]+/gi, "");
    if (text.toLowerCase().includes(name) && id) {
      const newSender = await getStudentById({ userId: id });
      if (newSender !== null && typeof newSender !== "string") {
        foundSender = newSender;
      }
    }
  }

  if (foundSender) return foundSender;
  return null;
}
