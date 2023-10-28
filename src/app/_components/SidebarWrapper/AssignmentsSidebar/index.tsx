import { getLectioProps } from "@/lib/auth/getLectioProps";
import { lectioAPI } from "@/lib/lectio-api";
import { Content } from "./Content";

export async function AssignmentsSidebar() {
  const lectioProps = getLectioProps();

  const assignments = await lectioAPI.getAssignment.all({
    ...lectioProps,
  });

  return <Content strAssignments={JSON.stringify(assignments)} />;
}
