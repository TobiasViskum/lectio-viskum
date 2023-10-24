import { getAssignment } from "@/library/scrapeFunctions/getAssignment";
import { processResult } from "./processResult";
import { validateResult } from "./validateResult";
import { cache } from "react";

type MainType = Prettify<FullAssignment>;
type FunctionProps = APIProps<StandardProps & { href: string }>;

export const getAssignmentByHref = async (props: FunctionProps) => {
  const result = await getAssignment({
    href: props.href,
    lectioCookies: props.lectioCookies,
    schoolCode: props.schoolCode,
  });
  const processedResult = processResult<MainType>(result);
  validateResult(processedResult);

  const data =
    processedResult.status === "success" ? processedResult.data : null;

  return data;
};
