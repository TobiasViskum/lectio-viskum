import { getDate } from "@/util/schedule/getDate";
import { getStudentById, getTeacherById } from "..";

export async function setSubmitProps(
  $: cheerio.Root,
  assignment: FullAssignment,
) {
  const $trs = $("#m_Content_RecipientGV > tbody > tr:not(:first-child)");
  for (let i = 0; i < $trs.length; i++) {
    const tr = $trs[i];
    const $tr = $(tr);

    if ($tr.text().includes("Der er ingen indlæg!")) return;

    assignment.submits.push({
      time: new Date(1970),
      submitter: {},
      comment: "",
      document: { name: "", href: "" },
    } as Submit);

    const $tds = $tr.find("td");
    for (let j = 0; j < $tds.length; j++) {
      const td = $tds[j];
      const $td = $(td);
      if (j === 0) {
        const time = $td.text();
        assignment.submits[i].time = getDate(time);
      } else if (j === 1) {
        const span = $td.find("span");

        const submitterIdNoReplace = span.attr("data-lectiocontextcard") || "";
        if (submitterIdNoReplace.includes("T")) {
          const submitterId = submitterIdNoReplace.replace("T", "");
          const foundTeacher = await getTeacherById({
            teacherId: submitterId,
          });
          if (foundTeacher !== null && typeof foundTeacher !== "string") {
            assignment.submits[i].submitter = foundTeacher;
          }
        } else if (submitterIdNoReplace.includes("S")) {
          const submitterId = submitterIdNoReplace.replace("S", "");
          const foundStudent = await getStudentById({ userId: submitterId });
          if (foundStudent !== null && typeof foundStudent !== "string") {
            assignment.submits[i].submitter = foundStudent;
          }
        }
      } else if (j === 2) {
        const comment = $td.text();
        assignment.submits[i].comment = comment;
      } else if (j === 3) {
        const $a = $td.find("span > a");
        let href = $a.attr("href");
        if (href) {
          assignment.submits[i].document.name = $a.text();
          assignment.submits[i].document.href = href;
        }
      }
    }
  }
}
