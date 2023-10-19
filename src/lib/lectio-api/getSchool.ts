import { makeRequest } from ".";

type MainType = School;
type FunctionProps = APIProps<{ schoolCode: string }>;

export async function getSchool(
  props: FunctionProps,
  getFullResponse?: false | undefined,
): Promise<MainType | null>;
export async function getSchool(
  props: FunctionProps,
  getFullResponse: true,
): Promise<APIResponse<MainType> | APIResponse<null>>;
export async function getSchool<K extends boolean | undefined>(
  props: FunctionProps,
  getFullResponse?: boolean | undefined,
): Promise<
  | (K extends false ? APIResponse<MainType> : MainType)
  | (K extends false ? APIResponse<null> : null)
> {
  type ReturnType =
    | (K extends false ? APIResponse<MainType> : MainType)
    | (K extends false ? APIResponse<null> : null);

  const result = await makeRequest<MainType>({
    path: "/get-school/by-school-code",
    params: props,
    // @ts-ignore
    getFullResponse: getFullResponse,
  });
  return result as ReturnType;
}
