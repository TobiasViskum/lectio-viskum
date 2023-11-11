import "server-only";
import { getLectioProps } from "@/lib/auth/getLectioProps";
import { getAuthenticatedPage } from "@/api-functions/getPage";
import { getAllSubjects } from "./getAllSubjects";

export async function getSubject(providedClassStr: string) {
  const res = await getAuthenticatedPage({
    specificPage: "FindSkema.aspx?type=hold",
  });

  if (res === null) return "";
  if (res === "Not authenticated") return "";
  if (res === "Forbidden access") return "";
  if (res === "Invalid school") return "";

  const { $ } = res;

  let providedSubject = "";
  const splitStr = providedClassStr.split(" ");
  if (splitStr.length === 1) {
    providedSubject = providedClassStr.toLowerCase();
  }

  for (let i = 0; i < splitStr.length; i++) {
    const str = splitStr[i];
    if (i === 0) continue;
    if (str.length === 1) continue;
    let tempSplitStr = [...splitStr];
    let count = 0;
    do {
      tempSplitStr.shift();
      count++;
    } while (count < i);
    providedSubject = tempSplitStr.join(" ");
    break;
  }
  providedSubject = providedSubject.toLowerCase();

  const $_a = $("div#m_Content_listecontainer > ul > li > a");
  getAllSubjects();
  let foundSubjectName = "";
  for (let i = 0; i < $_a.length; i++) {
    const a = $_a[i];
    const $a = $(a);
    const text = $a.text();

    const shortName = $a.find("span").text();
    if (shortName.toLowerCase() === providedSubject) {
      foundSubjectName = text.replace(shortName, "").trim();
    }
  }

  if (foundSubjectName === "") {
    for (let i = 0; i < $_a.length; i++) {
      const a = $_a[i];
      const $a = $(a);
      const text = $a.text();

      const shortName = $a.find("span").text();
      if (providedSubject.includes(shortName.toLowerCase())) {
        foundSubjectName = text.replace(shortName, "").trim();
      }
    }
  }

  return foundSubjectName;
}
