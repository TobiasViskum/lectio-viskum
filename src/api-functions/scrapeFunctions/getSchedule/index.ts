import { getLectioProps } from "@/lib/auth/getLectioProps";
import { getAuthenticatedPage } from "../../getPage";
import { getClass } from "./getClass";
import { getClassroom } from "./getClassroom";
import { getTeachers } from "./getTeachers";
import { getTime } from "./getTime";
import { getTitle } from "./getTitle";
import { getRedisClient } from "@/lib/get-redis-client";
import { getScheduleTag } from "@/api-functions/getTags";
import { getTimeInMs } from "@/util/getTimeInMs";
import { getSubjects } from "../getSubjects";
import { getSubjectArray } from "./getSubjectArray";
import { getAllSubjects } from "../getAllSubjects";

type Props = {
  week: string;
  year: string;
  teacherId?: string;
  studentId?: string;
};

export async function getSchedule({ week, year, teacherId, studentId }: Props) {
  const personalUserId = getLectioProps().userId;
  const userId = studentId || teacherId || personalUserId;
  const client = await getRedisClient();
  const tag = getScheduleTag(userId, week, year);
  if (client) {
    const foundCache = (await client.json.get(tag)) as RedisCache<Week[]>;

    if (foundCache && new Date().getTime() < foundCache.expires) {
      // await client.quit();
      // return foundCache.data;
    }
  }

  let targetPage = `SkemaNy.aspx?week=${week + year}&elevid=${userId}`;

  const res = await getAuthenticatedPage({
    specificPage: targetPage,
  });

  if (
    res === null ||
    res === "Not authenticated" ||
    res === "Forbidden access" ||
    res === "Invalid school"
  ) {
    if (client) await client.quit();
    return res;
  }

  const $ = res.$;

  const $trs = $(
    "#s_m_Content_Content_SkemaNyMedNavigation_skema_skematabel > tbody > tr",
  );

  const weekSchedule: Week[] = [
    { lessons: [], notes: [], date: new Date() },
    { lessons: [], notes: [], date: new Date() },
    { lessons: [], notes: [], date: new Date() },
    { lessons: [], notes: [], date: new Date() },
    { lessons: [], notes: [], date: new Date() },
  ];
  const allSubjects = await getAllSubjects();

  for (let i = 0; i < $trs.length; i++) {
    const tr = $trs[i];
    const $tr = $(tr);

    if (i === 1) {
      const $tds = $tr.find("td:not(:first-child)");
      for (let j = 0; j < $tds.length; j++) {
        const td = $tds[j];
        const $td = $(td);

        const dayMonthMatch = $td
          .text()
          .match(/[a-z]+ \(([0-9]{1,2})\/([0-9]{1,2})\)/i);
        if (dayMonthMatch) {
          const day = Number(dayMonthMatch[1]);
          const month = Number(dayMonthMatch[2]);
          const numYear = Number(year);
          if (!isNaN(day) && !isNaN(month) && !isNaN(numYear)) {
            const date = new Date(numYear, month - 1, day);
            weekSchedule[j].date = date;
          }
        }
      }
    } else if (i === 2) {
      const $div = $tr.find("td:not(:first-child) > div");
      for (let j = 0; j < $div.length; j++) {
        const $as = $($div[j]).find("a");
        for (let l = 0; l < $as.length; l++) {
          const $a = $($as[l]);
          const href = $a.attr("href") || "";
          const lessonIdMatch = href.match(/absid=([0-9]+)/);
          const lessonId = lessonIdMatch ? lessonIdMatch[1] : "";

          const $spans = $a.find("div > div > span");
          let textPieces = [];
          for (let p = 0; p < $spans.length; p++) {
            const $span = $($spans[p]);
            textPieces.push($span.text());
          }
          const text = textPieces.join(" ").trim();
          if (text !== "") {
            weekSchedule[j].notes.push({
              text: text,
              lessonId: lessonId,
            });
          }
        }
      }
    } else if (i === 3) {
      const $containers = $tr.find("td:not(:first-child) > div:first-child");

      for (let j = 0; j < $containers.length; j++) {
        const container = $containers[j];
        const $container = $(container);
        const $lessons = $container.find("a[data-additionalinfo]");

        const lessons: Lesson[] = [];

        let subjectPromises: Promise<string[]>[] = [];

        for (let l = 0; l < $lessons.length; l++) {
          const elem = $lessons[l];
          const $elem = $(elem);

          const lesson: Lesson = {
            id: "",
            status: "normal",
            time: { startDate: new Date(1970), endDate: new Date(1970) },
            teachers: [],
            classrooms: [""],
            classes: [],
            subjects: [],
            title: "",
            hasNote: false,
            hasHomework: false,
            hasOtherContent: false,
            hasPresentation: false,
            styling: {
              overlappingLessons: 0,
              position: 0,
            },
          };

          const width = Number($elem.css("width").replace(/[a-z]+/gi, ""));
          const left = Number($elem.css("left").replace(/[a-z]+/gi, ""));
          const difference = left - width;

          if (!isNaN(width) && !isNaN(left)) {
            if (width > 13) {
              lesson.styling.overlappingLessons = 0;
            } else if (width > 6) {
              lesson.styling.overlappingLessons = 1;
            } else if (width > 4) {
              lesson.styling.overlappingLessons = 2;
            } else {
              lesson.styling.overlappingLessons = 3;
            }
            if (difference < 0) {
              lesson.styling.position = 0;
            } else if (difference < 1) {
              lesson.styling.position = 1;
            } else if (difference < width + 2) {
              lesson.styling.position = 2;
            } else {
              lesson.styling.position = 3;
            }
          }

          let id = "";
          let href = ["https://lectio.dk", $elem.attr("href")].join("");

          const idRegex = /absid=([0-9]+)/i;
          const idMath = href.match(idRegex);
          const info = $elem.attr("data-additionalinfo");
          let status: LessonStatus = "normal";
          if (idMath && info) {
            status = info.includes("Ændret!")
              ? "changed"
              : info.includes("Aflyst!")
              ? "cancelled"
              : "normal";
            id = idMath[1];
          }

          if (info) {
            lesson.id = id;
            lesson.status = status;
            lesson.time = getTime(info);
            lesson.teachers = getTeachers(info);
            lesson.classrooms = getClassroom(info);
            lesson.classes = getClass(info);
            const res = await getSubjects(getSubjectArray(info), allSubjects);

            lesson.subjects = res;
            lesson.title = getTitle(info);
            lesson.hasNote = info.includes("Note:");
            lesson.hasHomework = info.includes("Lektier:");
            lesson.hasOtherContent = info.includes("Øvrigt indhold:");
            lesson.hasPresentation = info.includes(
              "Aktiviteten har en præsentation.",
            );
          }

          if (
            lesson.subjects.length === 1 &&
            lesson.classes.length === 1 &&
            lesson.subjects[0] === lesson.classes[0]
          ) {
            lesson.classes = [""];
          }

          lessons.push(lesson);
        }
        weekSchedule[j].lessons = lessons;
      }
    }
  }

  if (weekSchedule.length === 0) {
    if (client) await client.quit();
    return "No data";
  }

  let isWeekEmpty = true;
  for (let i = 0; i < weekSchedule.length; i++) {
    const day = weekSchedule[i];
    if (day.lessons.length !== 0) {
      isWeekEmpty = false;
      break;
    }
  }

  if (isWeekEmpty) {
    if (client) await client.quit();
    return "No data";
  }

  if (client) {
    await client.json.set(tag, "$", {
      data: weekSchedule,
      expires: new Date().getTime() + getTimeInMs({ seconds: 30 }),
    });

    await client.quit();
  }

  return weekSchedule;
}
