export function getWeekAndYear(date: Date) {
  // Copy date so don't modify original
  date = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
  );
  // Set to nearest Thursday: current date + 4 - current day number
  // Make Sunday's day number 7
  date.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay() || 7));
  // Get first day of year
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  // Calculate full weeks to nearest Thursday
  const weekNo = Math.ceil(
    ((date.getTime() - yearStart.getTime()) / 86400000 + 1) / 7,
  );
  // Pad week number with leading zero if necessary
  const weekString = weekNo < 10 ? "0" + weekNo : "" + weekNo;
  // Return object with year and week number

  return { year: date.getUTCFullYear().toString(), week: weekString };
}
