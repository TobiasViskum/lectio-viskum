import "server-only";
import { processResult } from "./processResult";
import { validateResult } from "./validateResult";
import { getMessage } from "@/api-functions/scrapeFunctions/getMessage";

type MainType = Prettify<FullMessage>;

export async function getMessageById(messageId: string) {
  const result = await getMessage(messageId);
  const processedResult = processResult<MainType>(result);

  validateResult(processedResult);

  const data =
    processedResult.status === "success" ? processedResult.data : null;

  return data;
}
