import "server-only";
import { processResult } from "./processResult";
import { getStudentByCredentials as _getStudentByCredentials } from "@/api-functions/scrapeFunctions/getStudentByCredentials";
import { validateResult } from "./validateResult";
import { getTimeInMs } from "@/util/getTimeInMs";

type MainType = Student;
type FunctionProps = APIProps<StandardProps>;

export const getStudentByCredentials = async (props: FunctionProps) => {
  const userId = props.userId;
  const tag = `${userId}-user`;
  const foundCache = global.cache.get(tag);

  if (foundCache && new Date().getTime() < foundCache.expires) {
    return foundCache.data as MainType;
  }

  const result = await _getStudentByCredentials({
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
      expires: new Date().getTime() + getTimeInMs({ days: 1 }),
    });
  }

  return data;
};
