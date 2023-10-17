export function getDate(assignment: Assignment) {
  const splitDueTo = assignment.dueTo.split("-");
  const splitDayMonth = splitDueTo[0].split("/");
  const day = Number(splitDayMonth[0]);
  const month = Number(splitDayMonth[1]) - 1;
  const splitYearTime = splitDueTo[1].split(" ");
  const year = Number(splitYearTime[0]);

  const splitHoursMinutes = splitYearTime[1].split(":");
  const hours = Number(splitHoursMinutes[0]) - 1;
  const minutes = Number(splitHoursMinutes[1]);

  return new Date(year, month, day, hours, minutes);
}
