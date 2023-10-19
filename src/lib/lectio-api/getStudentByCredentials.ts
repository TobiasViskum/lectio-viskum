import { makeRequest } from ".";

type MainType = Student;
type FunctionProps = APIProps<StandardProps>;

export async function getStudentByCredentials(
  props: FunctionProps,
  getFullResponse?: false | undefined,
): Promise<MainType | null>;
export async function getStudentByCredentials(
  props: FunctionProps,
  getFullResponse: true,
): Promise<APIResponse<MainType> | APIResponse<null>>;
export async function getStudentByCredentials<K extends boolean | undefined>(
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
    path: "/get-student/by-credentials",
    params: props,
    tag: props.tag,
    // @ts-ignore
    getFullResponse: getFullResponse,
  });
  return result as ReturnType;
}
