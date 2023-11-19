import { ClassAndTeacherSkeleton } from "./ClassAndTeacherSkeleton";
import { getPageState } from "../../page-state";
import { Content } from "./Content";

type Props = {
  schoolClass: string | undefined;
  subject: string | undefined;
};

export async function ClassAndTeacher({ schoolClass, subject }: Props) {
  const pageState = getPageState();

  let assignment = await pageState.assignment;

  if (assignment === null) {
    assignment = await pageState.cachedAssignment;
  }
  if (assignment === null) {
    return (
      <ClassAndTeacherSkeleton schoolClass={schoolClass} subject={subject} />
    );
  }

  return <Content assignment={assignment} />;
}
