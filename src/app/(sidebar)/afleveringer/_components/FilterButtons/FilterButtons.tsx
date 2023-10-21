import { getLectioProps } from "@/lib/auth/getLectioProps";
import { lectioAPI } from "@/lib/lectio-api";
import { FilterButtonsSkeleton } from "./FilterButtonsSkeleton";
import { Buttons } from "./Buttons";

export async function FilterButtons() {
  const lectioProps = getLectioProps();
  const tag = `assignments-${lectioProps.username}`;
  const assignments = await lectioAPI.getAssignment.all({
    ...lectioProps,
    tag: tag,
  });

  if (assignments === null) {
    return <FilterButtonsSkeleton />;
  }

  return (
    <>
      <Buttons strAssignments={JSON.stringify(assignments)} />
    </>
  );
}
