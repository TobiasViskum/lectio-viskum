import { getAllTeachers } from ".";

type Props = {
  teacherId: string;
};

export async function getTeacherById({ teacherId }: Props) {
  const teachers = await getAllTeachers();
  if (teachers === null || typeof teachers === "string") return null;
  const foundTeacher = teachers.find((obj) => obj.teacherId === teacherId);

  if (foundTeacher) return foundTeacher;

  return null;
}
