import {
  failedToGetData,
  invalidParameters,
  successNoData,
  errorNotAuthenticated,
  errorSchoolInvalid,
  successRequest,
  errorForbiddenAccess,
} from "@/library/api-return";
import { getSearchParamsObject } from "@/library/getSearchParamsObject";
import {
  getClassInformation,
  getTeacherByInitials,
} from "@/library/scrapeFunctions";
import { standardSchema } from "@/library/standard-schema";
import { NextRequest } from "next/server";
import z from "zod";

const routeSchema = z
  .object({
    href: z.string(),
  })
  .merge(standardSchema);

export async function GET(request: NextRequest) {
  const params = getSearchParamsObject(request);

  try {
    const data = routeSchema.parse(params);
    const result = await getClassInformation(data);
    if (result === "Not authenticated") {
      return errorNotAuthenticated();
    } else if (result === "Forbidden access") {
      return errorForbiddenAccess();
    } else if (result === "Invalid school") {
      return errorSchoolInvalid();
    } else if (result === null) {
      return failedToGetData();
    } else {
      return successRequest(result, data.lectioCookies);
    }
  } catch {
    return invalidParameters();
  }
}
