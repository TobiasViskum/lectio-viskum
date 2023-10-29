import "server-only";
import { getClassInformation } from "@/api-functions/scrapeFunctions";
import { processResult } from "./processResult";

type MainType = FullLesson;
type FunctionProps = StandardProps & { lessonId: string; year: string };

export const getLessonById = async (props: FunctionProps) => {
  const result = await getClassInformation(props);
  const processedResult = processResult<MainType>(result);

  const data =
    processedResult.status === "success" ? processedResult.data : null;
  return data;
};
