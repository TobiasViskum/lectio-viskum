import { getAuthenticatedPage } from "@/api-functions/getPage";
import { pattern1, pattern2, pattern3 } from "../getSchedule/timePatterns";
import { getAllSubjects } from "../getAllSubjects";

export async function getHomework() {
  const res = await getAuthenticatedPage({
    page: "homework",
  });

  if (res === "Not authenticated") return res;
  if (res === "Forbidden access") return res;
  if (res === "Invalid school") return res;
  if (res === null) return res;

  const $ = res.$;

  type Homework = {
    date: Date;
    lessonNumber: number;
  };

  let homework: Homework[] = [];

  const $trs = $(
    "table#s_m_Content_Content_MaterialLektieOverblikGV > tbody > tr:not(:first-child)",
  );

  for (let i = 0; i < $trs.length; i++) {
    let obj: Homework = {
      date: new Date(1970),
      lessonNumber: -1,
    };

    const tr = $trs[i];
    const $tr = $(tr);
    const $lesson = $tr.find("td:nth-child(2) > a");
    const info = $lesson.attr("data-additionalinfo") || "";
    const splitInfo = info.split("\n");
    for (let j = 0; j < splitInfo.length; j++) {
      const infoText = splitInfo[j];
      if (pattern2.test(infoText)) {
        const splitDate = infoText.split(" ")[0].split(/-|\//);
        const day = Number(splitDate[0]);
        const month = Number(splitDate[1]);
        const year = Number(splitDate[2]);

        if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
          const date = new Date(year, month - 1, day);
          obj.date = date;
        }
      }
      break;
    }
    const text = $lesson.find("div > div").text();
    const matchRegex = /([0-9]). modul/;
    const match = text.match(matchRegex);
    if (match) {
      const lessonNumber = Number(match[1]);
      obj.lessonNumber = lessonNumber;
    }

    homework.push(obj);
  }

  return homework;
}
