import { AddUserToAssignment } from "@/app/(navbar)/(sidebar)/afleveringer/[ids]/_components/AddUserToAssignment";
import { UploadAssignment } from "@/app/(navbar)/(sidebar)/afleveringer/[ids]/_components/UploadAssignment";
import { getPageState } from "@/app/(navbar)/(sidebar)/afleveringer/[ids]/page-state";
import { Student } from "@/components/global/Student";
import { Teacher } from "@/components/global/Teacher";
import { Badge } from "@/components/ui/badge";

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
    <div className="flex flex-col gap-y-6">
      <div className="flex flex-col gap-y-2">
        <Badge variant={"secondary"} className="w-fit text-muted-foreground">
          Lærere:
        </Badge>
        <Teacher teacher={assignment.teacher} size="small" />
      </div>
      <div className="flex flex-col gap-y-2">
        <Badge variant={"secondary"} className="w-fit text-muted-foreground">
          {assignment.students.length === 1 ? "Elev:" : "Elever:"}
        </Badge>
        {assignment.students.map((student) => {
          return (
            <Student key={student.studentId} student={student} size="small" />
          );
        })}
      </div>
      <UploadAssignment inSidebar></UploadAssignment>
      <div className="">
        <AddUserToAssignment
          inSidebar
          assignmentId={assignment.assignmentId}
          groupMembersToAdd={assignment.groupMembersToAdd}
        />
      </div>
    </div>
  );
}
