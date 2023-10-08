import "server-only";
import { getSchool } from "./getSchool";
import { getAllSchools } from "./getAllSchools";
import { getIsAuthenticated } from "./getIsAuthenticated";

const baseUrl = "https://dev07.reactprojects.mywire.org";

export type StandardProps = {
  username: string;
  password: string;
  schoolCode: string;
};

type MakeRequestProps<K extends boolean | undefined> = {
  path: string;
  params?: { [key: string]: string };
  getFullResponse?: K;
};

export async function makeRequest<T>({ path, params, getFullResponse = false }: MakeRequestProps<false | undefined>): Promise<T | null>;
export async function makeRequest<T>({ path, params, getFullResponse = true }: MakeRequestProps<true>): Promise<APIResponse<T> | APIResponse<null>>;
export async function makeRequest<T, K extends boolean | undefined>({ path, params, getFullResponse = false }: MakeRequestProps<K>): Promise<(K extends false ? APIResponse<T> : T) | (K extends false ? APIResponse<null> : null)> {
  type ReturnType = (K extends false ? APIResponse<T> : T) | (K extends false ? APIResponse<null> : null);

  let result: APIResponse<T> | null = null;
  try {
    const res = await fetch([baseUrl, path, "?"].join("") + new URLSearchParams(params));
    result = (await res.json()) as APIResponse<T>;
  } catch {
    result = { status: "error", message: "Error when requesting endpoint" };
  }
  if (result.status === "error") {
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
};

export { lectioAPI };
