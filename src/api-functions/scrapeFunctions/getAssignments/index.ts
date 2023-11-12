import "server-only";
import { getTimeInMs } from "@/util/getTimeInMs";
import { getAssignmentsPage } from "../../getPage/getAssignmentsPage";
import { getAssignmentProps } from "./getAssignmentProps";
import { getLectioProps } from "@/lib/auth/getLectioProps";

export async function getAssignments() {
  const userId = getLectioProps().userId;
  const tag = `${userId}-assignments`;
  const foundCache = global.shortTermCache.get(tag);

  if (foundCache && new Date().getTime() < foundCache.expires) {
    return foundCache.data as Assignment[];
  }

  const res = await getAssignmentsPage();

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

  global.shortTermCache.set(tag, {
    data: assignments,
    expires: new Date().getTime() + getTimeInMs({ minutes: 1 }),
  });

  return assignments;
}
