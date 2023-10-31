export function getWeekAndYear(date: Date) {
  // Create a copy of the date
  let tempDate = new Date(date.valueOf());
  // Get the first day of the year
  let startOfYear = new Date(tempDate.getFullYear(), 0, 1);
  // Calculate the difference in milliseconds
  let diff = tempDate.getTime() - startOfYear.getTime();
  // Convert to days and add 1 for the first day of the year
  let dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24)) + 1;
  // Calculate the week number (ISO-8601)
  let week = Math.ceil(dayOfYear / 7);
  // Return the week number and year

  let strWeek = week.toString();
  if (strWeek.length === 1) {
    strWeek = "0" + strWeek;
  }
  let strYear = tempDate.getFullYear().toString();

  return { week: strWeek, year: strYear };
}
