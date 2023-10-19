import { StandardProps, makeRequest } from ".";

type MainType = LectioAuth;
type FunctionProps = APIProps<StandardProps>;

export async function getIsAuthenticated(
  props: FunctionProps,
  getFullResponse?: false | undefined,
): Promise<MainType | null>;
export async function getIsAuthenticated(
  props: FunctionProps,
  getFullResponse: true,
): Promise<APIResponse<MainType> | APIResponse<null>>;
export async function getIsAuthenticated<K extends boolean | undefined>(
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
    path: "/get-is-authenticated",
    params: props,
    // @ts-ignore
    getFullResponse: getFullResponse,
  });
  return result as ReturnType;
}
