import { getIsAuthenticated as _getIsAuthenticated } from "@/library/scrapeFunctions/getIsAuthenticated";
import { processResult } from "./processResult";

type MainType = LectioAuth;
type FunctionProps = APIProps<AuthProps>;

export const getIsAuthenticated = async (props: FunctionProps) => {
  const result = await _getIsAuthenticated(props);
  const processedResult = processResult<MainType>(result);

  const data =
    processedResult.status === "success" ? processedResult.data : null;
  return data;
};
