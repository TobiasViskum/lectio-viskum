import { getCachedAssignment } from "@/cache-functions/getCachedAssignment";
import { DocumentButton } from "@/components/global/DocumentButton";
import { lectioAPI } from "@/lib/lectio-api";
import { AssignmentFilesSkeleton } from "./AssignmentFilesSkeleton";

type Props = { assignmentId: string };

export async function AssignmentFiles({ assignmentId }: Props) {
  let assignment = await lectioAPI.getAssignment.byId({
    assignmentId: assignmentId,
  });

  if (assignment === null) {
    assignment = await getCachedAssignment(assignmentId);
  }
  if (assignment === null) {
    return null;
  }
  if (assignment.documents.length === 0) return null;

  return (
    <div>
      <p className="font-medium">Vedhæftede filer:</p>
      <ul className="flex flex-col gap-y-2">
        {assignment.documents.map((item, index) => {
          const key = `${item.href}-${item.name}`;
          return (
            <li key={key} className="flex ">
              <DocumentButton
                className="text-sm"
                strDocument={JSON.stringify(item)}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
