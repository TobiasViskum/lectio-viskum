import { getAllAssignmentsTag } from "@/api-functions/getTags";
import { getLectioProps } from "@/lib/auth/getLectioProps";
import { getRedisClient } from "@/lib/get-redis-client";

export async function getCachedAllAssignments() {
  let assignments: Assignment[] | null = null;
  const client = await getRedisClient();
  const userId = getLectioProps().userId;
  const tag = getAllAssignmentsTag(userId);
  if (client) {
    const foundCache = (await client.json.get(tag)) as RedisCache<Assignment[]>;
    if (foundCache) {
      assignments = foundCache.data;
    }
    await client.quit();
    return assignments;
  }

  return null;
}
