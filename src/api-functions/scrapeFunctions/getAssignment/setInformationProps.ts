import { getDate } from "@/util/schedule/getDate";
import { titleMap } from ".";
import { getAllSubjects } from "../getAllSubjects";
import { getSubjects } from "../getSubjects";
import { getTeacherById } from "../getTeacherById";

export async function setInformationProps(
  $: cheerio.Root,
  assignment: FullAssignment,
) {
  const $_tr = $("div#m_Content_registerAfl_pa > table > tbody > tr");

  const allSubjects = await getAllSubjects();

  for (let i = 0; i < $_tr.length; i++) {
    const tr = $_tr[i];
    const $item = $(tr);
    const $td = $item.find("td");
    const $_a = $td.find("a");

    const foundTitle = titleMap[$item.find("th").text()];
    if (foundTitle === "title") {
      assignment.title = $td.find("span").text();
    } else if (foundTitle === "documents") {
      for (let j = 0; j < $_a.length; j++) {
        const a = $_a[j];
        const $a = $(a);
        const name = $a.text().trim();
        const splitName = name.split(".");
        let [fileExtension, ...rest] =
          splitName[splitName.length - 1].split(" ");
        fileExtension = `.${fileExtension}`;
        let additionFileName = rest.join(" ");
        additionFileName = ` ${additionFileName}` || "";
        splitName.pop();

        const newName = [
          [...splitName].join("."),
          additionFileName,
          fileExtension,
        ].join("");

        const length = assignment.documents.push({ name: newName, href: "" });
        const i = length - 1;
        let href = $a.attr("href");
        if (href) {
          assignment.documents[i].href = href;
        }
      }
    } else if (foundTitle === "note") {
      const text = $td.text().trim();
      if (text !== "") {
        assignment.description = text.split("\n");

        for (let l = 0; l < assignment.description.length; l++) {
          assignment.description[l] = assignment.description[l].replace(
            /\s{2,}/g,
            " ",
          );
        }
      }
    } else if (foundTitle === "class") {
      assignment.subject = getSubjects(
        [$td.find("span").text()],
        allSubjects,
      )[0];
      assignment.class = $td.find("span").text().split(" ")[0];
    } else if (foundTitle === "gradeSystem") {
      assignment.gradeSystem = $td.find("span").text();
    } else if (foundTitle === "teacher") {
      const $teacherSpan = $td.find("span");
      const splitName = $teacherSpan.text().split(" (");
      const name = splitName[0];
      const initials = splitName[1].replace(")", "");
      const teacherId = (
        $teacherSpan.attr("data-lectiocontextcard") || ""
      ).replace("T", "");
      assignment.teacher.name = name;
      assignment.teacher.initials = initials;
      assignment.teacher.teacherId = teacherId;
      if (teacherId !== "") {
        const foundTeacher = await getTeacherById({ teacherId });
        if (foundTeacher !== null && typeof foundTeacher !== "string") {
          assignment.teacher = foundTeacher;
        }
      }
    } else if (foundTitle === "studentTime") {
      const studentTime = $td.find("span").text().split(" ")[0];
      if (!isNaN(Number(studentTime))) {
        assignment.studentTime = Number(studentTime);
      }
    } else if (foundTitle === "dueTo") {
      const dueTo = $td.text();
      assignment.dueTo = getDate(dueTo);
    } else if (foundTitle === "inTeachingDescription") {
      const inTeachingDescription = $td.text() === "Ja";
      assignment.inTeachingDescription = inTeachingDescription;
    }
  }
}
