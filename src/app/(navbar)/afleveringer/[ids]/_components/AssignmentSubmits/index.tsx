import { getPageState } from "../../page-state";
import { Content } from "./Content";

export async function AssignmentSubmits() {
  const pageState = getPageState();
  let assignment = await pageState.assignment;

  if (assignment === null) {
    assignment = await pageState.cachedAssignment;
  }
  if (assignment === null) {
    return null;
  }

  return <Content assignment={assignment} />;
}
