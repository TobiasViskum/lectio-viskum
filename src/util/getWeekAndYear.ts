export function getWeekAndYear(date: Date) {
  const dowOffset = 1;
  let newYear = new Date(date.getFullYear(), 0, 1);
  let day = newYear.getDay() - dowOffset;
  day = day >= 0 ? day : day + 7;
  let dayNum =
    Math.floor(
      (date.getTime() -
        newYear.getTime() -
        (date.getTimezoneOffset() - newYear.getTimezoneOffset()) * 60000) /
        86400000,
    ) + 1;
  let weekNum;

  if (day < 4) {
    weekNum = Math.floor((dayNum + day - 1) / 7) + 1;
    if (weekNum > 52) {
      let nYear = new Date(date.getFullYear() + 1, 0, 1);
      let nDay = nYear.getDay() - dowOffset;
      nDay = nDay >= 0 ? nDay : nDay + 7;

      weekNum = nDay < 4 ? 1 : 53;
    }
  } else {
    weekNum = Math.floor((dayNum + day - 1) / 7);
  }

  return { week: weekNum.toString(), year: date.getFullYear().toString() };
}
