export function getNumericLessonTimes(lesson: Lesson) {
  const time = lesson.time;
  const startTime =
    time.startDate.getHours() + time.startDate.getMinutes() / 60;

  const endTime = time.endDate.getHours() + time.endDate.getMinutes() / 60;

  return { startTime: startTime, endTime: endTime };
}
