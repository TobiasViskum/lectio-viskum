import "server-only";
import { processResult } from "./processResult";
import { getStudentById as _getStudentById } from "@/api-functions/scrapeFunctions/getStudentById";
import { validateResult } from "./validateResult";

type MainType = Student;
type FunctionProps = { userId: string };

export const getStudentById = async ({ userId }: FunctionProps) => {
  const result = await _getStudentById({
    userId: userId,
  });
  const processedResult = processResult<MainType>(result);
  validateResult(processedResult);

  const data =
    processedResult.status === "success" ? processedResult.data : null;

  return data;
};
