import { getSchoolBySchoolCode } from "@/library/scrapeFunctions/getSchoolBySchoolCode";
import { processResult } from "./processResult";
import { validateResult } from "./validateResult";

type MainType = School;
type FunctionProps = APIProps<{ schoolCode: string }>;

export async function getSchool(props: FunctionProps) {
  const result = await getSchoolBySchoolCode({
    schoolCode: props.schoolCode,
  });
  const processedResult = processResult<MainType>(result);

  const data =
    processedResult.status === "success" ? processedResult.data : null;

  return data;
}
