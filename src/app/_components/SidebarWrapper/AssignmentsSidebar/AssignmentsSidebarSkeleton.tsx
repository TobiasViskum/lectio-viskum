import { lectioAPI } from "@/lib/lectio-api";
import { Content } from "./Content";
import { getRedisClient } from "@/lib/get-redis-client";
import { getLectioProps } from "@/lib/auth/getLectioProps";
import { getAllAssignmentsTag } from "@/lib/lectio-api/getTags";

import { NoDataSkeleton } from "./NoDataSkeleton";

export async function AssignmentsSidebarSkeleton() {
  let assignments: null | Assignment[] = null;

  const client = await getRedisClient();
  const userId = getLectioProps().userId;
  const tag = getAllAssignmentsTag(userId);
  if (client) {
    const foundCache = (await client.json.get(tag)) as RedisCache<Assignment[]>;
    if (foundCache) {
      assignments = foundCache.data;
    }
    await client.quit();
  }

  if (assignments === null) return <NoDataSkeleton />;

  return <Content strAssignments={JSON.stringify(assignments)} />;
}
