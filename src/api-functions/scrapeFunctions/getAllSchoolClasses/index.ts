import { getAuthenticatedPage } from "@/api-functions/getPage";
import { getAllClassLinks } from "./getAllClassLinks";

export async function getAllSchoolClasses() {
  let overallClassLinks: string[] = [];
  const res = await getAuthenticatedPage({
    specificPage: "default.aspx",
  });

  if (res === null) return null;
  if (res === "Not authenticated") return null;
  if (res === "Forbidden access") return null;
  if (res === "Invalid school") return null;
  const $ = res.$;
  const $as = $("#m_Content_elevertd > ul > li > a");
  for (let i = 0; i < $as.length; i++) {
    const a = $as[i];
    const $a = $(a);
    const href = $a.attr("href") || "";
    if (href.includes("type=hold")) {
      overallClassLinks.push(href.replace(/\/lectio\/[0-9]+\//, ""));
    }
  }

  type HrefHolder = { shortSubject: string; longSubject: string; href: string };
  let allSchoolClasses: SchoolClass[] = [];
  let allHref: HrefHolder[] = [];
  let promises: Promise<HrefHolder[]>[] = [];
  for (let i = 0; i < overallClassLinks.length; i++) {
    const promise = new Promise<HrefHolder[]>(async (resolve) => {
      const res2 = await getAuthenticatedPage({
        specificPage: overallClassLinks[i],
      });
      if (res2 === null) return resolve([]);
      if (res2 === "Not authenticated") return resolve([]);
      if (res2 === "Forbidden access") return resolve([]);
      if (res2 === "Invalid school") return resolve([]);
      const $2 = res2.$;
      const $as = $2("div#m_Content_listecontainer > ul > li > a");

      for (let i = 0; i < $as.length; i++) {
        const a = $as[i];
        const $a = $2(a);
        let href = $a.attr("href");
        const schoolClassIdMatch = href?.match(/holdelementid=([0-9]+)/);
        if (href && schoolClassIdMatch) {
          const schoolClassId = schoolClassIdMatch[1];
          const fullClass = $a.text();
          allSchoolClasses.push({
            class: "",
            classId: schoolClassId,
            fullClass: fullClass,
            subject: "",
          });
        } else if (href && href.includes("fag=")) {
          const shortSubject = $a.find("span").text().trim();
          const longSubject = $a.text().replace(shortSubject, "").trim();
          href = href.replace(/\/lectio\/[0-9]+\//, "");

          allHref.push({
            href: href,
            longSubject: longSubject,
            shortSubject: shortSubject,
          });
        }
      }
      resolve(allHref);
    });
    promises.push(promise);
  }
  const result = await Promise.all(promises);
  const allClassLinks = [];
  for (let i = 0; i < result.length; i++) {
    allClassLinks.push(...result[i]);
  }

  //   let promises2
  //   console.log(allClassLinks);
}
