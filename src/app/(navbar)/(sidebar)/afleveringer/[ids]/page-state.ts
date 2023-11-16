import { getCachedAssignment } from "@/cache-functions/getCachedAssignment";
import { lectioAPI } from "@/lib/lectio-api";

let cachedAssignment: Promise<FullAssignment | null> = new Promise((resolve) =>
  resolve(null),
);
let assignment: Promise<FullAssignment | null> = new Promise((resolve) =>
  resolve(null),
);

export function getPageState() {
  return {
    cachedAssignment: cachedAssignment,
    assignment: assignment,
  };
}
export function setPageState(assignmentId: string) {
  cachedAssignment = getCachedAssignment(assignmentId);
  assignment = lectioAPI.getAssignment.byId({ assignmentId: assignmentId });
}
