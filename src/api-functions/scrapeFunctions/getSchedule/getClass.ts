export function getClass(info: string) {
  const pattern = /Hold: ([a-zæøå0-9. ()-]+(, [a-zæøå0-9. ()-]+)*)/i;

  const matchedText = info.match(pattern);
  if (matchedText) {
    return matchedText[1].split(", ");
  }
  return [];
}
