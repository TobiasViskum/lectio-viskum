export function getTimeFromPattern1(textMatch: string, numberYear: number) {
  const splitStr = textMatch.split(" ");
  const splitStartDate = splitStr[1].split("/");
  const splitStartTime = splitStr[2].split(":");
  const startDay = Number(splitStartDate[0]);
  const startMonth = Number(splitStartDate[1]);
  const startHours = Number(splitStartTime[0]);
  const startMinutes = Number(splitStartTime[1]);

  const splitEndDate = splitStr[5].split("/");
  const splitEndTime = splitStr[6].split(":");
  const endDay = Number(splitEndDate[0]);
  const endMonth = Number(splitEndDate[1]);
  const endHours = Number(splitEndTime[0]);
  const endMinutes = Number(splitEndTime[1]);

  const isStartDateValid =
    !isNaN(startDay) &&
    !isNaN(startMonth) &&
    !isNaN(startHours) &&
    !isNaN(startMinutes);
  const isEndDateValid =
    !isNaN(endDay) &&
    !isNaN(endMonth) &&
    !isNaN(endHours) &&
    !isNaN(endMinutes);

  if (isStartDateValid && isEndDateValid) {
    const startDate = new Date(
      numberYear,
      startMonth - 1,
      startDay,
      startHours,
      startMinutes,
    );
    const endDate = new Date(
      numberYear,
      endMonth - 1,
      endDay,
      endHours,
      endMinutes,
    );
    return { startDate: startDate, endDate: endDate };
  }
  return { startDate: new Date(1970), endDate: new Date(1970) };
}

export function getTimeFromPattern2(textMatch: string, numberYear: number) {
  const splitStr = textMatch.split(" ");
  const splitDate = splitStr[1].split("/");
  const splitStartTime = splitStr[2].split(":");
  const splitEndTime = splitStr[4].split(":");

  const day = Number(splitDate[0]);
  const month = Number(splitDate[1]);
  const startHours = Number(splitStartTime[0]);
  const startMinutes = Number(splitStartTime[1]);

  const endHours = Number(splitEndTime[0]);
  const endMinutes = Number(splitEndTime[1]);

  const isDateValid =
    !isNaN(day) &&
    !isNaN(month) &&
    !isNaN(startHours) &&
    !isNaN(startMinutes) &&
    !isNaN(endHours) &&
    !isNaN(endMinutes);

  if (isDateValid) {
    const startDate = new Date(
      numberYear,
      month - 1,
      day,
      startHours,
      startMinutes,
    );
    const endDate = new Date(numberYear, month - 1, day, endHours, endMinutes);
    return { startDate: startDate, endDate: endDate };
  }
  return { startDate: new Date(1970), endDate: new Date(1970) };
}

export function getTimeFromPattern3(
  textMatch: string,
  startEndTimeMatch: string,
  numberYear: number,
) {
  const splitStr = textMatch.split(" ");
  const splitTime = startEndTimeMatch.split(" ");
  const splitDate = splitStr[1].split("/");
  const splitStartTime = splitTime[0].split(":");
  const splitEndTime = splitTime[2].split(":");

  const day = Number(splitDate[0]);
  const month = Number(splitDate[1]);
  const startHours = Number(splitStartTime[0]);
  const startMinutes = Number(splitStartTime[1]);

  const endHours = Number(splitEndTime[0]);
  const endMinutes = Number(splitEndTime[1]);

  const isDateValid =
    !isNaN(day) &&
    !isNaN(month) &&
    !isNaN(startHours) &&
    !isNaN(startMinutes) &&
    !isNaN(endHours) &&
    !isNaN(endMinutes);

  if (isDateValid) {
    const startDate = new Date(
      numberYear,
      month - 1,
      day,
      startHours,
      startMinutes,
    );
    const endDate = new Date(numberYear, month - 1, day, endHours, endMinutes);
    return { startDate: startDate, endDate: endDate };
  }
  return { startDate: new Date(1970), endDate: new Date(1970) };
}
