import { getScheduleTag } from "@/api-functions/getTags";
import { getRedisClient } from "@/lib/get-redis-client";

export async function getCachedSchedule(
  userId: string,
  week: string,
  year: string,
) {
  let schedule: Week[] | null = null;
  const client = await getRedisClient();
  const tag = getScheduleTag(userId, week, year);
  if (client) {
    const foundCache = (await client.json.get(tag)) as RedisCache<Week[]>;
    if (foundCache) {
      schedule = foundCache.data;
    }
    await client.quit();
    return schedule;
  }

  return null;
}
