import { getSchoolBySchoolCode } from "@/api-functions/scrapeFunctions/getSchoolBySchoolCode";
import { processResult } from "./processResult";

type MainType = School;
type FunctionProps = { schoolCode: string };

export const getSchool = async (props: FunctionProps) => {
  const result = await getSchoolBySchoolCode({
    schoolCode: props.schoolCode,
  });
  const processedResult = processResult<MainType>(result);

  const data =
    processedResult.status === "success" ? processedResult.data : null;

  return data;
};
