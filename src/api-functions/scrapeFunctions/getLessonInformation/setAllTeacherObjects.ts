import { getLectioProps } from "@/lib/auth/getLectioProps";
import { getTeacherById } from "..";

export async function setAllTeachersObject(
  $div: cheerio.Cheerio,
  $: cheerio.Root,
  additionalInfo: AdditionalLessonInfo,
) {
  const lectioProps = getLectioProps();

  let promises: Promise<Teacher | null>[] = [];

  $div.find('span[data-lectiocontextcard*="T"]').each((index, span) => {
    const $span = $(span);

    let teacherId = $span.attr("data-lectiocontextcard");
    if (teacherId) {
      teacherId = teacherId.replace("T", "");

      const promise = getTeacherById({
        teacherId: teacherId,
      }).then((res) => {
        if (typeof res === "object") {
          return res;
        } else {
          return null;
        }
      });
      promises.push(promise);
    }
  });

  let allTeachers = await Promise.all(promises);

  if (allTeachers.find((t) => t === null) === undefined) {
    additionalInfo.teachers = allTeachers as Teacher[];
  }
}
