export function getNumericLessonTimes(lesson: Lesson) {
  const splitStartTime = lesson.time.startTime.split(":");
  const startTime = Number(splitStartTime[0]) + Number(splitStartTime[1]) / 60;

  const splitEndTime = lesson.time.endTime.split(":");
  const endTime = Number(splitEndTime[0]) + Number(splitEndTime[1]) / 60;

  return { startTime: startTime, endTime: endTime };
}
