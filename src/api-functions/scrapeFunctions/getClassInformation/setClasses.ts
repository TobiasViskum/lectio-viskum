import { getClass } from "./getClass";
import { getSubjectName } from "@/api-functions/util/getSubjectFromClass";

export async function setClasses(
  $div: cheerio.Cheerio,
  $: cheerio.Root,
  additionalInfo: AdditionalLessonInfo,
) {
  let classes: SchoolClass[] = [];

  $div.find('span[data-lectiocontextcard*="HE"]').each((index, span) => {
    const $elem = $(span);
    const text = $elem.text();
    let classId = $elem.attr("data-lectiocontextcard");
    if (classId) {
      classId = classId.replace("HE", "");
      let schoolClass = getClass(text);
      let subject = getSubjectName(text);
      classes.push({
        class: schoolClass,
        classId: classId,
        subject: subject,
        fullClass: getClass(text, true),
      });
    }
  });

  additionalInfo.classes = classes;
}
