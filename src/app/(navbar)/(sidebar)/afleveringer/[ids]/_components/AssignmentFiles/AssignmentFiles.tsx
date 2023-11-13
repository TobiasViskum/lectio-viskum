import { DocumentButton } from "@/components/global/DocumentButton";

type Props = { assignmentPromise: Promise<FullAssignment | null> };

export async function AssignmentFiles({ assignmentPromise }: Props) {
  const assignment = await assignmentPromise;

  if (assignment === null) return null;
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
