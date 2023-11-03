import { getAuthenticatedPage } from "../../getPage";
import { getClassroom } from "../getSchedule/getClassroom";
import { getHomeworkAndOtherAndPresentation } from "./utils";
import { setAllTeachersObject } from "./setAllTeacherObjects";
import { getTitle } from "../getSchedule/getTitle";
import { setClasses } from "./setClasses";
import {
  getTimeFromPattern1,
  getTimeFromPattern2,
  getTimeFromPattern3,
} from "./getTime";
import { getSubjectTheme } from "./getSubjectTheme";
import { getNote } from "./getNote";
import { getTimeInMs } from "@/util/getTimeInMs";

type Props = { lessonId: string; year: string };

export async function getClassInformation({
  lectioCookies,
  lessonId,
  schoolCode,
  userId,
  year,
}: StandardProps & Props) {
  const href = `aktivitet/aktivitetforside2.aspx?absid=${lessonId}&elevid=${userId}`;
  const numberYear = !isNaN(Number(year)) ? Number(year) : 1970;

  const res = await getAuthenticatedPage({
    lectioCookies: lectioCookies,
    schoolCode: schoolCode,
    specificPage: href,
  });

  if (res === "Not authenticated") return res;
  if (res === "Forbidden access") return res;
  if (res === "Invalid school") return res;
  if (res === null) return res;

  const fetchCookie = res.fetchCookie;
  const $ = res.$;

  let additionalInfo: AdditionalLessonInfo = {
    title: "",
    status: "normal",
    time: { startDate: new Date(1970), endDate: new Date(1970) },
    lessonNumber: -1,
    teachers: [],
    subjects: [],
    classes: [],
    classrooms: [],
  };

  const $infoDiv = $("a.s2skemabrik.lec-context-menu-instance");
  const info = $infoDiv.attr("data-additionalinfo");
  if (info) {
    additionalInfo.title = getTitle(info);
    additionalInfo.classrooms = getClassroom(info);
    additionalInfo.status = info.includes("Ændret!")
      ? "changed"
      : info.includes("Aflyst!")
      ? "cancelled"
      : "normal";
  }

  const $div = $("div.s2skemabrikcontent.OnlyDesktop");
  const text = $div.text();

  const lessonNumberMatch = text.match(/(.* modul)/);
  if (lessonNumberMatch) {
    const splitStr = lessonNumberMatch[1].split(" ");
    additionalInfo.lessonNumber = Number(splitStr[2].replace(/[^0-9]+/g, ""));
  }

  const datePatterns = [
    /[a-z]{2} [0-9]{1,2}\/[0-9]{1,2} [0-9]{2}:[0-9]{2} (-|til) [a-z]{2} [0-9]{1,2}\/[0-9]{1,2} [0-9]{2}:[0-9]{2}/i,
    /[a-z]{2} [0-9]{1,2}\/[0-9]{1,2} [0-9]{2}:[0-9]{2} (-|til) [0-9]{2}:[0-9]{2}/i,
    /[a-z]{2} [0-9]{1,2}\/[0-9]{1,2}/i,
  ];
  for (let i = 0; i < datePatterns.length; i++) {
    const pattern = datePatterns[i];
    const textMatch = text.match(pattern);
    if (textMatch && info) {
      if (i === 0) {
        additionalInfo.time = getTimeFromPattern1(textMatch[0], numberYear);
      } else if (i === 1) {
        additionalInfo.time = getTimeFromPattern2(textMatch[0], numberYear);
      } else if (i === 2) {
        const startEndTimeMatch = info.match(
          /[0-9]{2}:[0-9]{2} (-|til) [0-9]{2}:[0-9]{2}/i,
        );
        if (startEndTimeMatch) {
          additionalInfo.time = getTimeFromPattern3(
            textMatch[0],
            startEndTimeMatch[0],
            numberYear,
          );
        }
      }
      break;
    }
  }

  await setAllTeachersObject($div, $, additionalInfo);
  setClasses($div, $, additionalInfo);

  let subjects: string[] = [];
  for (let i = 0; i < additionalInfo.classes.length; i++) {
    const subject = additionalInfo.classes[i].subject;

    if (subjects.find((str) => str === subject) === undefined) {
      subjects.push(subject);
    }
  }
  additionalInfo.subjects = subjects;

  const subjectTheme = getSubjectTheme($);

  const note = getNote($);
  const homeWorkAndOtherAndPresentation = getHomeworkAndOtherAndPresentation($);

  for (let i = 0; i < homeWorkAndOtherAndPresentation.homework.length; i++) {
    const homework = homeWorkAndOtherAndPresentation.homework[i];

    for (let j = 0; j < homework.length; j++) {
      const item = homework[j];

      if (typeof item === "object" && "img" in item) {
        if (item.img.includes("/lectio/")) {
          const src = ["https://lectio.dk", item.img].join("");
          const cachedImage = global.longTermCache.get(src);
          if (cachedImage) {
            return cachedImage.data;
          }

          const imageBase64 = await fetchCookie(src, {
            method: "GET",
            headers: { Cookie: lectioCookies },
          })
            .then(async (res) => {
              try {
                const arrayBuffer = await res.arrayBuffer();
                const contentType = res.headers.get("content-type");
                const base64 = Buffer.from(arrayBuffer).toString("base64");
                const fullSrc = `data:${contentType};base64,${base64}`;
                return fullSrc;
              } catch {
                return null;
              }
            })
            .catch((err) => {
              return null;
            });

          if (imageBase64) {
            global.longTermCache.set(src, {
              data: imageBase64,
              expires: new Date().getTime() + getTimeInMs({ days: 1 }),
            });
            item.img = imageBase64;
          }
        }
      }
    }
  }

  return {
    ...additionalInfo,
    subjectTheme: subjectTheme,
    note: note,
    homework: homeWorkAndOtherAndPresentation.homework,
    other: homeWorkAndOtherAndPresentation.other,
    presentation: homeWorkAndOtherAndPresentation.presentation,
  };
}
