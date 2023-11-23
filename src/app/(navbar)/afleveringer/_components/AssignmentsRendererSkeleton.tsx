import { LoadingDots } from "@/components/loading-components/LoadingDots";
import { AssignmentsWrapper } from "./AssignmentsWrapper";
import { getPageState } from "../page-state";

export async function AssignmentsRendererSkeleton() {
  const pageState = getPageState();
  let assignments = await pageState.cachedAssignment;

  if (assignments === null) {
    return <LoadingDots className="mt-8" />;
  }

  return <AssignmentsWrapper strAssignments={JSON.stringify(assignments)} />;
}
