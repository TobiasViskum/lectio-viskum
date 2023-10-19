export type EventMap = {
  searchSchool: { searchString: string };
  newScheduleWeek: { action: "next" | "previous" };
  assignmentsFilter: { filter: "all" | "submitted" | "pending" | "missing" };
  assignmentsDateUpdate: {};
};
