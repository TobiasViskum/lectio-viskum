import { getCredentials } from "@/lib/auth/getCredentials";
import { lectioAPI } from "@/lib/lectio-api";
import { FilterButtonsSkeleton } from "./FilterButtonsSkeleton";
import { Buttons } from "./Buttons";

export async function FilterButtons() {
  const credentials = getCredentials();
  const tag = `assignments-${credentials.username}`;
  const assignments = await lectioAPI.getAssignments({ ...credentials, tag: tag });

  if (assignments === null) {
    return <FilterButtonsSkeleton />;
  }

  return (
    <>
      <Buttons strAssignments={JSON.stringify(assignments)} />
    </>
  );
}
