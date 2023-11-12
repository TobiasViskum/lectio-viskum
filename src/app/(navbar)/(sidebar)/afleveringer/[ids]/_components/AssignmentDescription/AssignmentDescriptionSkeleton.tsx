import { getLectioProps } from "@/lib/auth/getLectioProps";
import { NoDataSkeleton } from "./NoDataSkeleton";
import { getRedisClient } from "@/lib/get-redis-client";
import { getAssignmentTag } from "@/lib/lectio-api/getTags";
import { urlify } from "@/util/urlify";

type Props = {
  assignmentId: string;
};

export async function AssignmentDescriptionSkeleton({ assignmentId }: Props) {
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

  if (assignment === null) return <NoDataSkeleton />;

  return (
    <div className="flex max-w-3xl flex-col gap-y-1">
      <p className="font-medium">Opgavebeskrivelse:</p>
      <p
        className="text-sm text-muted-foreground"
        dangerouslySetInnerHTML={{
          __html: urlify(assignment.description.join("<br/>")),
        }}
      ></p>
    </div>
  );
}
