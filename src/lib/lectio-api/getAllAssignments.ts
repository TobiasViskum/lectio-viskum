import "server-only";
import { processResult } from "./processResult";
import { getAssignments } from "@/api-functions/scrapeFunctions";
import { validateResult } from "./validateResult";

type MainType = Prettify<Assignment[]>;
type FunctionProps = APIProps<StandardProps>;

export const getAllAssignments = async (props: FunctionProps) => {
  const result = await getAssignments({
    lectioCookies: props.lectioCookies,
    schoolCode: props.schoolCode,
    userId: props.userId,
  });
  const processedResult = processResult<MainType>(result);

  validateResult(processedResult);

  const data =
    processedResult.status === "success" ? processedResult.data : null;

  return data;
};
