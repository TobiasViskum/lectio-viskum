import { getAuthenticatedPage } from "../../getPage";
import { getClassroom } from "../getSchedule/getClassroom";
import { getHomeworkAndOtherAndPresentation } from "./utils";
import { getTitle } from "../getSchedule/getTitle";
import { setClasses } from "./setClasses";
import { getSubjectTheme } from "./getSubjectTheme";
import { getNote } from "./getNote";
import { getTimeInMs } from "@/util/getTimeInMs";
import { getTeachers } from "../getSchedule/getTeachers";
import { getClassInformation } from "../getClassInformation";
import { getTeacherById } from "..";
import { getTeacherByInitials } from "../getTeacherByInitials";
import { getTime } from "../getSchedule/getTime";

type Props = { lessonId: string; userId: string };

export async function getLessonInformation({ lessonId, userId }: Props) {
  const href = `aktivitet/aktivitetforside2.aspx?absid=${lessonId}&elevid=${userId}`;

  const tag = `${userId}-lesson-${lessonId}`;
  const foundCache = global.shortTermCache.get(tag);

  if (foundCache && new Date().getTime() < foundCache.expires) {
    // return foundCache.data;
  }

  const res = await getAuthenticatedPage({
    specificPage: href,
  });

  if (res === "Not authenticated") return res;
  if (res === "Forbidden access") return res;
  if (res === "Invalid school") return res;
  if (res === null) return res;

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
    additionalInfo.time = getTime(info);

    for (let i = 0; i < additionalInfo.teachers.length; i++) {
      const initials = additionalInfo.teachers[i].initials;
      const foundTeacher = await getTeacherByInitials({ initials: initials });
      if (foundTeacher && typeof foundTeacher !== "string") {
        additionalInfo.teachers[i] = foundTeacher;
      }
    }
  }

  const $div = $("div.s2skemabrikcontent.OnlyDesktop");
  const $possibleTeachers = $div.find('span[data-lectiocontextcard*="T"]');

  for (let i = 0; i < $possibleTeachers.length; i++) {
    const span = $possibleTeachers[i];
    const $span = $(span);
    const teacherId = ($span.attr("data-lectiocontextcard") || "").replace(
      "T",
      "",
    );
    const foundTeacher = await getTeacherById({ teacherId: teacherId });
    if (foundTeacher && typeof foundTeacher !== "string") {
      const existingIndex = additionalInfo.teachers.findIndex((t) => {
        return (
          t.initials.toLocaleLowerCase() ===
          foundTeacher.initials.toLocaleLowerCase()
        );
      });
      if (existingIndex !== -1) {
        additionalInfo.teachers[existingIndex] = foundTeacher;
      } else {
        additionalInfo.teachers.push(foundTeacher);
      }
    }
  }

  const text = $div.text();
  const lessonNumberMatch = text.match(/(.* modul)/);
  if (lessonNumberMatch) {
    const splitStr = lessonNumberMatch[1].split(" ");
    additionalInfo.lessonNumber = Number(splitStr[2].replace(/[^0-9]+/g, ""));
  }

  const $classLink = $("a#s_m_Content_Content_holdActLink");
  const classHref = $classLink.attr("href");

  if ($classLink.length === 1 && classHref) {
    const classMatch = classHref.match(/holdelementid=([0-9]+)/);

    if (classMatch) {
      const res = await getClassInformation(classMatch[1]);

      if (res) {
        for (let i = 0; i < res.teachers.length; i++) {
          const teacher = res.teachers[i];
          if (
            additionalInfo.teachers.find(
              (t) => t.teacherId === teacher.teacherId,
            ) === undefined
          ) {
            additionalInfo.teachers.push(teacher);
          }
        }
        for (let i = 0; i < res.students.length; i++) {
          const students = res.students[i];
          if (
            additionalInfo.students.find(
              (t) => t.studentId === students.studentId,
            ) === undefined
          ) {
            additionalInfo.students.push(students);
          }
        }
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
  const homeWorkAndOtherAndPresentation =
    await getHomeworkAndOtherAndPresentation($);

  const resultObj: FullLesson = {
    id: lessonId,
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
