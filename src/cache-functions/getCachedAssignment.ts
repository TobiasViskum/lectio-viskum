import { getAssignmentTag } from "@/api-functions/getTags";
import { getLectioProps } from "@/lib/auth/getLectioProps";
import { getRedisClient } from "@/lib/get-redis-client";

export async function getCachedAssignment(assignmentId: string) {
  let assignment: FullAssignment | null = null;
  const client = await getRedisClient();
  const userId = getLectioProps().userId;
  const tag = getAssignmentTag(userId, assignmentId);
  if (client) {
    const foundCache = (await client.json.get(
      tag,
    )) as RedisCache<FullAssignment>;
    if (foundCache) {
      assignment = foundCache.data;
    }
    await client.quit();
    return assignment;
  }

  return null;
}
