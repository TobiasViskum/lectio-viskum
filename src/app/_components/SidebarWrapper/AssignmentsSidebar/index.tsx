import { getLectioProps } from "@/lib/auth/getLectioProps";
import { lectioAPI } from "@/lib/lectio-api";
import { Content } from "./Content";

export async function AssignmentsSidebar() {
  const lectioProps = getLectioProps();
  const tag = `assignments-${lectioProps.username}`;
  const assignments = await lectioAPI.getAssignment.all({
    ...lectioProps,
    tag: tag,
  });

  return <Content strAssignments={JSON.stringify(assignments)} />;
}
