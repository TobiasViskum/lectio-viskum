export function getTitle(info: string) {
  const pattern1 = /([0-9:]+ [-|til] [0-9:]+)/i;
  const pattern2 = /([0-9\/-]+ [0-9:]+ [-|til] [0-9\/-]+ [0-9:]+)/i;

  const splitInfo = info.split("\n");
  let potentialTitle = splitInfo[0];
  if (splitInfo[0].includes("Aflyst!") || splitInfo[0].includes("Ændret!")) {
    potentialTitle = splitInfo[1];
  }

  if (potentialTitle.includes("Aflyst!")) return "";
  if (potentialTitle.includes("Ændret!")) return "";
  if (pattern1.test(potentialTitle)) return "";
  if (pattern2.test(potentialTitle)) return "";

  if (potentialTitle.includes("Lektiecafé")) {
    return potentialTitle.split(" ")[0];
  }

  return potentialTitle;
}
