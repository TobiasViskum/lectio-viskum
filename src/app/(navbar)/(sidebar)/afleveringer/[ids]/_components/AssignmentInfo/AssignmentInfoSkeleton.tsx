import { getLectioProps } from "@/lib/auth/getLectioProps";
import { NoDataSkeleton } from "./NoDataSkeleton";
import { getRedisClient } from "@/lib/get-redis-client";
import { getAssignmentTag } from "@/api-functions/getTags";
import { getDate } from "../../../_util/getDate";
import { Separator } from "@/components/ui/separator";
import { getCachedAssignment } from "@/cache-functions/getCachedAssignment";

type Props = {
  assignmentId: string;
};
export async function AssignmentInfoSkeleton({ assignmentId }: Props) {
  let assignment = await getCachedAssignment(assignmentId);

  if (assignment === null) return <NoDataSkeleton />;

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
        {assignment.grade !== "" && (
          <>
            <Separator />
            <div className={divTw}>
              <p className={p_1Tw}>Karakter:</p>
              <p className={p_2Tw}>{assignment.grade}</p>
            </div>
          </>
        )}
        {assignment.studentNote !== "" && (
          <>
            <Separator />
            <div className={divTw}>
              <p className={p_1Tw}>Elevnote:</p>
              <p className={p_2Tw}>{assignment.studentNote}</p>
            </div>
          </>
        )}
        {assignment.gradeNote !== "" && (
          <>
            <Separator />
            <div className={divTw}>
              <p className={p_1Tw}>Karakternote:</p>
              <p className={p_2Tw}>{assignment.gradeNote}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
