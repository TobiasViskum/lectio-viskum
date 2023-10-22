import { Separator } from "@/components/ui/separator";
import { getDate } from "../../../_util/getDate";

type Props = { assignmentPromise: Promise<FullAssignment | null> };

export async function AssignmentInfo({ assignmentPromise }: Props) {
  const assignment = await assignmentPromise;

  if (assignment === null) return <p>Error</p>;

  const date = getDate(assignment.dueTo);
  const formattedDate = new Intl.DateTimeFormat("da-dk", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(date);

  const isAssignmentDue = date.getTime() - new Date().getTime() < 0;

  return (
    <div className="w-96 text-sm">
      <Separator />
      <div className="flex flex-col gap-y-0.5 py-2 pl-2">
        <div className="grid grid-cols-[auto_1fr] gap-x-2">
          <p className="font-bold">Frist:</p>
          <p className="text-muted-foreground">{formattedDate}</p>
        </div>
        <div className="grid grid-cols-[auto_1fr] gap-x-2">
          <p className="font-bold">Status:</p>
          <p className="text-muted-foreground">{assignment.status}</p>
        </div>
        <div className="grid grid-cols-[auto_1fr] gap-x-2">
          <p className="font-bold">Fravær:</p>
          <p className="text-muted-foreground">
            {isAssignmentDue ? assignment.absence : "0%"}
          </p>
        </div>
        <div className="grid grid-cols-[auto_1fr] gap-x-2">
          <p className="font-bold">Afventer:</p>
          <p className="text-muted-foreground">{assignment.awaiter}</p>
        </div>
        <div className="grid grid-cols-[auto_1fr] gap-x-2">
          <p className="font-bold">Karakter:</p>
          <p className="text-muted-foreground">{assignment.grade || "-"}</p>
        </div>
        <div className="grid grid-cols-[auto_1fr] gap-x-2">
          <p className="font-bold">Elevnote:</p>
          <p className="text-muted-foreground">
            {assignment.studentNote || "-"}
          </p>
        </div>
        <div className="grid grid-cols-[auto_1fr] gap-x-2">
          <p className="font-bold">Karakternote:</p>
          <p className="text-muted-foreground">{assignment.gradeNote || "-"}</p>
        </div>
      </div>
      <Separator />
    </div>
  );
}
