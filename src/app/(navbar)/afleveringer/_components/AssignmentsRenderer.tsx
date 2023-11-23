import { LoadingDots } from "@/components/loading-components/LoadingDots";
import { AssignmentsWrapper } from "./AssignmentsWrapper";
import { PrefetchAllAssignments } from "./PrefetchAllAssignments";
import { Suspense } from "react";
import { getPageState } from "../page-state";

export async function AssignmentsRenderer() {
  const pageState = getPageState();
  let assignments = await pageState.assignment;

  if (assignments === null) {
    assignments = await pageState.cachedAssignment;

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
