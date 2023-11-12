import { getLectioProps } from "@/lib/auth/getLectioProps";
import { getRedisClient } from "@/lib/get-redis-client";
import { getAllAssignmentsTag } from "@/lib/lectio-api/getTags";
import { Buttons } from "./Buttons";
import { NoDataSkeleton } from "./NoDataSkeleton";

export async function FilterButtonsSkeleton() {
  let assignments: null | Assignment[] = null;

  const client = await getRedisClient();
  const userId = getLectioProps().userId;
  const tag = getAllAssignmentsTag(userId);
  const foundCache = (await client.json.get(tag)) as RedisCache<Assignment[]>;
  if (foundCache) {
    assignments = foundCache.data;
  }
  await client.quit();

  if (assignments === null) {
    return <NoDataSkeleton />;
  }

  return <Buttons strAssignments={JSON.stringify(assignments)} />;
}
