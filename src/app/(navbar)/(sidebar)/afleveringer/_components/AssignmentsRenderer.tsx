import { LoadingDots } from "@/components/loading-components/LoadingDots";
import { AssignmentsWrapper } from "./AssignmentsWrapper";
import { lectioAPI } from "@/lib/lectio-api";
import { PrefetchAllAssignments } from "./PrefetchAllAssignments";
import { Suspense } from "react";
import { getCachedAllAssignments } from "@/cache-functions/getCachedAllAssignments";

export async function AssignmentsRenderer() {
  let assignments = await lectioAPI.getAssignment.all();

  if (assignments === null) {
    assignments = await getCachedAllAssignments();

    if (assignments === null) {
      return <LoadingDots className="mt-8" />;
    }

    return <AssignmentsWrapper strAssignments={JSON.stringify(assignments)} />;
  }

  return (
    <>
      <AssignmentsWrapper strAssignments={JSON.stringify(assignments)} />
      <Suspense>
        <PrefetchAllAssignments assignments={assignments} />
      </Suspense>
    </>
  );
}
