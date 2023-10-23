import {
  errorForbiddenAccess,
  errorNotAuthenticated,
  errorSchoolInvalid,
  failedToGetData,
  invalidParameters,
  successRequest,
} from "@/library/api-return";
import { getSearchParamsObject } from "@/library/getSearchParamsObject";
import { getAssignment } from "@/library/scrapeFunctions/getAssignment";
import { standardSchema } from "@/library/standard-schema";
import { NextRequest } from "next/server";
import { z } from "zod";

const routeSchema = standardSchema.merge(z.object({ href: z.string() }));

export async function GET(request: NextRequest) {
  const params = getSearchParamsObject(request);

  try {
    const data = routeSchema.parse(params);
    const result = await getAssignment(data);

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
