import { urlify } from "@/util/urlify";

type Props = { assignmentPromise: Promise<FullAssignment | null> };

export async function AssignmentDescription({ assignmentPromise }: Props) {
  const assignment = await assignmentPromise;

  if (assignment === null) return null;

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
