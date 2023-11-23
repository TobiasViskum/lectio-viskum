export function getNumericLessonTimes(lesson: Lesson) {
  const time = lesson.time;
  const startTime =
    new Date(time.startDate).getHours() +
    new Date(time.startDate).getMinutes() / 60;

  const endTime =
    new Date(time.endDate).getHours() +
    new Date(time.endDate).getMinutes() / 60;

  return { startTime: startTime, endTime: endTime };
}
