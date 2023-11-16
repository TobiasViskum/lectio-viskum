import { AssignmentTitleSkeleton } from "./AssignmentTitleSkeleton";
import { getPageState } from "../../page-state";

type Props = {
  title: string | undefined;
};
export async function AssignmentTitle({ title }: Props) {
  const pageState = getPageState();

  let assignment = await pageState.assignment;

  if (assignment === null) {
    assignment === (await pageState.cachedAssignment);
  }
  if (assignment === null) {
    return <AssignmentTitleSkeleton title={title} />;
  }

  return <h1 className="text-2xl font-bold md:text-3xl">{assignment.title}</h1>;
}
