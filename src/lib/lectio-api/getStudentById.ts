import "server-only";
import { processResult } from "./processResult";
import { getStudentById as _getStudentById } from "@/api-functions/scrapeFunctions/getStudentById";
import { validateResult } from "./validateResult";

type MainType = Student;
type FunctionProps = APIProps<StandardProps>;

export const getStudentById = async (props: FunctionProps) => {
  const result = await _getStudentById({
    schoolCode: props.schoolCode,
    lectioCookies: props.lectioCookies,
    userId: props.userId,
  });
  const processedResult = processResult<MainType>(result);
  validateResult(processedResult);

  const data =
    processedResult.status === "success" ? processedResult.data : null;

  return data;
};
