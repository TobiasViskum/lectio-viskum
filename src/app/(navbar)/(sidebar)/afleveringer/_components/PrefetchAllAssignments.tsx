import { getLectioProps } from "@/lib/auth/getLectioProps";
import { getRedisClient } from "@/lib/get-redis-client";
import { lectioAPI } from "@/lib/lectio-api";
import { getAssignmentTag } from "@/lib/lectio-api/getTags";

type Props = { assignments: Assignment[] };

export async function PrefetchAllAssignments({ assignments }: Props) {
  const userId = getLectioProps().userId;

  assignments = assignments;
  const client = await getRedisClient();

  let currentAssignmentIndex = -1;
  for (let i = 0; i < assignments.length; i++) {
    const assignment = assignments[i];
    if (assignment.status === "Venter") {
      currentAssignmentIndex = i;
      break;
    }
  }
  for (
    let i = currentAssignmentIndex;
    i >= Math.max(0, currentAssignmentIndex - 5);
    i--
  ) {
    const assignmentId = assignments[i].id;
    async function fetchIfNoCache() {
      if (client) {
        const tag = getAssignmentTag(userId, assignmentId);
        const foundCache = await client.json.get(tag);
        if (foundCache === null) {
          lectioAPI.getAssignment.byId({
            assignmentId: assignmentId,
          });
        }
      }
    }
    fetchIfNoCache();
  }

  for (
    let i = currentAssignmentIndex;
    i >= Math.min(assignments.length - 1, currentAssignmentIndex + 5);
    i++
  ) {
    const assignmentId = assignments[i].id;
    async function fetchIfNoCache() {
      if (client) {
        const tag = getAssignmentTag(userId, assignmentId);
        const foundCache = await client.json.get(tag);
        if (foundCache === null) {
          lectioAPI.getAssignment.byId({
            assignmentId: assignmentId,
          });
        }
      }
    }
    fetchIfNoCache();
  }

  if (client) await client.quit();

  return null;
}
