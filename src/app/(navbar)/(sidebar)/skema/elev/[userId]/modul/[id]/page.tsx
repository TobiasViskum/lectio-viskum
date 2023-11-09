import { getLectioProps } from "@/lib/auth/getLectioProps";
import { lectioAPI } from "@/lib/lectio-api";
import { RenderHomework } from "./_components/RenderHomework";
import { Teacher } from "@/components/global/Teacher";
import { LessonTime } from "./_components/LessonTime";
import Link from "next/link";

type Props = {
  params: {
    userId: string;
    id: string;
  };
};

export default async function LessonPage({ params }: Props) {
  const lectioProps = getLectioProps();
  const lesson = await lectioAPI.getLessonById({
    lessonId: params.id,
    lectioCookies: lectioProps.lectioCookies,
    schoolCode: lectioProps.schoolCode,
    userId: params.userId,
    year: "2023",
  });

  if (lesson === null) {
    return <p>An error happened</p>;
  }

  return (
    <div className="flex max-w-4xl flex-col gap-y-2 pt-4">
      <h1 className="pb-4 text-3xl font-semibold drop-shadow-glow-sm">
        {lesson.subjects.length !== 0 ? lesson.subjects : lesson.title}
      </h1>
      <LessonTime lessonNumber={lesson.lessonNumber} time={lesson.time} />

      {lesson.teachers.map((teacher) => {
        return <Teacher key={teacher.name} teacher={teacher} />;
      })}

      <div className="flex flex-col gap-y-2">
        <p className="pb-1 pt-4 text-sm text-muted-foreground">INFORMATION:</p>
        <div className="grid grid-cols-[65px_1fr]">
          <p>Klasser:</p>
          <p className="text-muted-foreground">
            {lesson.classes.map((obj) => obj.fullClass).join(", ")}{" "}
          </p>
        </div>
        <div className="grid grid-cols-[65px_1fr]">
          <p>{lesson.classrooms.length === 1 ? "Lokale:" : "Lokaler:"}</p>
          <p className="text-muted-foreground">
            {lesson.classrooms.join(", ")}
          </p>
        </div>
      </div>

      {lesson.note.length !== 0 && (
        <div>
          <p className="pb-1 pt-4 text-sm text-muted-foreground">NOTE:</p>
          <div className="flex flex-col">
            {lesson.note.map((note) => {
              return (
                <p
                  key={note}
                  className="min-h-[24px]"
                  dangerouslySetInnerHTML={{ __html: note }}
                />
              );
            })}
          </div>
        </div>
      )}

      {lesson.homework.length !== 0 && (
        <div>
          <p className="pb-1 pt-4 text-sm text-muted-foreground">LEKTIER:</p>
          <div className="flex flex-col">
            {lesson.homework.map((homework, _index) => {
              return (
                <div
                  key={_index}
                  className="flex flex-col gap-y-2 border-b pb-4"
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
      {lesson.note.length === 0 &&
        lesson.homework.length === 0 &&
        lesson.other.length === 0 && (
          <div className="pt-8 text-lg text-muted-foreground">
            Der er ikke lagt noget indhold ind
          </div>
        )}

      <Link
        className="mt-4 block rounded-md border py-2 text-center md:hidden"
        href={`/skema/elev/${params.userId}/modul/${params.id}/elevfeedback`}
      >
        Elevfeedback
      </Link>
    </div>
  );
}
