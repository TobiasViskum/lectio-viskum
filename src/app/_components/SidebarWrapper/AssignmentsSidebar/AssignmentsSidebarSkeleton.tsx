import { Content } from "./Content";
import { NoDataSkeleton } from "./NoDataSkeleton";
import { getCachedAllAssignments } from "@/cache-functions/getCachedAllAssignments";

export async function AssignmentsSidebarSkeleton() {
  let assignments = await getCachedAllAssignments();

  if (assignments === null) return <NoDataSkeleton />;

  return <Content strAssignments={JSON.stringify(assignments)} />;
}
