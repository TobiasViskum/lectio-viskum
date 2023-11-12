import { lectioAPI } from "@/lib/lectio-api";
import { Buttons } from "./Buttons";

export async function FilterButtons() {
  const assignments = await lectioAPI.getAssignment.all();

  return <Buttons strAssignments={JSON.stringify(assignments)} />;
}
