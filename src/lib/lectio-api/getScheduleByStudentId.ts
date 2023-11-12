import "server-only";
import { getSchedule } from "@/api-functions/scrapeFunctions";
import { processResult } from "./processResult";
import { validateResult } from "./validateResult";

import { getTimeInMs } from "@/util/getTimeInMs";

type MainType = Prettify<Week[]>;
type FunctionProps = { week: string; year: string; userId: string };

export const getScheduleByStudentId = async (props: FunctionProps) => {
  const userId = props.userId;
  const tag = `${userId}-schedule-${props.week + props.year}`;
  const foundCache = global.shortTermCache.get(tag);

  if (foundCache && new Date().getTime() < foundCache.expires) {
    return foundCache.data as MainType;
  }

  const result = await getSchedule({
    week: props.week,
    year: props.year,
    studentId: userId,
  });
  const processedResult = processResult<MainType>(result);
  validateResult(processedResult);

  const data =
    processedResult.status === "success" ? processedResult.data : null;

  if (data) {
    global.shortTermCache.set(tag, {
      data: data,
      expires: new Date().getTime() + getTimeInMs({ seconds: 30 }),
    });
  }

  return data;
};
