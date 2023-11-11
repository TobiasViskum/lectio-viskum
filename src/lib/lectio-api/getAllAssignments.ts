import "server-only";
import { processResult } from "./processResult";
import { getAssignments } from "@/api-functions/scrapeFunctions";
import { validateResult } from "./validateResult";

type MainType = Prettify<Assignment[]>;

export async function getAllAssignments() {
  const result = await getAssignments();
  const processedResult = processResult<MainType>(result);

  validateResult(processedResult);

  const data =
    processedResult.status === "success" ? processedResult.data : null;

  return data;
}
