import {
  failedToGetData,
  invalidParameters,
  errorNotAuthenticated,
  errorSchoolInvalid,
  successRequest,
  errorForbiddenAccess,
} from "@/library/api-return";
import { getStudentByCredentials } from "@/library/scrapeFunctions/getStudentByCredentials";
import { standardSchema } from "@/library/standard-schema";
import { NextRequest } from "next/server";
import { getSearchParamsObject } from "@/library/getSearchParamsObject";

const routeSchema = standardSchema;

export async function GET(req: NextRequest) {
  const params = getSearchParamsObject(req);

  try {
    const data = routeSchema.parse(params);

    const result = await getStudentByCredentials(data);

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
  } catch (err) {
    return invalidParameters();
  }
}
