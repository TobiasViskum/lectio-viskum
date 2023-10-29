import "server-only";
import { getTimeInMs } from "@/util/getTimeInMs";
import { getAssignmentsPage } from "../../getPage/getAssignmentsPage";
import { getAssignmentProps } from "./getAssignmentProps";

export async function getAssignments({
  lectioCookies,
  schoolCode,
  userId,
}: StandardProps) {
  const tag = `${userId}-assignments`;
  const foundCache = global.cache.get(tag);

  if (foundCache && new Date().getTime() < foundCache.expires) {
    return foundCache.data as Assignment[];
  }

  const res = await getAssignmentsPage({
    lectioCookies: lectioCookies,
    schoolCode: schoolCode,
  });

  if (res === "Not authenticated") return res;
  if (res === "Forbidden access") return res;
  if (res === "Invalid school") return res;
  if (res === null) return res;

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
    return "No data";
  }

  global.cache.set(tag, {
    data: assignments,
    expires: new Date().getTime() + getTimeInMs({ minutes: 5 }),
  });

  return assignments;
}
