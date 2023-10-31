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

  const divTw = "flex justify-between";
  const p_1Tw = "";
  const p_2Tw = "text-muted-foreground";

  return (
    <div className="w-full max-w-md text-sm">
      <p className="pb-2 text-xs text-muted-foreground">INFO OM OPGAVEN:</p>

      <div className="flex flex-col gap-y-2 px-2 py-2 md:px-0">
        <div className={divTw}>
          <p className={p_1Tw}>Frist:</p>
          <p className={p_2Tw}>{formattedDate}</p>
        </div>
        <Separator />
        <div className={divTw}>
          <p className={p_1Tw}>Status:</p>
          <p className={p_2Tw}>{assignment.status}</p>
        </div>
        <Separator />
        <div className={divTw}>
          <p className={p_1Tw}>Fravær:</p>
          <p className={p_2Tw}>{isAssignmentDue ? assignment.absence : "0%"}</p>
        </div>
        <Separator />
        <div className={divTw}>
          <p className={p_1Tw}>Afventer:</p>
          <p className={p_2Tw}>{assignment.awaiter}</p>
        </div>
        <Separator />
        <div className={divTw}>
          <p className={p_1Tw}>Karakter:</p>
          <p className={p_2Tw}>{assignment.grade}</p>
        </div>
        <Separator />
        <div className={divTw}>
          <p className={p_1Tw}>Elevnote:</p>
          <p className={p_2Tw}>{assignment.studentNote}</p>
        </div>
        <Separator />
        <div className={divTw}>
          <p className={p_1Tw}>Karakternote:</p>
          <p className={p_2Tw}>{assignment.gradeNote}</p>
        </div>
      </div>
    </div>
  );
}
