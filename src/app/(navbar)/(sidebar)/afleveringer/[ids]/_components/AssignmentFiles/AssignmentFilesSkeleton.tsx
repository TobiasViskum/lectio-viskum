import { getPageState } from "../../page-state";
import Link from "next/link";

export async function AssignmentFilesSkeleton() {
  const pageState = getPageState();
  let assignment = await pageState.cachedAssignment;

  if (assignment === null) return null;
  if (assignment.documents.length === 0) return null;

  return (
    <div>
      <p className="font-medium">Vedhæftede filer:</p>
      <ul className="flex flex-col gap-y-2">
        {assignment.documents.map((item) => {
          const key = `${item.href}-${item.name}`;
          return (
            <li key={key} className="flex ">
              <Link
                href={item.href}
                target="_blank"
                className="text-link text-sm hover:underline"
              >
                {item.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
