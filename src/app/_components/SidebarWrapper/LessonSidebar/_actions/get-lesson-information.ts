"use server";

import { lectioAPI } from "@/lib/lectio-api";

export async function getLessonInformation(
  lessonId: string,
  userId: string,
  year: string,
) {
  const lesson = await lectioAPI.getLessonById({
    lessonId: lessonId,
    userId: userId,
    year: year,
  });

  return lesson;
}
