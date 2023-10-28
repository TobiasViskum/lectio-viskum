import "server-only";
import { getSchedule } from "@/api-functions/scrapeFunctions";
import { processResult } from "./processResult";
import { validateResult } from "./validateResult";

import { getTimeInMs } from "@/util/getTimeInMs";

type MainType = Prettify<Week[]>;
type FunctionProps = Prettify<
  APIProps<StandardProps & { week: string; year: string }>
>;

export const getScheduleByCredentials = async (props: FunctionProps) => {
  const userId = props.userId;
  const tag = `${userId}-schedule-${props.week + props.year}`;
  const foundCache = global.cache.get(tag);

  // if (foundCache && new Date().getTime() < foundCache.expires) {
  //   return foundCache.data as MainType;
  // }

  const result = await getSchedule({
    week: props.week,
    year: props.year,
    schoolCode: props.schoolCode,
    lectioCookies: props.lectioCookies,
  });
  const processedResult = processResult<MainType>(result);
  validateResult(processedResult);

  const data =
    processedResult.status === "success" ? processedResult.data : null;

  if (data) {
    global.cache.set(tag, {
      data: data,
      expires: new Date().getTime() + getTimeInMs({ seconds: 30 }),
    });
  }

  return data;
};
