import "server-only";
import { getAssignment } from "@/api-functions/scrapeFunctions/getAssignment";
import { processResult } from "./processResult";
import { validateResult } from "./validateResult";

type MainType = Prettify<FullAssignment>;
type FunctionProps = APIProps<StandardProps & { assignmentId: string }>;

export const getAssignmentByHref = async (props: FunctionProps) => {
  const result = await getAssignment({
    assignmentId: props.assignmentId,
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
