import { getPageState } from "../../page-state";
import { Content } from "./Content";

export async function AssignmentSubmitsSkeleton() {
  const pageState = getPageState();
  const assignment = await pageState.cachedAssignment;

  if (assignment === null) return null;

  return <Content assignment={assignment} />;
}
