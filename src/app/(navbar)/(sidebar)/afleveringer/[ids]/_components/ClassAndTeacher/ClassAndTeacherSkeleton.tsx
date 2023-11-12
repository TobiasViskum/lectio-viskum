import { getRedisClient } from "@/lib/get-redis-client";
import { NoDataSkeleton } from "./NoDataSkeleton";
import { getAssignmentTag } from "@/lib/lectio-api/getTags";
import { getLectioProps } from "@/lib/auth/getLectioProps";
import { ClassAndTeacher } from ".";
import { Teacher } from "@/components/global/Teacher";

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
