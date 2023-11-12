import { getAuthenticatedPage } from "../../getPage";
import { getClassroom } from "../getSchedule/getClassroom";
import { getHomeworkAndOtherAndPresentation } from "./utils";
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
import { standardFetchOptions } from "@/api-functions/standardFetchOptions";
import { getTeachers } from "../getSchedule/getTeachers";
import { getClassInformation } from "../getClassInformation";
import { getLastAuthenticatedCookie } from "@/api-functions/getLastAuthenticatedCookie";

type Props = { lessonId: string; year: string; userId: string };

export async function getLessonInformation({ lessonId, userId, year }: Props) {
  const href = `aktivitet/aktivitetforside2.aspx?absid=${lessonId}&elevid=${userId}`;
  const numberYear = !isNaN(Number(year)) ? Number(year) : 1970;

  const tag = `${userId}-lesson-${lessonId}`;
  const foundCache = global.shortTermCache.get(tag);

  if (foundCache && new Date().getTime() < foundCache.expires) {
    return foundCache.data;
  }

  const res = await getAuthenticatedPage({
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
    students: [],
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
    additionalInfo.teachers = getTeachers(info);
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

  const $classLink = $("a#s_m_Content_Content_holdActLink");
  const classHref = $classLink.attr("href");

  if ($classLink.length === 1 && classHref) {
    const classMatch = classHref.match(/holdelementid=([0-9]+)/);

    if (classMatch) {
      const res = await getClassInformation(classMatch[1]);

      if (res) {
        additionalInfo.teachers = res.teachers;
        additionalInfo.students = res.students;
      }
    }
  }

  setClasses($div, $, additionalInfo);

  let subjects: string[] = [];
  for (let i = 0; i < additionalInfo.classes.length; i++) {
    const subject = additionalInfo.classes[i].subject;

    if (subjects.find((str) => str === subject) === undefined) {
      if (subject !== "") {
        subjects.push(subject);
      }
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
            headers: { Cookie: getLastAuthenticatedCookie() },
            ...standardFetchOptions,
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

  const resultObj = {
    ...additionalInfo,
    subjectTheme: subjectTheme,
    note: note,
    homework: homeWorkAndOtherAndPresentation.homework,
    other: homeWorkAndOtherAndPresentation.other,
    presentation: homeWorkAndOtherAndPresentation.presentation,
  };

  global.shortTermCache.set(tag, {
    data: resultObj,
    expires: new Date().getTime() + getTimeInMs({ minutes: 1 }),
  });

  return resultObj;
}
