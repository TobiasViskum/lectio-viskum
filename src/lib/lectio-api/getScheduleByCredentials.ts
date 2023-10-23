import { getSchedule } from "@/library/scrapeFunctions";
import { processResult } from "./processResult";
import { validateResult } from "./validateResult";

type MainType = Prettify<Week[]>;
type FunctionProps = Prettify<
  APIProps<StandardProps & { week: string; year: string }>
>;

export async function getScheduleByCredentials(props: FunctionProps) {
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

  return data;
}
