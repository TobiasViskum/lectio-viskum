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
export function getAllSubjectsTag(schoolCode: string) {
  return `all-subjects:${schoolCode}`;
}
export function getAllSchoolClassesTag(schoolCode: string) {
  return `all-school-classes:${schoolCode}`;
}
export function getMessagesTag(
  userId: string,
  type: "favorites" | "newest" | "sent",
) {
  return `messages:${type}:${userId}`;
}
