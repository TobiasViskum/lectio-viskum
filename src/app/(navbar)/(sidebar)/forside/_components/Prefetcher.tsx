import { getAllSchoolClasses } from "@/api-functions/scrapeFunctions/getAllSchoolClasses";
import { getAllAssignments } from "@/lib/lectio-api/getAllAssignments";

export async function PrefetchInitialPages() {
  await getAllAssignments();
  await getAllSchoolClasses();

  return null;
}
