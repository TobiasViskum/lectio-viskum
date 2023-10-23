import {
  failedToGetData,
  invalidParameters,
  schoolSuccessNoData,
  schoolSuccessRequest,
} from "@/library/api-return";
import { getSearchParamsObject } from "@/library/getSearchParamsObject";
import { getSchoolBySchoolCode } from "@/library/scrapeFunctions/getSchoolBySchoolCode";
import { NextRequest } from "next/server";
import z from "zod";

const routeSchema = z.object({
  schoolCode: z.string(),
});

export async function GET(request: NextRequest) {
  const params = getSearchParamsObject(request);

  try {
    const data = routeSchema.parse(params);
    const result = await getSchoolBySchoolCode(data);
    if (result === "No data") {
      return schoolSuccessNoData();
    } else if (result === null) {
      return failedToGetData();
    } else {
      return schoolSuccessRequest(result);
    }
  } catch {
    return invalidParameters();
  }
}
