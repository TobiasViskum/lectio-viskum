import { getLectioProps } from "@/lib/auth/getLectioProps";
import { getRedisClient } from "@/lib/get-redis-client";
import { lectioAPI } from "@/lib/lectio-api";
import { getAllAssignmentsTag } from "@/lib/lectio-api/getTags";

export async function PrefetchInitialPages() {
  const userId = getLectioProps().userId;
  const client = await getRedisClient();
  if (client) {
    const tag = getAllAssignmentsTag(userId);
    const foundCache = await client.json.get(tag);
    if (foundCache === null) {
      lectioAPI.getAssignment.all();
    }
    await client.quit();
  }

  return null;
}
