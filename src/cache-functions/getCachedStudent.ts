import { getUserTag } from "@/api-functions/getTags";
import { getRedisClient } from "@/lib/get-redis-client";

export async function getCachedStudent(userId: string) {
  let student: Student | null = null;
  const client = await getRedisClient();
  const tag = getUserTag(userId);
  if (client) {
    const foundCache = (await client.json.get(tag)) as RedisCache<Student>;
    if (foundCache) {
      student = foundCache.data;
    }
    await client.quit();
    return student;
  }

  return null;
}
