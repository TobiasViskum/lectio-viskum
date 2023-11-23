import { getCachedSchedule } from "@/cache-functions/getCachedSchedule";
import { lectioAPI } from "@/lib/lectio-api";

let schedule: Promise<Week[] | null> = new Promise((resolve) => resolve(null));
let cachedSchedule: Promise<Week[] | null> = new Promise((resolve) =>
  resolve(null),
);

export function getPageState() {
  return {
    cachedSchedule: cachedSchedule,
    schedule: schedule,
  };
}
export function setPageState(userId: string, week: string, year: string) {
  cachedSchedule = getCachedSchedule(userId, week, year);
  schedule = lectioAPI.getSchedule.byStudentId({
    userId: userId,
    week: week,
    year: year,
  });
}
