export function getClass(classStr: string, getFull: boolean = false) {
  classStr = classStr
    .trim()
    .replace("Alle 1. G. elever", "1.G")
    .replace("Alle 2. G. elever", "2.G")
    .replace("Alle 3. G. elever", "3.G")
    .replace("Alle 4. G. elever", "4.G")
    .replace("Alle Lærere", "Alle lærere")
    .replace("Udlån af lokaler", "");

  if (getFull) {
    return classStr;
  }

  const splitClass = classStr.split(" ");
  return splitClass[0];
}
