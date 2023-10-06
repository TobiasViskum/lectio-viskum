export function getSubjectName(classStr: string) {
  const lcClass = classStr.toLowerCase().replace(/^[^\s]*\s/, "");
  if (lcClass.includes("fy øv")) return "Fysikøvelse";
  if (lcClass.includes("ke øv")) return "Kemiøvelse";
  if (lcClass.includes("fy")) return "Fysik";
  if (lcClass.includes("ke")) return "Kemi";
  if (lcClass.includes("hi")) return "Historie";
  if (lcClass.includes("en")) return "Engelsk";
  if (lcClass.includes("da")) return "Dansk";
  if (lcClass.includes("if")) return "Informatik";
  if (lcClass.includes("ma")) return "Matematik";
  if (lcClass.includes("id")) return "Idræt";
  if (lcClass.includes("sa")) return "Samfundsfag";
  if (lcClass.includes("ty")) return "Tysk";
  if (lcClass.includes("bt")) return "Bioteknologi";
  if (lcClass.includes("la")) return "Latin";
  if (lcClass.includes("ap alm")) return "Almen sprogforståelse";
  if (lcClass.includes("de")) return "Design";
  if (lcClass.includes("mu")) return "Musik";
  if (lcClass.includes("bi")) return "Musik";
  if (lcClass.includes("ol")) return "Oldtidskundskab";
  if (lcClass.includes("as")) return "Astronomi";
  if (lcClass.includes("bk")) return "Billedkunst";
  if (lcClass.includes("bro")) return "Brobygning";
  if (lcClass.includes("eø")) return "Erhvervsøkonomi";
  if (lcClass.includes("fi")) return "Filosofi";
  if (lcClass.includes("fr")) return "Fransk";
  if (lcClass.includes("me")) return "Mediefag";
  if (lcClass.includes("ng")) return "Naturgeografi";
  if (lcClass.includes("ps")) return "Psykologi";
  if (lcClass.includes("re")) return "Religion";
  if (lcClass.includes("skr")) return "Skriftlige opgaver";
  if (lcClass.includes("sp")) return "Spansk";
  if (lcClass.includes("mc")) {
    const mcName = lcClass.replace(/mc [0-9]+/i, "");
    return `${mcName} (Masterclass)`;
  }
  if (lcClass.includes("mk")) {
    const mkName = lcClass.replace(/mk [0-9]+/i, "");
    return `${mkName} (Marselianerklub)`;
  }
  return classStr;
}
