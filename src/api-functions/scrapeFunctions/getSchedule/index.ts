import { getLectioProps } from "@/lib/auth/getLectioProps";
import { getAuthenticatedPage } from "../../getPage";
import { getClass } from "./getClass";
import { getClassroom } from "./getClassroom";
import { getSubject } from "./getSubject";
import { getTeachers } from "./getTeachers";
import { getTime } from "./getTime";
import { getTitle } from "./getTitle";
import { getRedisClient } from "@/lib/get-redis-client";
import { getScheduleTag } from "@/lib/lectio-api/getTags";
import { getTimeInMs } from "@/util/getTimeInMs";

type Props = {
  week: string;
  year: string;
  teacherId?: string;
  studentId?: string;
};

export async function getSchedule(
  { week, year, teacherId, studentId }: Props,
  prioritizeCache?: boolean,
) {
  const personalUserId = getLectioProps().userId;
  const userId = studentId || teacherId || personalUserId;
  const client = await getRedisClient();
  const tag = getScheduleTag(userId, week, year);
  if (client) {
    const foundCache = (await client.json.get(tag)) as RedisCache<Week[]>;
    if (foundCache && prioritizeCache) {
      await client.quit();
      return foundCache.data;
    }
    if (foundCache && new Date().getTime() < foundCache.expires) {
      await client.quit();
      return foundCache.data;
    }
  }

  let targetPage = `SkemaNy.aspx?week=${week + year}&elevid=${userId}`;

  let numberWeek = !isNaN(Number(week)) ? Number(week) : -1;
  let numberYear = !isNaN(Number(year)) ? Number(year) : -1;

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

  const weekSchedule: Week[] = $(
    ".s2skemabrikcontainer.lec-context-menu-instance",
  )
    .map((_index, _elem) => {
      const $_elem = $(_elem);

      const lessons: Lesson[] = $_elem
        .find("a[data-additionalinfo]")
        .map((index, elem) => {
          const $elem = $(elem);
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
            overlappingLessons: 0,
            hasPossibleTest: false,
          };

          if (info) {
            lesson.id = id;
            lesson.status = status;
            lesson.time = getTime(info, {
              week: numberWeek,
              year: numberYear,
              day: index,
            });
            lesson.teachers = getTeachers(info);
            lesson.classrooms = getClassroom(info);
            lesson.classes = getClass(info);
            lesson.subjects = getSubject(info);
            lesson.title = getTitle(info);
            lesson.hasNote = info.includes("Note:");
            lesson.hasHomework = info.includes("Lektier:");
            lesson.hasOtherContent = info.includes("Øvrigt indhold:");
            lesson.hasPresentation = info.includes(
              "Aktiviteten har en præsentation.",
            );
            lesson.hasPossibleTest =
              info.toLowerCase().includes("prøve ") ||
              info.toLowerCase().includes(" prøve");
          }

          if (
            lesson.subjects.length === 1 &&
            lesson.classes.length === 1 &&
            lesson.subjects[0] === lesson.classes[0]
          ) {
            lesson.classes = [""];
          }

          return lesson;
        })
        .get();

      lessons.forEach((lesson1, index1) => {
        lessons.forEach((lesson2, index2) => {
          const startDate1 = lesson1.time.startDate;
          const endDate1 = lesson1.time.endDate;
          const startTime1 =
            startDate1.getHours() + startDate1.getMinutes() / 60;
          const endTime1 = endDate1.getHours() + endDate1.getMinutes() / 60;

          const startDate2 = lesson2.time.startDate;
          const startTime2 =
            startDate2.getHours() + startDate2.getMinutes() / 60;

          if (index1 !== index2) {
            if (startTime1 === startTime2) {
              lessons[index2].overlappingLessons += 1;
            } else if (startTime2 > startTime1 && startTime2 < endTime1) {
              lessons[index2].overlappingLessons += 1;
            }
          }
        });
      });

      lessons.sort(
        (a, b) =>
          b.time.startDate.getTime() - a.time.startDate.getTime() ||
          b.time.endDate.getTime() - a.time.endDate.getTime(),
      );

      if (_index <= 4) {
        return { lessons: lessons, notes: [""] };
      }
    })
    .get();

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
