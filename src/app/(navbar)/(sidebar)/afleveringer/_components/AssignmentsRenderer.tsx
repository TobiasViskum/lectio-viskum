import { LoadingDots } from "@/components/loading-components/LoadingDots";
import { AssignmentsWrapper } from "./AssignmentsWrapper";

type Props = {
  assignmentsPromise: Promise<Assignment[] | null>;
};

export async function AssignmentsRenderer({ assignmentsPromise }: Props) {
  const assignments = await assignmentsPromise;

  if (assignments === null) {
    return <LoadingDots className="mt-8" />;
  }

  return <AssignmentsWrapper strAssignments={JSON.stringify(assignments)} />;
}
