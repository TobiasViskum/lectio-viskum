export function generateTimestamps(weeks: Week[]) {
  let globalStartTime = 24;
  let globalEndTime = 0;

  weeks.forEach((week) => {
    week.lessons.forEach((lesson) => {
      const time = lesson.time;
      const splitStartTime = time.startTime.split(":");
      const startTime =
        Number(splitStartTime[0]) + Number(splitStartTime[1]) / 60;
      if (startTime < globalStartTime) {
        globalStartTime = startTime;
      }

      const splitEndTime = time.endTime.split(":");
      const endTime = Number(splitEndTime[0]) + Number(splitEndTime[1]) / 60;
      if (endTime > globalEndTime) {
        globalEndTime = endTime;
      }
    });
  });

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
