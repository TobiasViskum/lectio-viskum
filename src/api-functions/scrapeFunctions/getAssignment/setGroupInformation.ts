import { getStudentById } from "..";

export async function setGroupInformation(
  $: cheerio.Root,
  assignment: FullAssignment,
) {
  let studentPromises: Promise<Student | string | null>[] = [];

  const $spans = $(
    "table#m_Content_groupMembersGV > tbody > tr:not(:first-child) > td > span",
  );

  for (let i = 0; i < $spans.length; i++) {
    const span = $spans[i];
    const $span = $(span);
    const id = ($span.attr("data-lectiocontextcard") || "").replace("S", "");
    if (
      id !== "" &&
      assignment.students.find((obj) => obj.studentId === id) === undefined
    ) {
      studentPromises.push(getStudentById({ userId: id }));
    }
  }
  const students = await Promise.all(studentPromises);
  for (let i = 0; i < students.length; i++) {
    const student = students[i];
    if (student !== null && typeof student !== "string") {
      assignment.students.push(student);
    }
  }

  const $select = $("select#m_Content_groupStudentAddDD > option");

  for (let i = 0; i < $select.length; i++) {
    const option = $select[i];
    const $option = $(option);
    const name = $option.text().split(" (")[0];
    const id = $option.val();

    assignment.groupMembersToAdd.push({ name: name, studentId: id });
  }
}
