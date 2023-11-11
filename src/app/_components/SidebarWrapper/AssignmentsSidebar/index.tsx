import { lectioAPI } from "@/lib/lectio-api";
import { Content } from "./Content";

export async function AssignmentsSidebar() {
  const assignments = await lectioAPI.getAssignment.all();

  return <Content strAssignments={JSON.stringify(assignments)} />;
}
