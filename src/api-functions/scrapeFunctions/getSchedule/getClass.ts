export function getClass(info: string) {
  const pattern = /Hold: ([a-zæøå0-9. ()-]+(, [a-zæøå0-9. ()-]+)*)/i;
  const i = info.search(pattern);
  const matchedText = info.match(pattern);
  if (i !== -1 && matchedText) {
    const strLength = matchedText[0].length;
    const classes = info.substring(i + 6, i + strLength);

    let splitClasses = classes.split(/ [a-z]{2,3},/gi);
    splitClasses.forEach((item, index) => {
      splitClasses[index] = splitClasses[index].trim();
      if (splitClasses[index].split(", ").length > 1) {
        splitClasses[index].split(", ").forEach((_class) => {
          splitClasses.push(_class.trim());
        });
        splitClasses.splice(index, 1);
      }
    });
    splitClasses.forEach((item, index) => {
      splitClasses[index] = splitClasses[index].trim();
    });
    return splitClasses;
  }
  return [""];
}
