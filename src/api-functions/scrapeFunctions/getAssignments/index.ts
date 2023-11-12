import "server-only";
import { getTimeInMs } from "@/util/getTimeInMs";
import { getAssignmentsPage } from "../../getPage/getAssignmentsPage";
import { getAssignmentProps } from "./getAssignmentProps";
import { getLectioProps } from "@/lib/auth/getLectioProps";
import { getAllAssignmentsTag } from "@/lib/lectio-api/getTags";
import { getRedisClient } from "@/lib/get-redis-client";

export async function getAssignments() {
  const client = await getRedisClient();
  const userId = getLectioProps().userId;
  const tag = getAllAssignmentsTag(userId);
  if (client) {
    const foundCache = (await client.json.get(tag)) as RedisCache<Assignment[]>;

    if (foundCache && new Date().getTime() < foundCache.expires) {
      await client.quit();
      return foundCache.data;
    }
  }

  const res = await getAssignmentsPage();

  if (
    res === null ||
    res === "Not authenticated" ||
    res === "Forbidden access" ||
    res === "Invalid school"
  ) {
    if (client) await client.quit();
    return res;
  }

  const $ = res.$;

  const assignments: Assignment[] = $(
    "#s_m_Content_Content_ExerciseGV > tbody > tr:not(:first-child)",
  )
    .map((index, item) => {
      const $item = $(item);
      const res = getAssignmentProps($item);

      return res;
    })
    .get();

  if (assignments.length === 0) {
    if (client) await client.quit();
    return "No data";
  }

  if (client) {
    await client.json.set(tag, "$", {
      data: assignments,
      expires: new Date().getTime() + getTimeInMs({ minutes: 1 }),
    });
    await client.quit();
  }

  return assignments;
}
