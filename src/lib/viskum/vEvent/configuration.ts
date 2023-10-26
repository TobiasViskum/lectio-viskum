export type EventMap = {
  searchSchool: { searchString: string };
  newScheduleWeek: { action: "forwards" | "backwards" };
  assignmentsFilter: {
    filter: "all" | "submitted" | "pending" | "missing";
    search: string;
  };
};
