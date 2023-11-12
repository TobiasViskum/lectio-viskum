import { Teacher } from "@/components/global/Teacher";
import { lectioAPI } from "@/lib/lectio-api";

type Props = { assignmentId: string };

export async function ClassAndTeacher({ assignmentId }: Props) {
  const assignment = await lectioAPI.getAssignment.byId({
    assignmentId: assignmentId,
  });

  if (assignment === null) {
    return <p>Error</p>;
  }

  return (
    <div className="flex flex-col gap-y-1">
      <div className="flex gap-x-1">
        <p className="font-bold">Klasse:</p>
        <p className="text-muted-foreground">
          {[assignment.subject, assignment.class].join(", ")}
        </p>
      </div>
      <div className="w-max">
        <Teacher teacher={assignment.teacher} />
      </div>
    </div>
  );
}
