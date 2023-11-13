import { getStudentById } from "..";

export async function setAdditionalProps(
  $: cheerio.Root,
  assignment: FullAssignment,
) {
  const $tds = $("table#m_Content_StudentGV > tbody > tr:nth-child(2) > td");

  for (let i = 0; i < $tds.length; i++) {
    const td = $tds[i];
    const $td = $(td);
    if (i === 1) {
      const $span = $td.find("span > span");
      const studentId = ($span.attr("data-lectiocontextcard") || "").replace(
        "S",
        "",
      );
      if (studentId !== "") {
        const foundStudent = await getStudentById({ userId: studentId });
        if (foundStudent !== null && typeof foundStudent !== "string") {
          assignment.students.push(foundStudent);
        }
      }
    } else if (i === 2) {
      const awaiter = $td.text() || "Ingen";

      assignment.awaiter = awaiter;
    } else if (i === 3) {
      const statusAndAbsence = $td.find("span").text().split("/");
      const status = statusAndAbsence[0]
        .trim()
        .replace("Ikke aflev.", "Ikke afleveret");
      const absence = statusAndAbsence[1].trim().split(" ")[1];
      assignment.status = status;
      assignment.absence = absence;
    } else if (i === 4) {
      const isChecked = $td.find("span > input").attr("checked");
      if (isChecked && isChecked === "checked") {
        assignment.finished = true;
      }
    } else if (i === 5) {
      const grade = $td.text().trim();
      assignment.grade = grade;
    } else if (i === 6) {
      const gradeNote = $td.text().trim();
      assignment.gradeNote = gradeNote;
    } else if (i === 7) {
      const studentNote = $td.text().trim();
      assignment.studentNote = studentNote;
    }
  }

  $("table#m_Content_StudentGV > tbody > tr:nth-child(2) > td").each(
    (index, elem) => {
      const $elem = $(elem);
    },
  );
}
