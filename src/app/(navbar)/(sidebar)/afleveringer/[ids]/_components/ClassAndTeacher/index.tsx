import { getCachedAssignment } from "@/cache-functions/getCachedAssignment";
import { Teacher } from "@/components/global/Teacher";
import { lectioAPI } from "@/lib/lectio-api";
import { ClassAndTeacherSkeleton } from "./ClassAndTeacherSkeleton";

type Props = {
  schoolClass: string | undefined;
  subject: string | undefined;
  assignmentId: string;
};

export async function ClassAndTeacher({
  assignmentId,
  schoolClass,
  subject,
}: Props) {
  let assignment = await lectioAPI.getAssignment.byId({
    assignmentId: assignmentId,
  });

  if (assignment === null) {
    assignment = await getCachedAssignment(assignmentId);
  }
  if (assignment === null) {
    return (
      <ClassAndTeacherSkeleton
        schoolClass={schoolClass}
        subject={subject}
        assignmentId={assignmentId}
      />
    );
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
