import { getAllSchools as _getAllSchools } from "@/library/scrapeFunctions";
import { processResult } from "./processResult";
import { validateResult } from "./validateResult";

type MainType = Prettify<School[]>;

export async function getAllSchools() {
  const result = await _getAllSchools();
  const processedResult = processResult<MainType>(result);

  const data =
    processedResult.status === "success" ? processedResult.data : null;

  return data;
}
