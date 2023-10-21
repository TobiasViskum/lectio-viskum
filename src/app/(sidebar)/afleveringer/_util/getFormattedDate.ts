import { getDate } from "./getDate";

export function getFormattedDate(assignment: Assignment) {
  const date = getDate(assignment);

  const msBetween = date.getTime() - new Date().getTime();
  const daysBetween = msBetween / (1000 * 60 * 60 * 24);

  const hoursBetween =
    Math.floor((msBetween % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) - 1;
  const minutesBetween = Math.floor(
    (msBetween % (1000 * 60 * 60)) / (1000 * 60),
  );
  const secondsBetween = Math.floor((msBetween % (1000 * 60)) / 1000);

  const daysText = daysBetween !== 1 ? "dage" : "dag";
  const hoursText = hoursBetween !== 1 ? "timer" : "time";
  const minutesText = minutesBetween !== 1 ? "minutter" : "minut";
  const secondsText = secondsBetween !== 1 ? "sekunder" : "sekund";

  if (daysBetween > 14 || daysBetween < 0) {
    return new Intl.DateTimeFormat("da-dk", {
      dateStyle: "long",
      timeStyle: "short",
    }).format(date);
  } else if (daysBetween > 1) {
    if (hoursBetween === 0)
      return [Math.floor(daysBetween), daysText].join(" ");
    return [
      Math.floor(daysBetween),
      daysText,
      "og",
      hoursBetween,
      hoursText,
    ].join(" ");
  } else if (hoursBetween > 1) {
    if (minutesBetween === 0) return [hoursBetween, hoursText].join(" ");
    return [hoursBetween, hoursText, "og", minutesBetween, minutesText].join(
      " ",
    );
  } else if (minutesBetween > 1) {
    if (secondsBetween === 0) return [minutesBetween, minutesText].join(" ");
    return [
      minutesBetween,
      minutesText,
      "og",
      secondsBetween,
      secondsText,
    ].join(" ");
  } else {
    return [secondsBetween, secondsText].join(" ");
  }
}
