import "server-only";
import { getLessonInformation } from "@/api-functions/scrapeFunctions";
import { processResult } from "./processResult";

type MainType = FullLesson;
type FunctionProps = Prettify<{
  lessonId: string;
  userId: string;
}>;

export const getLessonById = async (props: FunctionProps) => {
  const result = await getLessonInformation(props);
  const processedResult = processResult<MainType>(result);

  const data =
    processedResult.status === "success" ? processedResult.data : null;
  return data;
};
