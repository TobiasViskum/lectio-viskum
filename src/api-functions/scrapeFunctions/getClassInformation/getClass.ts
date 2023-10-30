export function getClass(classStr: string, getFull: boolean = false) {
  classStr = classStr
    .trim()
    .replace("Alle 1. G. elever", "Alle 1.G elever")
    .replace("Alle 2. G. elever", "Alle 2.G elever")
    .replace("Alle 3. G. elever", "Alle 3.G elever")
    .replace("Alle 4. G. elever", "Alle 4.G elever")
    .replace("Alle Lærere", "Alle lærere")
    .replace("Udlån af lokaler", "");

  if (getFull) {
    return classStr;
  }

  const splitClass = classStr.split(" ");
  return splitClass[0];
}
