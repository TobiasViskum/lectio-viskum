import { getCachedAssignment } from "@/cache-functions/getCachedAssignment";
import { lectioAPI } from "@/lib/lectio-api";
import { urlify } from "@/util/urlify";
import { AssignmentDescriptionSkeleton } from "./AssignmentDescriptionSkeleton";
import { getPageState } from "../../page-state";

export async function AssignmentDescription() {
  const pageState = getPageState();

  let assignment = await pageState.assignment;

  if (assignment === null) {
    assignment = await pageState.cachedAssignment;
  }
  if (assignment === null) {
    return <AssignmentDescriptionSkeleton />;
  }

  if (assignment.description.length === 0) return null;
  if (assignment.description.length === 1 && assignment.description[0] === "")
    return null;

  return (
    <div className="flex max-w-3xl flex-col gap-y-1">
      <p className="font-medium">Opgavebeskrivelse:</p>
      <p
        className="text-sm text-muted-foreground"
        dangerouslySetInnerHTML={{
          __html: urlify(assignment.description.join("<br/>")),
        }}
      ></p>
    </div>
  );
}
