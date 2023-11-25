import "server-only";
import { processResult } from "./processResult";
import { validateResult } from "./validateResult";
import { getMessages } from "@/api-functions/scrapeFunctions/getMessages";

type MainType = Prettify<Message[]>;

export async function getFavoriteMessages() {
  const result = await getMessages({ type: "favorites" });
  const processedResult = processResult<MainType>(result);

  validateResult(processedResult);

  const data =
    processedResult.status === "success" ? processedResult.data : null;

  return data;
}
