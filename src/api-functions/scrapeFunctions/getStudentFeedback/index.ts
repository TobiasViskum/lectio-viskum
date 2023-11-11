import { getAuthenticatedPage } from "@/api-functions/getPage";
import { getLectioProps } from "@/lib/auth/getLectioProps";
import { load } from "cheerio";

type Props = { lessonId: string };

export async function getStudentFeedback({ lessonId }: StandardProps & Props) {
  const lectioProps = getLectioProps();
  const lessonNumber = Number(lessonId);

  if (isNaN(lessonNumber)) return null;

  const href = `aktivitet/aktivitetforside2.aspx?id=${
    lessonNumber + 1
  }&lectab=elevindhold`;
  const res = await getAuthenticatedPage({
    lectioCookies: lectioProps.lectioCookies,
    schoolCode: lectioProps.schoolCode,
    specificPage: href,
  });

  if (res === "Not authenticated") return null;
  if (res === "Forbidden access") return null;
  if (res === "Invalid school") return null;
  if (res === null) return res;

  const $ = res.$;

  let studentFeedback: StudentFeedback = {
    title: "",
    content: [],
  };

  const container =
    "div#s_m_Content_Content_Elevindhold_tocAndToolbar_elevindholdEditLV_ctrl1_contentHeaderStudentName";

  const $articles = $(`${container} > div[id*="ACH"] > article`);

  for (let i = 0; i < $articles.length; i++) {
    const article = $articles[i];
    const $article = $(article);
    const $children = $article.children();
    let hasFoundTitle = false;

    for (let j = 0; j < $children.length; j++) {
      const child = $children[j];
      const $child = $(child);

      if (child.type === "tag") {
        if (child.name === "h1" && hasFoundTitle === false) {
          hasFoundTitle = true;
          studentFeedback.title = $child.text().trim();
        } else if (child.name === "p") {
          if ($child.find("span").length === 0) {
            const html = $child.html();
            if (html) {
              studentFeedback.content.push(html.trim());
            }
          }
        }
      }
    }
  }
  return studentFeedback;
}
