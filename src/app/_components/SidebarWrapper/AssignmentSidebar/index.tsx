import { AddUserToAssignment } from "@/app/(navbar)/(sidebar)/afleveringer/[ids]/_components/AddUserToAssignment";
import { UploadAssignment } from "@/app/(navbar)/(sidebar)/afleveringer/[ids]/_components/UploadAssignment";
import { UploadButton } from "@/app/(navbar)/(sidebar)/afleveringer/[ids]/_components/UploadAssignment/UploadButton";
import { getPageState } from "@/app/(navbar)/(sidebar)/afleveringer/[ids]/page-state";
import { Student } from "@/components/global/Student";
import { Teacher } from "@/components/global/Teacher";
import { H2 } from "@/components/ui/h2";
import { Separator } from "@/components/ui/separator";

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
        {assignment.students.map((student) => {
          return (
            <Student key={student.studentId} student={student} size="small" />
          );
        })}
      </div>
      <div className="space-y-4">
        <H2>Upload</H2>
        <UploadButton assignmentId={assignment.assignmentId} inSidebar />
        <div className="">
          <AddUserToAssignment
            inSidebar
            assignmentId={assignment.assignmentId}
            groupMembersToAdd={assignment.groupMembersToAdd}
          />
        </div>
      </div>
    </div>
  );
}
