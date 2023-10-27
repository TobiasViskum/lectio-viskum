export type EventMap = {
  searchSchool: { searchString: string };
  newScheduleDay: { newDay: number };
  assignmentsFilter: {
    filter: "all" | "submitted" | "pending" | "missing";
    search: string;
  };
};
