export function getWeekAndYear(date: Date) {
  // Create a copy of the date and set time to midday to avoid issues with daylight saving time
  const midday = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    12,
    0,
    0,
  );

  // Calculate day of the year - January 1st will be 1, January 2nd will be 2, etc.
  const startOfYear = new Date(midday.getFullYear(), 0, 0);
  const diff = midday.getTime() - startOfYear.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);

  // Calculate week number according to ISO-8601
  const startDayOfYear = (startOfYear.getDay() + 6) % 7;

  let weekNumber = Math.ceil((dayOfYear + startDayOfYear) / 7);

  // Adjust for years where Jan 1-3 fall on Friday through Sunday
  if (startDayOfYear >= 4 && weekNumber === 53) {
    weekNumber = 1;
  } else if (startDayOfYear < 4 && weekNumber === 0) {
    weekNumber =
      new Date(midday.getFullYear() - 1, 11, 31).getDay() >= 4 ? 53 : 52;
  }

  let week = weekNumber.toString();
  let year = midday.getFullYear().toString();

  if (week.length === 1) {
    week = "0" + week;
  }

  return { week: week, year: year };
}
