import { getCredentials } from "@/lib/auth/getCredentials";
import { lectioAPI } from "@/lib/lectio-api";
import { AssignmentsWrapper } from "./AssignmentsWrapper";

export async function AssignmentsRenderer() {
  const credentials = getCredentials();
  const tag = `assignments-${credentials.username}`;
  const assignments = await lectioAPI.getAssignments({
    ...credentials,
    tag: tag,
  });

  if (assignments === null) {
    return <p className="text-red-400">An error happened</p>;
  }

  return <AssignmentsWrapper strAssignments={JSON.stringify(assignments)} />;
}
