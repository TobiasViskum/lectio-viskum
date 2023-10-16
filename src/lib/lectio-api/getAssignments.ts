import { makeRequest } from ".";

type MainType = Prettify<Assignment[]>;
type FunctionProps = APIProps<StandardProps>;

export async function getAssignments(props: FunctionProps, getFullResponse?: false | undefined): Promise<MainType | null>;
export async function getAssignments(props: FunctionProps, getFullResponse: true): Promise<APIResponse<MainType> | APIResponse<null>>;
export async function getAssignments<K extends boolean | undefined>(props: FunctionProps, getFullResponse?: boolean | undefined): Promise<(K extends false ? APIResponse<MainType> : MainType) | (K extends false ? APIResponse<null> : null)> {
  type ReturnType = (K extends false ? APIResponse<MainType> : MainType) | (K extends false ? APIResponse<null> : null);

  const result = await makeRequest<MainType>({
    path: "/get-assignments",
    params: props,
    tag: props.tag,
    // @ts-ignore
    getFullResponse: getFullResponse,
  });
  return result as ReturnType;
}
