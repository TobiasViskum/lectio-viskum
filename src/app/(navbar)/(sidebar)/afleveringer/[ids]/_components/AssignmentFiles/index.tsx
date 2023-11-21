import { getPageState } from "../../page-state";
import Link from "next/link";

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
              <button
                data-lectio-href={item.href}
                className="text-link break-all text-sm [text-wrap:balance] hover:underline"
              >
                {item.name}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
