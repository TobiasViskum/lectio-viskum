export function getSubjectArray(info: string) {
  const pattern = /Hold: ([a-zæøå0-9. ()-]+(, [a-zæøå0-9. ()-]+)*)/i;

  const matchedText = info.match(pattern);

  if (matchedText) {
    const arrList = matchedText[1].split(", ");

    return arrList;
  }
  return [];
}
