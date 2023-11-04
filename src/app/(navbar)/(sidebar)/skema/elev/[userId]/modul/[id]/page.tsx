import { getLectioProps } from "@/lib/auth/getLectioProps";
import { lectioAPI } from "@/lib/lectio-api";
import { capitalizeFirstLetter } from "@/util/capitalizeFirstLetter";
import { RenderHomework } from "./_components/RenderHomework";

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

  const formattedStartTime = new Intl.DateTimeFormat("da-dk", {
    dateStyle: "full",
    timeStyle: "short",
  }).format(lesson.time.startDate);
  const formattedEndTime = new Intl.DateTimeFormat("da-dk", {
    dateStyle: "full",
    timeStyle: "short",
  }).format(lesson.time.endDate);

  return (
    <div className="flex max-w-4xl flex-col gap-y-2">
      <p className="text-muted-foreground">
        {capitalizeFirstLetter(formattedStartTime)}
      </p>
      <p className="text-muted-foreground">
        {capitalizeFirstLetter(formattedEndTime)}
      </p>
      <p className="text-xl">Fag: {lesson.subjects}</p>
      <div>
        <p className="pb-1 pt-4 text-sm text-muted-foreground">NOTE:</p>
        <p>{lesson.note}</p>
      </div>

      <div>
        <p className="pb-1 pt-4 text-sm text-muted-foreground">LEKTIER:</p>
        <div className="flex flex-col gap-y-4">
          {lesson.homework.map((homework, _index) => {
            return (
              <div key={_index} className="flex flex-col gap-y-4 border-b pb-4">
                <RenderHomework homework={homework} key={_index} />
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <p className="pb-1 pt-4 text-sm text-muted-foreground">
          ØVRIGT INDHOLD:
        </p>
        <div className="flex flex-col gap-y-4">
          {lesson.other.map((homework, _index) => {
            return (
              <div key={_index} className="flex flex-col gap-y-4 border-b pb-4">
                <RenderHomework homework={homework} key={_index} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
