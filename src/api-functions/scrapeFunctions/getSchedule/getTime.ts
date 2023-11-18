import { pattern2, pattern3 } from "./timePatterns";

export function getTime(info: string): LessonTime {
  const splitInfo = info.split("\n");

  let time = "";
  let patternUsed = 0;

  for (let i = 0; i < splitInfo.length; i++) {
    const infoText = splitInfo[i];

    const foundMatch2 = infoText.match(pattern2);
    const foundMatch3 = infoText.match(pattern3);

    if (foundMatch2) {
      time = foundMatch2[1];
      patternUsed = 2;
      break;
    } else if (foundMatch3) {
      time = foundMatch3[1];
      patternUsed = 3;
      break;
    }
  }

  if (time === "") {
    return { startDate: new Date(1970), endDate: new Date(1970) };
  }

  if (patternUsed === 2) {
    const splitTime = time.split(" ");
    const startDateArr = splitTime[0].split(/(\/|-)/);
    const startDay = Number(startDateArr[0]);
    const startMonth = Number(startDateArr[2]);
    const startYear = Number(startDateArr[4]);

    const startTimeArr = splitTime[1].split(":");
    const startHours = Number(startTimeArr[0]);
    const startMinutes = Number(startTimeArr[1]);

    const endTimeArr = splitTime[3].split(":");
    const endHours = Number(endTimeArr[0]);
    const endMinutes = Number(endTimeArr[1]);

    const isDateValid =
      !isNaN(startDay) &&
      !isNaN(startMonth) &&
      !isNaN(startYear) &&
      !isNaN(startHours) &&
      !isNaN(startMinutes) &&
      !isNaN(endHours) &&
      !isNaN(endMinutes);

    if (isDateValid) {
      const startDate = new Date(
        startYear,
        startMonth - 1,
        startDay,
        startHours,
        startMinutes,
      );
      const endDate = new Date(
        startYear,
        startMonth - 1,
        startDay,
        endHours,
        endMinutes,
      );
      return { startDate: startDate, endDate: endDate };
    }
  } else if (patternUsed === 3) {
    const splitTime = time.split(" ");

    const startDateArr = splitTime[0].split(/(\/|-)/);
    const startDay = Number(startDateArr[0]);
    const startMonth = Number(startDateArr[2]);
    const startYear = Number(startDateArr[4]);

    const startTimeArr = splitTime[1].split(":");
    const startHours = Number(startTimeArr[0]);
    const startMinutes = Number(startTimeArr[1]);

    const endDateArr = splitTime[3].split(/(\/|-)/);
    const endDay = Number(endDateArr[0]);
    const endMonth = Number(endDateArr[2]);
    const endYear = Number(endDateArr[4]);

    const endTimeArr = splitTime[4].split(":");
    const endHours = Number(endTimeArr[0]);
    const endMinutes = Number(endTimeArr[1]);

    const isStartDateValid =
      !isNaN(startDay) &&
      !isNaN(startMonth) &&
      !isNaN(startYear) &&
      !isNaN(startHours) &&
      !isNaN(startMinutes);

    const isEndDateValid =
      !isNaN(endDay) &&
      !isNaN(endMonth) &&
      !isNaN(endYear) &&
      !isNaN(endHours) &&
      !isNaN(endMinutes);

    if (isStartDateValid && isEndDateValid) {
      const startDate = new Date(
        startYear,
        startMonth - 1,
        startDay,
        startHours,
        startMinutes,
      );
      const endDate = new Date(
        endYear,
        endMonth - 1,
        endDay,
        endHours,
        endMinutes,
      );
      return { startDate: startDate, endDate: endDate };
    }
  }

  return { startDate: new Date(1970), endDate: new Date(1970) };
}
