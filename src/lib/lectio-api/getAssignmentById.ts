import { getAssignment } from "@/api-functions/scrapeFunctions/getAssignment";
import { processResult } from "./processResult";
import { validateResult } from "./validateResult";
import { getTimeInMs } from "@/util/getTimeInMs";

type MainType = Prettify<FullAssignment>;
type FunctionProps = APIProps<StandardProps & { assignmentId: string }>;

export const getAssignmentByHref = async (props: FunctionProps) => {
  const href = `ElevAflevering.aspx?elevid=${props.userId}&exerciseid=${props.assignmentId}`;

  const userId = props.userId;
  const tag = `${userId}-assignments-${props.assignmentId}`;
  const foundCache = global.cache.get(tag);

  if (foundCache && new Date().getTime() < foundCache.expires) {
    return foundCache.data as MainType;
  }

  const result = await getAssignment({
    href: href,
    lectioCookies: props.lectioCookies,
    schoolCode: props.schoolCode,
  });
  const processedResult = processResult<MainType>(result);
  validateResult(processedResult);

  const data =
    processedResult.status === "success" ? processedResult.data : null;

  if (data) {
    global.cache.set(tag, {
      data: data,
      expires: new Date().getTime() + getTimeInMs({ minutes: 1 }),
    });
  }

  return data;
};
