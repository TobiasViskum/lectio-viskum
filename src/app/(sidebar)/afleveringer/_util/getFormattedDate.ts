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

  const daysText = daysBetween > 1 ? "dage" : "dag";
  const hoursText = hoursBetween > 1 ? "timer" : "time";
  const minutesText = minutesBetween > 1 ? "minutter" : "minut";
  const secondsText = secondsBetween > 1 ? "sekunder" : "sekund";

  if (daysBetween > 14 || daysBetween < 0) {
    return new Intl.DateTimeFormat("da-dk", {
      dateStyle: "long",
      timeStyle: "short",
    }).format(date);
  } else if (daysBetween > 1) {
    return [
      Math.floor(daysBetween),
      daysText,
      "og",
      hoursBetween,
      hoursText,
    ].join(" ");
  } else if (hoursBetween > 1) {
    return [hoursBetween, hoursText, "og", minutesBetween, minutesText].join(
      " ",
    );
  } else if (minutesBetween > 1) {
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
