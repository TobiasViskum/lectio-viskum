import { getIsAuthenticated as _getIsAuthenticated } from "@/library/scrapeFunctions/getIsAuthenticated";
import { processResult } from "./processResult";
import { validateResult } from "./validateResult";

type MainType = LectioAuth;
type FunctionProps = APIProps<AuthProps>;

export async function getIsAuthenticated(props: FunctionProps) {
  const result = await _getIsAuthenticated(props);
  const processedResult = processResult<MainType>(result);

  const data =
    processedResult.status === "success" ? processedResult.data : null;
  return data;
}
