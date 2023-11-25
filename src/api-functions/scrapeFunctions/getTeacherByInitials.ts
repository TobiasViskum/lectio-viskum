import { getAllTeachers } from ".";

type Props = {
  initials: string;
};

export async function getTeacherByInitials({ initials }: Props) {
  const teachers = await getAllTeachers();
  if (teachers === null || typeof teachers === "string") return null;

  const foundTeacher = teachers.find((obj) => obj.initials === initials);

  if (foundTeacher) return foundTeacher;

  return null;
}
