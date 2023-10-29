import { getLectioProps } from "@/lib/auth/getLectioProps";
import { lectioAPI } from "@/lib/lectio-api";

type Props = {
  params: {
    id: string;
  };
};

export default async function LessonPage({ params }: Props) {
  const lectioProps = getLectioProps();
  const lesson = await lectioAPI.getLessonById({
    lessonId: params.id,
    lectioCookies: lectioProps.lectioCookies,
    schoolCode: lectioProps.schoolCode,
    userId: lectioProps.userId,
    year: "2023",
  });

  return (
    <div>
      {lesson?.subjects}
      {/* <iframe
        width="420"
        height="315"
        src={lesson?.homework[1].description[0].videoHref}
      ></iframe> */}
    </div>
  );
}
