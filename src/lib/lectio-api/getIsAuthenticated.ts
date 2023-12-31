import "server-only";
import { getIsAuthenticated as _getIsAuthenticated } from "@/api-functions/scrapeFunctions/getIsAuthenticated";
import { processResult } from "./processResult";

type MainType = LectioAuth;
type FunctionProps = AuthProps;

export const getIsAuthenticated = async (props: FunctionProps) => {
  const result = await _getIsAuthenticated(props);
  const processedResult = processResult<MainType>(result);

  const data =
    processedResult.status === "success" ? processedResult.data : null;
  return data;
};
