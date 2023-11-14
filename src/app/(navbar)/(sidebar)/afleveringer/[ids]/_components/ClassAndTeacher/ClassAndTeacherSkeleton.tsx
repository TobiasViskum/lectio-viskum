import { getRedisClient } from "@/lib/get-redis-client";
import { NoDataSkeleton } from "./NoDataSkeleton";
import { getAssignmentTag } from "@/api-functions/getTags";
import { getLectioProps } from "@/lib/auth/getLectioProps";
import { ClassAndTeacher } from ".";
import { Teacher } from "@/components/global/Teacher";
import { getCachedAssignment } from "@/cache-functions/getCachedAssignment";

type Props = {
  schoolClass: string | undefined;
  subject: string | undefined;
  assignmentId: string;
};

export async function ClassAndTeacherSkeleton({
  schoolClass,
  subject,
  assignmentId,
}: Props) {
  let assignment = await getCachedAssignment(assignmentId);

  if (assignment === null) {
    return <NoDataSkeleton schoolClass={schoolClass} subject={subject} />;
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
