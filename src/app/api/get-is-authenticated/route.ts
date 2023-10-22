import {
  errorSchoolInvalid,
  failedToGetData,
  invalidParameters,
  successRequest,
} from "@/library/api-return";
import { getSearchParamsObject } from "@/library/getSearchParamsObject";
import { getIsAuthenticated } from "@/library/scrapeFunctions/getIsAuthenticated";
import { authSchema } from "@/library/standard-schema";
import { NextRequest } from "next/server";

const routeSchema = authSchema;

export async function GET(request: NextRequest) {
  const params = getSearchParamsObject(request);

  try {
    const data = routeSchema.parse(params);
    const lectioCookies = await getIsAuthenticated(data);

    if (lectioCookies === null) {
      return failedToGetData();
    } else if (lectioCookies === "Invalid school") {
      return errorSchoolInvalid();
    } else if (lectioCookies === "Not authenticated") {
      return successRequest({ isAuthenticated: false, lectioCookies: "" }, "");
    } else {
      return successRequest(
        { isAuthenticated: true, lectioCookies: lectioCookies },
        lectioCookies,
      );
    }
  } catch {
    return invalidParameters();
  }
}
