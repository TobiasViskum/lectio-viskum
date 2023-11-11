import "server-only";
import { getAssignment } from "@/api-functions/scrapeFunctions/getAssignment";
import { processResult } from "./processResult";
import { validateResult } from "./validateResult";

type MainType = Prettify<FullAssignment>;
type FunctionProps = { assignmentId: string };

export async function getAssignmentByHref({ assignmentId }: FunctionProps) {
  const result = await getAssignment({
    assignmentId: assignmentId,
  });
  const processedResult = processResult<MainType>(result);
  validateResult(processedResult);

  const data =
    processedResult.status === "success" ? processedResult.data : null;

  return data;
}
