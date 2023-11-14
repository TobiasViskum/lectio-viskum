import { LoadingDots } from "@/components/loading-components/LoadingDots";
import { AssignmentsWrapper } from "./AssignmentsWrapper";
import { getCachedAllAssignments } from "@/cache-functions/getCachedAllAssignments";

export async function AssignmentsRendererSkeleton() {
  let assignments = await getCachedAllAssignments();

  if (assignments === null) {
    return <LoadingDots className="mt-8" />;
  }

  return <AssignmentsWrapper strAssignments={JSON.stringify(assignments)} />;
}
