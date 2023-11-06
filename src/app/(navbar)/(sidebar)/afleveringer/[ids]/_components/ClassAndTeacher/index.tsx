import { Teacher } from "@/components/global/Teacher";
import Image from "next/image";

type Props = { assignmentPromise: Promise<FullAssignment | null> };

export async function ClassAndTeacher({ assignmentPromise }: Props) {
  const assignment = await assignmentPromise;

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
      <Teacher teacher={assignment.teacher} />
    </div>
  );
}
