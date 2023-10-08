import { makeRequest } from ".";

type MainType = School[];

export async function getAllSchools(getFullResponse?: false | undefined): Promise<MainType | null>;
export async function getAllSchools(getFullResponse: true): Promise<APIResponse<MainType> | APIResponse<null>>;
export async function getAllSchools<K extends boolean | undefined>(getFullResponse?: boolean | undefined): Promise<(K extends false ? APIResponse<MainType> : MainType) | (K extends false ? APIResponse<null> : null)> {
  type ReturnType = (K extends false ? APIResponse<MainType> : MainType) | (K extends false ? APIResponse<null> : null);

  const result = await makeRequest<MainType>({
    path: "/get-school/by-school-code",
    // @ts-ignore
    getFullResponse: getFullResponse,
  });
  return result as ReturnType;
}
