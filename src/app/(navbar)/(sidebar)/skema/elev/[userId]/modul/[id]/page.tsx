import { lectioAPI } from "@/lib/lectio-api";
import { RenderHomework } from "./_components/RenderHomework";
import { Teacher } from "@/components/global/Teacher";
import { LessonTime } from "./_components/LessonTime";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Fragment } from "react";

type Props = {
  params: {
    userId: string;
    id: string;
  };
};

export default async function LessonPage({ params }: Props) {
  const lesson = await lectioAPI.getLessonById({
    lessonId: params.id,
    userId: params.userId,
    year: "2023",
  });

  if (lesson === null) {
    return <p>An error happened</p>;
  }

  return (
    <div className="flex max-w-4xl flex-col gap-y-2 pt-4">
      <h1 className="pb-4 text-3xl font-semibold drop-shadow-glow-sm">
        {lesson.subjects.length !== 0
          ? [
              lesson.subjects.join(", "),
              lesson.title ? [", ", lesson.title].join("") : "",
            ].join("")
          : lesson.title}
      </h1>
      <LessonTime lessonNumber={lesson.lessonNumber} time={lesson.time} />

      {lesson.teachers.map((teacher) => {
        return <Teacher key={teacher.name} teacher={teacher} />;
      })}

      <div className="mt-8 flex flex-col gap-y-2">
        <Badge className="-ml-1 w-max bg-accent px-1.5 py-0.5 text-left text-2xs text-muted-foreground transition-opacity hover:bg-accent hover:opacity-75 ">
          INFORMATION
        </Badge>
        {/* <InfoCircledIcon className="h-6 w-6 text-blue-400" /> */}
        {lesson.classes.length !== 0 && (
          <div className="flex flex-col text-sm">
            <p className="font-semibold">Klasser:</p>
            <p className="text-muted-foreground">
              {lesson.classes.map((obj) => obj.fullClass).join(", ")}{" "}
            </p>
          </div>
        )}
        {lesson.classrooms.length !== 0 && (
          <div className="flex flex-col text-sm">
            <p className="font-semibold">
              {lesson.classrooms.length === 1 ? "Lokale:" : "Lokaler:"}
            </p>
            <p className="text-muted-foreground">
              {lesson.classrooms.join(", ")}
            </p>
          </div>
        )}
      </div>

      {lesson.note.length !== 0 && (
        <div className="flex flex-col gap-y-2">
          <Badge className="-ml-1 mt-8 w-max bg-accent px-1.5 py-0.5 text-left text-2xs text-muted-foreground transition-opacity hover:bg-accent hover:opacity-75">
            NOTE
          </Badge>
          <div className="flex flex-col text-muted-foreground">
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
        <div className="flex flex-col gap-y-2">
          <Badge className="-ml-1 mt-8 w-max bg-accent px-1.5 py-0.5 text-left text-2xs text-muted-foreground transition-opacity hover:bg-accent hover:opacity-75">
            LEKTIER
          </Badge>
          <div className="flex flex-col">
            {lesson.homework.map((homework, _index) => {
              const addSeparator =
                _index !== 0 && _index !== lesson.homework.length;

              return (
                <Fragment key={_index}>
                  {addSeparator && <Separator className="my-3" />}
                  <div className="flex flex-col gap-y-2">
                    <RenderHomework homework={homework} key={_index} />
                  </div>
                </Fragment>
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
