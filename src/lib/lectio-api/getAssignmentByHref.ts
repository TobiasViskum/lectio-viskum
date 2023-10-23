import { getAssignment } from "@/library/scrapeFunctions/getAssignment";
import { processResult } from "./processResult";
import { validateResult } from "./validateResult";

type MainType = Prettify<FullAssignment>;
type FunctionProps = APIProps<StandardProps & { href: string }>;

export async function getAssignmentByHref(props: FunctionProps) {
  const result = await getAssignment({
    href: props.href,
    lectioCookies: props.lectioCookies,
    schoolCode: props.schoolCode,
  });
  const processedResult = processResult<MainType>(result);
  validateResult(processedResult);

  const data =
    processedResult.status === "success" ? processedResult.data : null;

  return data;
}
