import { processResult } from "./processResult";
import { getStudentByCredentials as _getStudentByCredentials } from "@/library/scrapeFunctions/getStudentByCredentials";
import { validateResult } from "./validateResult";

type MainType = Student;
type FunctionProps = APIProps<StandardProps>;

export const getStudentByCredentials = async (props: FunctionProps) => {
  const result = await _getStudentByCredentials({
    schoolCode: props.schoolCode,
    lectioCookies: props.lectioCookies,
  });
  const processedResult = processResult<MainType>(result);
  validateResult(processedResult);

  const data =
    processedResult.status === "success" ? processedResult.data : null;

  return data;
};
