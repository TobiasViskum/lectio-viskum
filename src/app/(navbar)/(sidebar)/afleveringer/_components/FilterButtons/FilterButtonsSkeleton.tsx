import { Buttons } from "./Buttons";
import { NoDataSkeleton } from "./NoDataSkeleton";
import { getCachedAllAssignments } from "@/cache-functions/getCachedAllAssignments";

export async function FilterButtonsSkeleton() {
  let assignments = await getCachedAllAssignments();

  if (assignments === null) {
    return <NoDataSkeleton />;
  }

  return <Buttons strAssignments={JSON.stringify(assignments)} />;
}
