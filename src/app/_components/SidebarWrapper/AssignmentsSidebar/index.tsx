import { getCredentials } from "@/lib/auth/getCredentials";
import { lectioAPI } from "@/lib/lectio-api";
import { Content } from "./Content";

export async function AssignmentsSidebar() {
  const credentials = getCredentials();
  const tag = `assignments-${credentials.username}`;
  const assignments = await lectioAPI.getAssignments({
    ...credentials,
    tag: tag,
  });

  return <Content strAssignments={JSON.stringify(assignments)} />;
}
