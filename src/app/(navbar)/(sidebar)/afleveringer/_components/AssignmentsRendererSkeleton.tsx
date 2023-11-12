import { LoadingDots } from "@/components/loading-components/LoadingDots";
import { AssignmentsWrapper } from "./AssignmentsWrapper";
import { getLectioProps } from "@/lib/auth/getLectioProps";
import { getRedisClient } from "@/lib/get-redis-client";
import { getAllAssignmentsTag } from "@/lib/lectio-api/getTags";

export async function AssignmentsRendererSkeleton() {
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

  if (assignments === null) {
    return <LoadingDots className="mt-8" />;
  }

  return <AssignmentsWrapper strAssignments={JSON.stringify(assignments)} />;
}
