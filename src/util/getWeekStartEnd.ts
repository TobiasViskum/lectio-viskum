export function getWeekStartEnd(year: number, week: number) {
  // Create a new date object at the first day of the year
  let date = new Date(year, 0, 1);

  // Get the day of the week for the new year (0 to 6)
  let day = date.getDay();

  // Calculate the date for the first Monday of the year
  date.setDate(date.getDate() + (day <= 4 ? 1 - day : 8 - day));

  // Calculate the start date of the desired week
  let startDate = new Date(date.getTime());
  startDate.setDate(startDate.getDate() + 7 * (week - 1));

  // Calculate the end date of the desired week
  let endDate = new Date(startDate.getTime());
  endDate.setDate(endDate.getDate() + 6);

  return { start: startDate, end: endDate };
}
