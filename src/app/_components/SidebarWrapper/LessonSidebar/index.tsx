import { lectioAPI } from "@/lib/lectio-api";
import { getServerUrl } from "@/lib/next/getServerUrl";
import { Content } from "./Content";

export async function LessonSidebar() {
  const url = getServerUrl();

  const idMatch = url.match(/elev\/([0-9]+)\/modul\/([0-9]+)/);
  const yearMatch = url.match(/prevYear=([0-9]+)/);

  let lesson: FullLesson | null = null;

  if (idMatch && yearMatch) {
    const userId = idMatch[1];
    const lessonId = idMatch[2];
    const year = yearMatch[1];
    lesson = await lectioAPI.getLessonById({
      lessonId: lessonId,
      userId: userId,
      year: year,
    });
  }

  if (lesson === null) {
    return <p>Error</p>;
  }

  return (
    <div className="h-full">
      <Content lesson={lesson} />
    </div>
  );
}
