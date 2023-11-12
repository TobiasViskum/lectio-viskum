import { getLectioProps } from "@/lib/auth/getLectioProps";
import { getRedisClient } from "@/lib/get-redis-client";
import { lectioAPI } from "@/lib/lectio-api";
import { getAssignmentTag } from "@/lib/lectio-api/getTags";

type Props = { assignments: Assignment[] };

export async function PrefetchAllAssignments({ assignments }: Props) {
  const userId = getLectioProps().userId;

  assignments = assignments.reverse();

  for (let i = 0; i < assignments.length; i++) {
    if (i > 15) {
      continue;
    }

    if (assignments[i].status === "Venter") {
      const assignmentId = assignments[i].id;

      async function fetchIfNoCache() {
        const client = await getRedisClient();
        const tag = getAssignmentTag(userId, assignmentId);
        const foundCache = await client.json.get(tag);
        if (foundCache === null) {
          lectioAPI.getAssignment.byId({
            assignmentId: assignmentId,
          });
        }
        await client.quit();
      }
      fetchIfNoCache();
    }
  }

  return null;
}
