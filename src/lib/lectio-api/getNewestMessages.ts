import "server-only";
import { processResult } from "./processResult";
import { validateResult } from "./validateResult";
import { getMessages } from "@/api-functions/scrapeFunctions/getMessages";

type MainType = Prettify<Message[]>;

export async function getNewestMessages() {
  const result = await getMessages({ type: "newest" });
  const processedResult = processResult<MainType>(result);

  validateResult(processedResult);

  const data =
    processedResult.status === "success" ? processedResult.data : null;

  return data;
}
