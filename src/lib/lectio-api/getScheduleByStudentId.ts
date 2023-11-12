import "server-only";
import { getSchedule } from "@/api-functions/scrapeFunctions";
import { processResult } from "./processResult";
import { validateResult } from "./validateResult";

type MainType = Prettify<Week[]>;
type FunctionProps = { week: string; year: string; userId: string };

export async function getScheduleByStudentId({
  userId,
  week,
  year,
}: FunctionProps) {
  const result = await getSchedule({
    week: week,
    year: year,
    studentId: userId,
  });
  const processedResult = processResult<MainType>(result);
  validateResult(processedResult);

  const data =
    processedResult.status === "success" ? processedResult.data : null;

  return data;
}
