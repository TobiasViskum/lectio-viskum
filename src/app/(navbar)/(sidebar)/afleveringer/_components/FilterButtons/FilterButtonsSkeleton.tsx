import { getPageState } from "../../page-state";
import { Buttons } from "./Buttons";
import { NoDataSkeleton } from "./NoDataSkeleton";

export async function FilterButtonsSkeleton() {
  const pageState = getPageState();

  let assignments = await pageState.cachedAssignment;

  if (assignments === null) {
    return <NoDataSkeleton />;
  }

  return <Buttons strAssignments={JSON.stringify(assignments)} />;
}
