import "server-only";

export function getSubjects(
  providedClassStr: string[],
  allSubjects: Subject[] | null,
) {
  let resultSubjects: string[] = [];

  for (let l = 0; l < providedClassStr.length; l++) {
    let hasFoundSubject = false;

    const classStr = providedClassStr[l];

    const splitStr = classStr.split(" ");
    let providedSubject = classStr;
    for (let i = 0; i < splitStr.length; i++) {
      const str = splitStr[i];
      if (i === 0) continue;
      if (str.length === 1) continue;
      let tempSplitStr = [...splitStr];
      let count = 0;
      do {
        tempSplitStr.shift();
        count++;
      } while (count < i);
      providedSubject = tempSplitStr.join(" ");
      break;
    }
    providedSubject = providedSubject.toLowerCase();

    if (allSubjects === null) {
      hasFoundSubject = true;
      resultSubjects.push(classStr);
      break;
    }

    if (hasFoundSubject) continue;

    //Strict check
    for (let i = 0; i < allSubjects.length; i++) {
      const obj = allSubjects[i];
      const shortName = obj.shortName.toLowerCase();
      const fullName = obj.fullName.toLowerCase();

      if (shortName !== "" && shortName === providedSubject) {
        hasFoundSubject = true;
        resultSubjects.push(obj.fullName);
        break;
      } else if (fullName === providedSubject) {
        hasFoundSubject = true;
        resultSubjects.push(obj.fullName);
        break;
      }
    }

    if (hasFoundSubject) continue;

    //Less strict check
    for (let i = 0; i < allSubjects.length; i++) {
      const obj = allSubjects[i];
      const fullName = obj.fullName.toLowerCase();

      if (providedSubject.includes(fullName)) {
        hasFoundSubject = true;
        resultSubjects.push(obj.fullName);
        break;
      }
    }
    if (hasFoundSubject) continue;
    //Even less strict check
    if (providedSubject.split(" ").length === 1) {
      for (let i = 0; i < allSubjects.length; i++) {
        const obj = allSubjects[i];
        const shortName = obj.shortName.toLowerCase();

        if (shortName !== "") {
          if (providedSubject.includes(shortName)) {
            hasFoundSubject = true;
            resultSubjects.push(obj.fullName);
            break;
          }
        }
      }
    }
  }

  return resultSubjects;
}
