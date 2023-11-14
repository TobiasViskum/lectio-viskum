export function getUserTag(userId: string) {
  return `user:${userId}`;
}
export function getScheduleTag(userId: string, week: string, year: string) {
  return `schedule:${userId}:${week + year}`;
}
export function getAllAssignmentsTag(userId: string) {
  return `all-assignments:${userId}`;
}
export function getAssignmentTag(userId: string, assignmentId: string) {
  return `assignment:${userId}:${assignmentId}`;
}
export function getAllTeachersTag(schoolCode: string) {
  return `all-teachers:${schoolCode}`;
}
