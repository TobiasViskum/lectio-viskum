import "server-only";
import { getSchool } from "./getSchool";
import { getAllSchools } from "./getAllSchools";
import { getIsAuthenticated } from "./getIsAuthenticated";
import { redirect } from "next/navigation";
import { getStudentByCredentials } from "./getStudentByCredentials";
import { getScheduleByCredentials } from "./getScheduleByCredentials";
import { getAllAssignments } from "./getAllAssignments";
import { getAssignmentByHref } from "./getAssignmentByHref";
import { revalidatePath } from "next/cache";

const testUrl = "https://dev07.reactprojects.mywire.org/api";
const test2Url = "http://localhost:3000/api";
const developmentUrl = "http://localhost:3001/api";
const productionUrl = "https://lectio-api.vercel.app/api";
const production2Url = "https://lectio-viskum.vercel.app/api";
let baseUrl = test2Url;
if (process.env.NODE_ENV === "production") {
  baseUrl = production2Url;
}

export type StandardProps = {
  username: string;
  password: string;
  schoolCode: string;
};

type MakeRequestProps<K extends boolean | undefined> = APIProps<{
  path: string;
  params?: { [key: string]: string };
  getFullResponse?: K;
}>;

export async function makeRequest<T>({
  path,
  params,
  getFullResponse = false,
}: MakeRequestProps<false | undefined>): Promise<T | null>;
export async function makeRequest<T>({
  path,
  params,
  getFullResponse = true,
}: MakeRequestProps<true>): Promise<APIResponse<T> | APIResponse<null>>;
export async function makeRequest<T, K extends boolean | undefined>({
  path,
  params,
  getFullResponse = false,
  tag,
}: MakeRequestProps<K>): Promise<
  | (K extends false ? APIResponse<T> : T)
  | (K extends false ? APIResponse<null> : null)
> {
  type ReturnType =
    | (K extends false ? APIResponse<T> : T)
    | (K extends false ? APIResponse<null> : null);

  let result: APIResponse<T> | null = null;

  try {
    if (tag) {
      const res = await fetch(
        [baseUrl, path, "?"].join("") + new URLSearchParams(params),
        { cache: "force-cache", next: { tags: [tag] } },
      );

      result = (await res.json()) as APIResponse<T>;
    } else {
      const res = await fetch(
        [baseUrl, path, "?"].join("") + new URLSearchParams(params),
      );
      result = (await res.json()) as APIResponse<T>;
    }
  } catch {
    result = { status: "error", message: "Error when requesting endpoint" };
  }

  if (result.status === "error") {
    if (result.message.includes("auth")) {
      redirect("?revalidateCookies=true");
    } else if (result.message.includes("too many requests")) {
      if (tag) {
        revalidatePath("/");
      }
      redirect("/access-forbidden");
    }
    if (getFullResponse) {
      return result as ReturnType;
    }
    return null as ReturnType;
  }

  if (getFullResponse) {
    return result as ReturnType;
  }
  return result.data as ReturnType;
}

const lectioAPI = {
  getSchool: getSchool,
  getAllSchools: getAllSchools,
  getIsAuthenticated: getIsAuthenticated,
  getStudent: {
    byCredentials: getStudentByCredentials,
  },
  getSchedule: {
    byCredentials: getScheduleByCredentials,
  },
  getAssignment: {
    all: getAllAssignments,
    byHref: getAssignmentByHref,
  },
};

export { lectioAPI };
