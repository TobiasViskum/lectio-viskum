import { getCachedAllAssignments } from "@/cache-functions/getCachedAllAssignments";
import { lectioAPI } from "@/lib/lectio-api";

let assignments: Promise<Assignment[] | null> = new Promise((resolve) =>
  resolve(null),
);
let cachedAssignments: Promise<Assignment[] | null> = new Promise((resolve) =>
  resolve(null),
);

export function getPageState() {
  return {
    cachedAssignment: cachedAssignments,
    assignment: assignments,
  };
}
export function setPageState() {
  cachedAssignments = getCachedAllAssignments();
  assignments = lectioAPI.getAssignment.all();
}
