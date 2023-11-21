import { getStudentById } from "..";

export async function setGroupInformation(
  $: cheerio.Root,
  assignment: FullAssignment,
) {
  let studentPromises: Promise<Student | string | null>[] = [];

  const $trs = $(
    "table#m_Content_groupMembersGV > tbody > tr:not(:first-child)",
  );

  for (let i = 0; i < $trs.length; i++) {
    const tr = $trs[i];
    const $tr = $(tr);
    const $span = $tr.find("td:nth-child(1) > span");
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
      assignment.students.push({ ...student, isRemovable: false });
    }
  }
  for (let i = 0; i < assignment.students.length; i++) {
    const isRemovable = $($trs[i]).find("td:nth-child(2) > a").length >= 1;
    assignment.students[i].isRemovable = isRemovable;
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
