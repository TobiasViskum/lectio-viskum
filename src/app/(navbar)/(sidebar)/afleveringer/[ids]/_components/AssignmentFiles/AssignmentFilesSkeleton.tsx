import { DocumentButton } from "@/components/global/DocumentButton";
import { getCachedAssignment } from "@/cache-functions/getCachedAssignment";

type Props = {
  assignmentId: string;
};

export async function AssignmentFilesSkeleton({ assignmentId }: Props) {
  let assignment = await getCachedAssignment(assignmentId);

  if (assignment === null) return null;

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
