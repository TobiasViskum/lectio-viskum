import { getCachedAssignment } from "@/cache-functions/getCachedAssignment";
import { lectioAPI } from "@/lib/lectio-api";
import { urlify } from "@/util/urlify";
import { AssignmentDescriptionSkeleton } from "./AssignmentDescriptionSkeleton";

type Props = { assignmentId: string };

export async function AssignmentDescription({ assignmentId }: Props) {
  let assignment = await lectioAPI.getAssignment.byId({
    assignmentId: assignmentId,
  });

  if (assignment === null) {
    assignment = await getCachedAssignment(assignmentId);
  }
  if (assignment === null) {
    return <AssignmentDescriptionSkeleton assignmentId={assignmentId} />;
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
