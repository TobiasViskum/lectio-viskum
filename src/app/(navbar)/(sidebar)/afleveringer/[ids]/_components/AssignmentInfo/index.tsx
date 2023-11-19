import { Separator } from "@/components/ui/separator";
import { getDate } from "../../../_util/getDate";
import { getPageState } from "../../page-state";
import { Student } from "@/components/global/Student";
import { AddUserToAssignment } from "../AddUserToAssignment";

export async function AssignmentInfo() {
  const pageState = getPageState();
  let assignment = await pageState.assignment;

  if (assignment === null) {
    assignment = await pageState.cachedAssignment;
  }
  if (assignment === null) {
    return null;
  }

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
        {assignment.finished === false &&
          (assignment.students.length > 1 ||
            assignment.groupMembersToAdd.length > 0) && (
            <div className="flex flex-col gap-y-4 pt-4 md:hidden">
              <div className="flex flex-col gap-y-2">
                <p className="text-xs text-muted-foreground">GRUPPEMEDLEMMER</p>
                <div className="w-max">
                  {assignment.students.map((student) => {
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
              <AddUserToAssignment
                groupMembersToAdd={assignment.groupMembersToAdd}
                assignmentId={assignment.assignmentId}
              />
            </div>
          )}
      </div>
    </div>
  );
}
