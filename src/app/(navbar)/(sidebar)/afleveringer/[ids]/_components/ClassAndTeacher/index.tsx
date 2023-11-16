import { getCachedAssignment } from "@/cache-functions/getCachedAssignment";
import { Teacher } from "@/components/global/Teacher";
import { lectioAPI } from "@/lib/lectio-api";
import { ClassAndTeacherSkeleton } from "./ClassAndTeacherSkeleton";
import { getPageState } from "../../page-state";

type Props = {
  schoolClass: string | undefined;
  subject: string | undefined;
};

export async function ClassAndTeacher({ schoolClass, subject }: Props) {
  const pageState = getPageState();

  let assignment = await pageState.assignment;

  if (assignment === null) {
    assignment = await pageState.cachedAssignment;
  }
  if (assignment === null) {
    return (
      <ClassAndTeacherSkeleton schoolClass={schoolClass} subject={subject} />
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
