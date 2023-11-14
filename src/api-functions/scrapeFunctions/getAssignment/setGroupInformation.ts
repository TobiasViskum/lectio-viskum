import { getStudentById } from "..";

export async function setGroupInformation(
  $: cheerio.Root,
  assignment: FullAssignment,
) {
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
      const foundStudent = await getStudentById({ userId: id });
      if (foundStudent !== null && typeof foundStudent !== "string") {
        assignment.students.push(foundStudent);
      }
    }
  }

  const $select = $("select#m_Content_groupStudentAddDD > option");

  for (let i = 0; i < $select.length; i++) {
    const option = $select[i];
    const $option = $(option);
    const id = $option.val();
    const foundStudent = await getStudentById({ userId: id });
    if (foundStudent !== null && typeof foundStudent !== "string") {
      assignment.groupMembersToAdd.push(foundStudent);
    }
  }
}
