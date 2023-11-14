import { lectioAPI } from "@/lib/lectio-api";
import { Content } from "./Content";
import { getCachedAllAssignments } from "@/cache-functions/getCachedAllAssignments";
import { NoDataSkeleton } from "./NoDataSkeleton";

export async function AssignmentsSidebar() {
  let assignments = await lectioAPI.getAssignment.all();

  if (assignments === null) {
    assignments = await getCachedAllAssignments();

    if (assignments === null) {
      return <NoDataSkeleton />;
    }

    return <Content strAssignments={JSON.stringify(assignments)} />;
  }

  return <Content strAssignments={JSON.stringify(assignments)} />;
}
