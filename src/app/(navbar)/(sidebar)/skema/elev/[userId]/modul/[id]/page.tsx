import { Teacher } from "@/components/global/Teacher";
import { LessonTime } from "./_components/LessonTime";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Fragment, Suspense } from "react";
import { getPageState, setPageState } from "./page-state";
import { SidebarWrapper } from "@/app/_components/SidebarWrapper";
import { LessonSidebarSkeleton } from "@/app/_components/SidebarWrapper/LessonSidebar/LessonSidebarSkeleton";
import { LessonSidebar } from "@/app/_components/SidebarWrapper/LessonSidebar";

type Props = {
  params: {
    userId: string;
    id: string;
  };
};

export default async function LessonPage({ params }: Props) {
  setPageState(params.userId, params.id);
  const pageState = getPageState();

  const lesson = await pageState.lesson;

  if (lesson === null) {
    return <p>An error happened</p>;
  }

  return (
    <SidebarWrapper
      component={
        <Suspense fallback={<LessonSidebarSkeleton />}>
          <LessonSidebar />
        </Suspense>
      }
    >
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
        <div className="block md:hidden">
          {lesson.teachers.map((teacher) => {
            return <Teacher key={teacher.name} teacher={teacher} />;
          })}
        </div>
        <div className="mt-4 flex flex-col gap-y-2">
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
              {lesson.note.map((note, index) => {
                return (
                  <p
                    key={note + index}
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
            <div className="flex flex-col gap-y-2">
              {lesson.homework.map((str, i) => {
                const addSeparator = i !== 0 && i !== lesson.homework.length;

                return (
                  <Fragment key={i}>
                    {addSeparator && <Separator className="my-3" />}
                    <div key={i} dangerouslySetInnerHTML={{ __html: str }} />
                  </Fragment>
                );
              })}
            </div>
          </div>
        )}
        {lesson.other.length !== 0 && (
          <div className="flex flex-col gap-y-2">
            <Badge className="-ml-1 mt-8 w-max bg-accent px-1.5 py-0.5 text-left text-2xs text-muted-foreground transition-opacity hover:bg-accent hover:opacity-75">
              ØVRIGT INDHOLD
            </Badge>
            <div className="flex flex-col gap-y-2">
              {lesson.other.map((str, i) => {
                const addSeparator = i !== 0 && i !== lesson.other.length;

                return (
                  <Fragment key={i}>
                    {addSeparator && <Separator className="my-3" />}
                    <div key={i} dangerouslySetInnerHTML={{ __html: str }} />
                  </Fragment>
                );
              })}
            </div>
          </div>
        )}
        {lesson.presentation.length !== 0 && (
          <div className="flex flex-col gap-y-2">
            <Badge className="-ml-1 mt-8 w-max bg-accent px-1.5 py-0.5 text-left text-2xs text-muted-foreground transition-opacity hover:bg-accent hover:opacity-75">
              PRÆSENTATION
            </Badge>
            <div className="flex flex-col gap-y-2">
              {lesson.presentation.map((str, i) => {
                const addSeparator =
                  i !== 0 && i !== lesson.presentation.length;

                return (
                  <Fragment key={i}>
                    {addSeparator && <Separator className="my-3" />}
                    <div key={i} dangerouslySetInnerHTML={{ __html: str }} />
                  </Fragment>
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
          className="mt-8 block max-w-lg rounded-md border py-2 text-center"
          href={`/skema/elev/${params.userId}/modul/${params.id}/elevfeedback`}
        >
          Elevfeedback
        </Link>
      </div>
    </SidebarWrapper>
  );
}
