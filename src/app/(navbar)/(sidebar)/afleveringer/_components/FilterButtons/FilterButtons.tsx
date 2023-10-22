import { getLectioProps } from "@/lib/auth/getLectioProps";
import { lectioAPI } from "@/lib/lectio-api";
import { Buttons } from "./Buttons";

export async function FilterButtons() {
  const lectioProps = getLectioProps();
  const tag = `assignments-${lectioProps.username}`;
  const assignments = await lectioAPI.getAssignment.all({
    ...lectioProps,
    tag: tag,
  });

  return (
    <>
      <Buttons strAssignments={JSON.stringify(assignments)} />
    </>
  );
}
