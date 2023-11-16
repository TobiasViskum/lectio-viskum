import { getCachedAssignment } from "@/cache-functions/getCachedAssignment";
import { DocumentButton } from "@/components/global/DocumentButton";
import { lectioAPI } from "@/lib/lectio-api";
import { getPageState } from "../../page-state";

export async function AssignmentFiles() {
  const pageState = getPageState();
  let assignment = await pageState.assignment;

  if (assignment === null) {
    assignment = await pageState.cachedAssignment;
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
