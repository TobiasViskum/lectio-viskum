import { processResult } from "./processResult";
import { getAssignments } from "@/api-functions/scrapeFunctions";
import { validateResult } from "./validateResult";
import { getTimeInMs } from "@/util/getTimeInMs";

type MainType = Prettify<Assignment[]>;
type FunctionProps = APIProps<StandardProps>;

export const getAllAssignments = async (props: FunctionProps) => {
  const userId = props.userId;
  const tag = `${userId}-assignments`;
  const foundCache = global.cache.get(tag);

  if (foundCache && new Date().getTime() < foundCache.expires) {
    return foundCache.data as MainType;
  }

  const result = await getAssignments({
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
      expires: new Date().getTime() + getTimeInMs({ minutes: 5 }),
    });
  }

  return data;
};
