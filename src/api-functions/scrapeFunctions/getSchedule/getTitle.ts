import { capitalizeFirstLetter } from "@/util/capitalizeFirstLetter";
import { pattern1, pattern2, pattern3 } from "./timePatterns";

export function getTitle(info: string) {
  const splitInfo = info.split("\n");
  let potentialTitle = splitInfo[0];
  if (splitInfo[0].includes("Aflyst!") || splitInfo[0].includes("Ændret!")) {
    potentialTitle = splitInfo[1];
  }

  if (potentialTitle.includes("Aflyst!")) return "";
  if (potentialTitle.includes("Ændret!")) return "";
  if (pattern1.test(potentialTitle)) return "";
  if (pattern2.test(potentialTitle)) return "";
  if (pattern3.test(potentialTitle)) return "";

  if (potentialTitle.includes("Lektiecafé")) {
    return potentialTitle.split(" ")[0];
  }

  return capitalizeFirstLetter(potentialTitle);
}
