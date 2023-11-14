import { lectioAPI } from "@/lib/lectio-api";
import { Buttons } from "./Buttons";
import { NoDataSkeleton } from "./NoDataSkeleton";
import { getCachedAllAssignments } from "@/cache-functions/getCachedAllAssignments";

export async function FilterButtons() {
  let assignments = await lectioAPI.getAssignment.all();

  if (assignments === null) {
    assignments = await getCachedAllAssignments();

    if (assignments === null) {
      return <NoDataSkeleton />;
    }

    return <Buttons strAssignments={JSON.stringify(assignments)} />;
  }

  return <Buttons strAssignments={JSON.stringify(assignments)} />;
}
