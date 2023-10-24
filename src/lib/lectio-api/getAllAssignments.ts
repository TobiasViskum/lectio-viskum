import { processResult } from "./processResult";
import { getAssignments } from "@/library/scrapeFunctions";
import { validateResult } from "./validateResult";
import { cache } from "react";

type MainType = Prettify<Assignment[]>;
type FunctionProps = APIProps<StandardProps>;

export const getAllAssignments = async (props: FunctionProps) => {
  const result = await getAssignments({
    lectioCookies: props.lectioCookies,
    schoolCode: props.schoolCode,
  });
  const processedResult = processResult<MainType>(result);

  validateResult(processedResult);

  const data =
    processedResult.status === "success" ? processedResult.data : null;

  return data;
};
