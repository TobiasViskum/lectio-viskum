import { Content } from "./Content";
import { NoDataSkeleton } from "./NoDataSkeleton";
import { getPageState } from "@/app/(navbar)/(sidebar)/afleveringer/page-state";

export async function AssignmentsSidebar() {
  const pageState = getPageState();
  let assignments = await pageState.assignment;

  if (assignments === null) {
    assignments = await pageState.cachedAssignment;
  }
  if (assignments === null) {
    return <NoDataSkeleton />;
  }

  return (
    <>
      <Content strAssignments={JSON.stringify(assignments)} />
    </>
  );
}
