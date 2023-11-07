import { getLectioProps } from "@/lib/auth/getLectioProps";
import { lectioAPI } from "@/lib/lectio-api";
import { RenderHomework } from "./_components/RenderHomework";
import { Teacher } from "@/components/global/Teacher";
import { LessonTime } from "./_components/LessonTime";
import { StudentFeedback } from "./_components/StudentFeedback";

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

  return (
    <div className="flex max-w-4xl flex-col gap-y-2 pt-4">
      <h1 className="drop-shadow-glow-sm pb-4 text-3xl font-semibold">
        {lesson.subjects.length !== 0 ? lesson.subjects : lesson.title}
      </h1>
      <LessonTime lessonNumber={lesson.lessonNumber} time={lesson.time} />

      {lesson.teachers.map((teacher) => {
        return <Teacher key={teacher.name} teacher={teacher} />;
      })}

      <StudentFeedback />

      <div>
        <p className="pb-1 pt-4 text-sm text-muted-foreground">KLASSER:</p>
        {lesson.classes.map((schoolClass) => {
          return <div key={schoolClass.fullClass}>{schoolClass.fullClass}</div>;
        })}
      </div>

      <div>
        <p className="pb-1 pt-4 text-sm text-muted-foreground">
          {lesson.classrooms.length === 1 ? "LOKALE:" : "LOKALER:"}
        </p>
        <div className="">{lesson.classrooms.join(", ")}</div>
      </div>

      {lesson.note !== "" && (
        <div>
          <p className="pb-1 pt-4 text-sm text-muted-foreground">NOTE:</p>
          <p>{lesson.note}</p>
        </div>
      )}

      {lesson.homework.length !== 0 && (
        <div>
          <p className="pb-1 pt-4 text-sm text-muted-foreground">LEKTIER:</p>
          <div className="flex flex-col gap-y-4">
            {lesson.homework.map((homework, _index) => {
              return (
                <div
                  key={_index}
                  className="flex flex-col gap-y-4 border-b pb-4"
                >
                  <RenderHomework homework={homework} key={_index} />
                </div>
              );
            })}
          </div>
        </div>
      )}

      {lesson.other.length !== 0 && (
        <div>
          <p className="pb-1 pt-4 text-sm text-muted-foreground">
            ØVRIGT INDHOLD:
          </p>
          <div className="flex flex-col gap-y-4">
            {lesson.other.map((homework, _index) => {
              return (
                <div
                  key={_index}
                  className="flex flex-col gap-y-4 border-b pb-4"
                >
                  <RenderHomework homework={homework} key={_index} />
                </div>
              );
            })}
          </div>
        </div>
      )}
      {lesson.note === "" &&
        lesson.homework.length === 0 &&
        lesson.other.length === 0 && (
          <div className="pt-8 text-lg text-muted-foreground">
            Der er ikke lagt noget indhold ind
          </div>
        )}
    </div>
  );
}
