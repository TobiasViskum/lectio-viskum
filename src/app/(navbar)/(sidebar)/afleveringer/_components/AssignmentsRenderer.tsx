import { getLectioProps } from "@/lib/auth/getLectioProps";
import { lectioAPI } from "@/lib/lectio-api";
import { AssignmentsWrapper } from "./AssignmentsWrapper";

export async function AssignmentsRenderer() {
  const lectioProps = getLectioProps();
  const tag = `assignments-${lectioProps.username}`;
  const d = new Date().getTime();
  const assignments = await lectioAPI.getAssignment.all({
    ...lectioProps,
    tag: tag,
  });

  if (assignments === null) {
    return <p className="text-red-400">An error happened</p>;
  }

  return <AssignmentsWrapper strAssignments={JSON.stringify(assignments)} />;
}
