import {
  failedToGetData,
  schoolSuccessNoData,
  schoolSuccessRequest,
} from "@/library/api-return";
import { getAllSchools } from "@/library/scrapeFunctions";

export async function GET() {
  const result = await getAllSchools();
  if (result === "No data") {
    return schoolSuccessNoData();
  } else if (result === null) {
    return failedToGetData();
  } else {
    return schoolSuccessRequest(result);
  }
}
