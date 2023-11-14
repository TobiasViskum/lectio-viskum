import { Badge } from "@/components/ui/badge";
import { Submit } from "../Submit";
import { Separator } from "@/components/ui/separator";
import { Fragment } from "react";
import { getCachedAssignment } from "@/cache-functions/getCachedAssignment";
import { lectioAPI } from "@/lib/lectio-api";

type Props = { assignmentId: string };

export async function AssignmentSubmits({ assignmentId }: Props) {
  let assignment = await lectioAPI.getAssignment.byId({
    assignmentId: assignmentId,
  });

  if (assignment === null) {
    assignment = await getCachedAssignment(assignmentId);
  }
  if (assignment === null) {
    return null;
  }

  const studentSubmits = assignment.submits.filter(
    (obj) => "studentId" in obj.submitter,
  );
  const teacherSubmits = assignment.submits.filter(
    (obj) => "teacherId" in obj.submitter,
  );

  return (
    <div className="flex max-w-3xl flex-col gap-y-8">
      {teacherSubmits.length > 0 && (
        <div className="flex flex-col gap-y-3">
          <Badge
            variant={"secondary"}
            className="w-max px-1 text-sm font-medium text-muted-foreground"
          >
            Feedback
          </Badge>
          {teacherSubmits.map((submit) => {
            const key = JSON.stringify(submit.time);
            return <Submit key={key} submit={submit} />;
          })}
        </div>
      )}
      {studentSubmits.length > 0 && (
        <div className="flex flex-col gap-y-4">
          <Badge
            variant={"secondary"}
            className="w-max px-1 text-sm font-medium text-muted-foreground"
          >
            Elevbesvarelser
          </Badge>
          {studentSubmits.map((submit, i) => {
            const key = JSON.stringify(submit.time);
            const addSeparator = i !== studentSubmits.length - 1;

            return (
              <Fragment key={key}>
                <Submit submit={submit} />
                {addSeparator && <Separator />}
              </Fragment>
            );
          })}
        </div>
      )}
    </div>
  );
}
