import { Buttons } from "./Buttons";
import { NoDataSkeleton } from "./NoDataSkeleton";
import { getPageState } from "../../page-state";

export async function FilterButtons() {
  const pageState = getPageState();
  let assignments = await pageState.assignment;

  if (assignments === null) {
    assignments = await pageState.cachedAssignment;

    if (assignments === null) {
      return <NoDataSkeleton />;
    }

    return <Buttons strAssignments={JSON.stringify(assignments)} />;
  }

  return <Buttons strAssignments={JSON.stringify(assignments)} />;
}
