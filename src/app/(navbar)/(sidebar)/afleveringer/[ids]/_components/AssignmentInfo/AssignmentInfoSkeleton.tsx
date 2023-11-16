import { NoDataSkeleton } from "./NoDataSkeleton";
import { getDate } from "../../../_util/getDate";
import { Separator } from "@/components/ui/separator";
import { getPageState } from "../../page-state";
import { Student } from "@/components/global/Student";
import { AddUserToAssignment } from "./AddUserToAssignment";

export async function AssignmentInfoSkeleton() {
  const pageState = getPageState();
  const cachedAssignment = await pageState.cachedAssignment;

  if (cachedAssignment === null) return <NoDataSkeleton />;

  const date = getDate(cachedAssignment.dueTo);
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
          <p className={p_2Tw}>{cachedAssignment.status}</p>
        </div>
        <Separator />
        <div className={divTw}>
          <p className={p_1Tw}>Fravær:</p>
          <p className={p_2Tw}>
            {isAssignmentDue ? cachedAssignment.absence : "0%"}
          </p>
        </div>
        <Separator />
        <div className={divTw}>
          <p className={p_1Tw}>Afventer:</p>
          <p className={p_2Tw}>{cachedAssignment.awaiter}</p>
        </div>
        {cachedAssignment.grade !== "" && (
          <>
            <Separator />
            <div className={divTw}>
              <p className={p_1Tw}>Karakter:</p>
              <p className={p_2Tw}>{cachedAssignment.grade}</p>
            </div>
          </>
        )}
        {cachedAssignment.studentNote !== "" && (
          <>
            <Separator />
            <div className={divTw}>
              <p className={p_1Tw}>Elevnote:</p>
              <p className={p_2Tw}>{cachedAssignment.studentNote}</p>
            </div>
          </>
        )}
        {cachedAssignment.gradeNote !== "" && (
          <>
            <Separator />
            <div className={divTw}>
              <p className={p_1Tw}>Karakternote:</p>
              <p className={p_2Tw}>{cachedAssignment.gradeNote}</p>
            </div>
          </>
        )}
        {(cachedAssignment.students.length > 1 ||
          cachedAssignment.groupMembersToAdd.length > 0) && (
          <div className="flex flex-col gap-y-4 pt-4 md:hidden">
            <div className="flex flex-col gap-y-2">
              <p className="text-xs text-muted-foreground">GRUPPEMEDLEMMER</p>
              <div className="w-max">
                {cachedAssignment.students.map((student) => {
                  return (
                    <Student
                      student={student}
                      key={student.studentId}
                      size="small"
                    />
                  );
                })}
              </div>
            </div>
            {cachedAssignment.groupMembersToAdd.length > 0 && (
              <div className="flex flex-col gap-y-2">
                <p className="text-xs text-muted-foreground">TILFØJ MEDLEM</p>
                <AddUserToAssignment
                  groupMembersToAdd={cachedAssignment.groupMembersToAdd}
                  assignmentId={cachedAssignment.assignmentId}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
