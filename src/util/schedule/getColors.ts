import { getDate } from "./getDate";

export function getColors(assignment: Assignment) {
  const date = getDate(assignment.dueTo);

  const msBetween = date.getTime() - new Date().getTime();
  const daysBetween = msBetween / (1000 * 60 * 60 * 24);

  let sideColor = "bg-gray-400";
  let dateColor = "text-muted-foreground";
  if (assignment.status === "Afleveret") {
    sideColor = "bg-green-400";
  } else if (assignment.status === "Mangler") {
    sideColor = "bg-red-400";
  } else if (msBetween < 0) {
    sideColor = "bg-red-400";
  } else if (daysBetween <= 14 && daysBetween > 11) {
    sideColor = "bg-yellow-400";
    dateColor = "text-yellow-400";
  } else if (daysBetween <= 11 && daysBetween > 7) {
    sideColor = "bg-yellow-500";
    dateColor = "text-yellow-500";
  } else if (daysBetween <= 7 && daysBetween > 5) {
    sideColor = "bg-yellow-600";
    dateColor = "text-yellow-600";
  } else if (daysBetween <= 5 && daysBetween > 3) {
    sideColor = "bg-orange-500";
    dateColor = "text-orange-500";
  } else if (daysBetween <= 3 && daysBetween > 2) {
    sideColor = "bg-orange-600";
    dateColor = "text-orange-600";
  } else if (daysBetween <= 2 && daysBetween > 1) {
    sideColor = "bg-orange-700";
    dateColor = "text-orange-700";
  } else if (daysBetween <= 1) {
    sideColor = "bg-orange-800";
    dateColor = "text-orange-800";
  } else if (assignment.status === "Venter") {
    sideColor = "bg-gray-400";
    dateColor = "text-muted-foreground";
  }

  return { sideColor: sideColor, dateColor: dateColor };
}
