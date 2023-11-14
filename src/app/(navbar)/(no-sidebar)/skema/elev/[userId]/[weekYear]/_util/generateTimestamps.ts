export function generateTimestamps(weeks: Week[]) {
  let globalStartTime = 24;
  let globalEndTime = 0;

  for (let i = 0; i < weeks.length; i++) {
    const week = weeks[i];
    for (let j = 0; j < week.lessons.length; j++) {
      const lesson = week.lessons[j];
      const time = lesson.time;

      const startTime =
        new Date(time.startDate).getHours() +
        new Date(time.startDate).getMinutes() / 60;

      if (startTime < globalStartTime) {
        globalStartTime = startTime;
      }

      const endTime =
        new Date(time.endDate).getHours() +
        new Date(time.endDate).getMinutes() / 60;
      if (endTime > globalEndTime) {
        globalEndTime = endTime;
      }
    }
  }

  globalStartTime = Math.floor(globalStartTime - 0.001);
  globalEndTime = Math.ceil(globalEndTime + 0.001);

  let timeStamps = [];
  for (let i = globalStartTime; i <= globalEndTime; i++) {
    timeStamps.push(Math.floor(i));
  }

  if (timeStamps.length === 0) {
    return [7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
  }

  return timeStamps;
}
