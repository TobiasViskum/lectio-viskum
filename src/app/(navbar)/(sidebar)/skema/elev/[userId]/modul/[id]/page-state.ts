import { lectioAPI } from "@/lib/lectio-api";

let lesson: Promise<FullLesson | null> = new Promise((resolve) =>
  resolve(null),
);
let cachedLesson: Promise<FullLesson | null> = new Promise((resolve) =>
  resolve(null),
);

export function getPageState() {
  return {
    cachedLesson: cachedLesson,
    lesson: lesson,
  };
}
export function setPageState(userId: string, lessonId: string) {
  // cachedLesson = null
  lesson = lectioAPI.getLessonById({
    userId: userId,
    lessonId: lessonId,
  });
}
