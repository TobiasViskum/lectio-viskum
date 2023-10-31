import { getLectioProps } from "@/lib/auth/getLectioProps";
import { lectioAPI } from "@/lib/lectio-api";
import { capitalizeFirstLetter } from "@/util/capitalizeFirstLetter";

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

  if (lesson === null) {
    return <p>An error happened</p>;
  }

  const getFormattedDate = () => {
    const time = lesson.time;
    if (time.startDate.getDate() === time.endDate.getDate()) {
      if (lesson.classes) {
      }
    }
  };

  const formattedStartTime = new Intl.DateTimeFormat("da-dk", {
    weekday: "long",
    day: "numeric",
    month: "numeric",
  }).format(lesson.time.startDate);
  const formattedEndTime = new Intl.DateTimeFormat("da-dk", {
    dateStyle: "full",
  }).format(lesson.time.endDate);

  return (
    <div>
      <p className="text-muted-foreground">
        {capitalizeFirstLetter(formattedStartTime.replaceAll(".", "/"))}
      </p>
      <p className="text-muted-foreground">
        {capitalizeFirstLetter(formattedEndTime)}
      </p>

      {lesson?.subjects}
      {/* <iframe
        width="420"
        height="315"
        src={lesson?.homework[1].description[0].videoHref}
      ></iframe> */}
    </div>
  );
}
