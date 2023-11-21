import { AddUserToAssignment } from "@/app/(navbar)/(sidebar)/afleveringer/[ids]/_components/AddUserToAssignment";
import { UploadButton } from "@/app/(navbar)/(sidebar)/afleveringer/[ids]/_components/UploadAssignment/UploadButton";
import { getPageState } from "@/app/(navbar)/(sidebar)/afleveringer/[ids]/page-state";
import { Teacher } from "@/components/global/Teacher";
import { H2 } from "@/components/ui/h2";
import { Separator } from "@/components/ui/separator";
import { AssignmentStudent } from "./AssignmentStudent";

export async function AssignmentSidebar() {
  const pageState = getPageState();
  let assignment = await pageState.assignment;
  if (assignment === null) {
    assignment = await pageState.cachedAssignment;
  }
  if (assignment === null || assignment === undefined) {
    return null;
  }

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <H2>Deltagere</H2>
        <div>
          <Teacher teacher={assignment.teacher} size="small" />
        </div>
        <Separator />
        {assignment.students.map((student, i) => {
          const firstStudentIdInList = assignment!.groupMembersToAdd[0]
            ? assignment!.groupMembersToAdd[0].studentId
            : "";

          return (
            <AssignmentStudent
              firstStudentIdInList={firstStudentIdInList}
              deleteIndex={i}
              assignmentId={assignment!.assignmentId}
              key={student.studentId}
              student={student}
            />
          );
        })}
        <div className="">
          <AddUserToAssignment
            inSidebar
            assignmentId={assignment.assignmentId}
            groupMembersToAdd={assignment.groupMembersToAdd}
          />
        </div>
      </div>
      {!assignment.finished && (
        <div className="space-y-4">
          <H2>Upload</H2>
          <UploadButton assignmentId={assignment.assignmentId} inSidebar />
        </div>
      )}
    </div>
  );
}
