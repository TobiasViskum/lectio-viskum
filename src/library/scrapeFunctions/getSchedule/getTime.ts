type LessonDate = { week: number; year: number; day: number };

export function getTime(info: string, dateInfo: LessonDate): LessonTime {
  const splitInfo = info.split("\n");

  const pattern1 = /([0-9:]+ [-|til] [0-9:]+)/i;
  const pattern2 = /([0-9\/-]+ [0-9:]+ [-|til] [0-9\/-]+ [0-9:]+)/i;

  let time = "";
  let patternUsed = 0;
  for (let i = 0; i < splitInfo.length; i++) {
    const infoText = splitInfo[i];

    const foundMatch1 = infoText.match(pattern1);
    const foundMatch2 = infoText.match(pattern2);
    if (foundMatch1) {
      time = foundMatch1[1];
      patternUsed = 1;
      break;
    } else if (foundMatch2) {
      time = foundMatch2[1];
      patternUsed = 2;
      break;
    }
  }
  if (time === "") {
    return { startDate: new Date(1970), endDate: new Date(1970) };
  }

  if (patternUsed === 1) {
    let date = new Date(1970);
    const splitTime = time.split(" ");

    const splitStartTime = splitTime[0].split(":");
    let startTimeNumeric = { hours: -1, minutes: -1 };
    if (
      !isNaN(Number(splitStartTime[0])) &&
      !isNaN(Number(splitStartTime[1]))
    ) {
      startTimeNumeric.hours = Number(splitStartTime[0]);
      startTimeNumeric.minutes = Number(splitStartTime[1]);
    }

    const splitEndTime = splitTime[2].split(":");
    let endTimeNumeric = { hours: -1, minutes: -1 };
    if (!isNaN(Number(splitEndTime[0])) && !isNaN(Number(splitEndTime[1]))) {
      endTimeNumeric.hours = Number(splitEndTime[0]);
      endTimeNumeric.minutes = Number(splitEndTime[1]);
    }

    if (
      dateInfo.year !== -1 &&
      dateInfo.year !== -1 &&
      startTimeNumeric.hours !== -1 &&
      startTimeNumeric.minutes !== -1 &&
      endTimeNumeric.hours !== -1 &&
      endTimeNumeric.minutes !== -1
    ) {
      date = new Date(dateInfo.year, 0, 1);
      const daysToAdd = (dateInfo.week - 1) * 7;
      date.setDate(date.getDate() + daysToAdd);
      while (date.getDay() !== dateInfo.day + 1) {
        date.setDate(date.getDate() + 1);
      }

      const startDate = new Date(date);
      startDate.setHours(startTimeNumeric.hours);
      startDate.setMinutes(startTimeNumeric.minutes);

      const endDate = new Date(date);
      endDate.setHours(endTimeNumeric.hours);
      endDate.setMinutes(endTimeNumeric.minutes);

      return { startDate: startDate, endDate: endDate };
    }
  }

  return { startDate: new Date(1970), endDate: new Date(1970) };
}
