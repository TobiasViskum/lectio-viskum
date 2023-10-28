import "server-only";
import { getAllSchools as _getAllSchools } from "@/api-functions/scrapeFunctions";
import { processResult } from "./processResult";

type MainType = Prettify<School[]>;

export const getAllSchools = async () => {
  const result = await _getAllSchools();
  const processedResult = processResult<MainType>(result);

  const data =
    processedResult.status === "success" ? processedResult.data : null;

  return data;
};
