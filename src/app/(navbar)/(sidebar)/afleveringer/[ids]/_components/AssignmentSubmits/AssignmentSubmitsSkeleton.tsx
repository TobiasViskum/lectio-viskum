import { getLectioProps } from "@/lib/auth/getLectioProps";
import { getRedisClient } from "@/lib/get-redis-client";
import { getAssignmentTag } from "@/lib/lectio-api/getTags";
import { Submit } from "../Submit";

type Props = {
  assignmentId: string;
};
export async function AssignmentSubmitsSkeleton({ assignmentId }: Props) {
  let assignment: FullAssignment | null = null;

  const userId = getLectioProps().userId;
  const client = await getRedisClient();
  const tag = getAssignmentTag(userId, assignmentId);
  if (client) {
    const foundCache = (await client.json.get(
      tag,
    )) as RedisCache<FullAssignment>;
    if (foundCache) {
      assignment = foundCache.data;
    }
    await client.quit();
  }

  if (assignment === null) return null;

  const studentName = assignment.studentName;

  const studentSubmits = assignment.submits.filter(
    (obj) => obj.submitter.toLowerCase() === studentName.toLowerCase(),
  );
  const teacherSubmits = assignment.submits.filter(
    (obj) => obj.submitter.toLowerCase() !== studentName.toLowerCase(),
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
