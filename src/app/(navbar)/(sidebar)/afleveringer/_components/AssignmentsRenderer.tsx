import { AssignmentsWrapper } from "./AssignmentsWrapper";

type Props = {
  assignmentsPromise: Promise<Assignment[] | null>;
};

export async function AssignmentsRenderer({ assignmentsPromise }: Props) {
  const assignments = await assignmentsPromise;

  if (assignments === null) {
    return <p className="text-red-400">An error happened</p>;
  }

  return <AssignmentsWrapper strAssignments={JSON.stringify(assignments)} />;
}
