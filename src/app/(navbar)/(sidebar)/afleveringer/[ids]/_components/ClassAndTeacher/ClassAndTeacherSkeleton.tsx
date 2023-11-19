import { NoDataSkeleton } from "./NoDataSkeleton";
import { getPageState } from "../../page-state";
import { Content } from "./Content";

type Props = {
  schoolClass: string | undefined;
  subject: string | undefined;
};

export async function ClassAndTeacherSkeleton({ schoolClass, subject }: Props) {
  const pageState = getPageState();

  const assignment = await pageState.cachedAssignment;

  if (assignment === null) {
    return <NoDataSkeleton schoolClass={schoolClass} subject={subject} />;
  }

  return <Content assignment={assignment} />;
}
