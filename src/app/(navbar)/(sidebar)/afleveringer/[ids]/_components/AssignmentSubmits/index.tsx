import { Submit } from "../Submit";

type Props = { assignmentPromise: Promise<FullAssignment | null> };

export async function AssignmentSubmits({ assignmentPromise }: Props) {
  const assignment = await assignmentPromise;

  if (assignment === null) return <p>Error</p>;

  const studentSubmits = assignment.submits.filter(
    (obj) =>
      obj.submitter.toLowerCase() === assignment.studentName?.toLowerCase(),
  );
  const teacherSubmits = assignment.submits.filter(
    (obj) =>
      obj.submitter.toLowerCase() !== assignment.studentName?.toLowerCase(),
  );

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex flex-col gap-y-1">
        <p className="text-sm font-medium text-muted-foreground">Feedback:</p>
        {teacherSubmits.map((submit) => {
          const key = JSON.stringify(submit.time);
          return <Submit key={key} submit={submit} isSubmitterTeacher={true} />;
        })}
      </div>
      <div className="flex flex-col gap-y-1">
        <p className="text-sm font-medium text-muted-foreground">
          Elevbesvarelser:
        </p>
        {studentSubmits.map((submit) => {
          const key = JSON.stringify(submit.time);
          return (
            <Submit key={key} submit={submit} isSubmitterTeacher={false} />
          );
        })}
      </div>
    </div>
  );
}
