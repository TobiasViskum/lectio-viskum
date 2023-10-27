import Link from "next/link";
import { cn } from "@/lib/utils";
import { NoteIcon } from "@/components/icons/NoteIcon";
import { HomeworkIcon } from "@/components/icons/HomeworkIcon";
import { getNumericLessonTimes } from "../../_util/getNumericLessonTimes";
import { BookmarkFilledIcon } from "@radix-ui/react-icons";

type Props = {
  lesson: Lesson;
  timestamps: number[];
  lessonsAddedAtTimestamp: { start: number; end: number; totalAdded: number }[];
};

export async function Lesson({
  lesson,
  timestamps,
  lessonsAddedAtTimestamp,
}: Props) {
  const time = lesson.time;
  const startTime =
    time.startDate.getHours() + time.startDate.getMinutes() / 60;

  const endTime = time.endDate.getHours() + time.endDate.getMinutes() / 60;

  const multi = startTime - timestamps[0];

  let backgroundColor = "bg-blue-500";
  let sidebarColor = "bg-blue-400";
  let textColor = "text-blue-300";
  let fillColor = "fill-blue-300";
  let hoverSidebarColor = "group-hover:bg-blue-200";
  let hoverTextColor = "group-hover:text-white";
  let hoverFillColor = "group-hover:fill-white";
  if (lesson.status === "changed") {
    backgroundColor = "bg-green-500";
    sidebarColor = "bg-green-400";
    textColor = "text-green-300";
    fillColor = "fill-green-300";
    hoverSidebarColor = "group-hover:bg-green-200";
    hoverTextColor = "group-hover:text-white";
    hoverFillColor = "group-hover:fill-white";
  } else if (lesson.status === "cancelled") {
    backgroundColor = "bg-red-500";
    sidebarColor = "bg-red-400";
    textColor = "text-red-300";
    fillColor = "fill-red-300";
    hoverSidebarColor = "group-hover:bg-red-200";
    hoverTextColor = "group-hover:text-white";
    hoverFillColor = "group-hover:fill-white";
  }

  let leftOffset = "";
  const foundLesson = lessonsAddedAtTimestamp.find(
    (obj) => startTime === obj.start,
  );
  lessonsAddedAtTimestamp.push({
    start: startTime,
    end: endTime,
    totalAdded: 1,
  });
  if (foundLesson) {
    leftOffset = `calc(((100% - 16px) / ${lesson.overlappingLessons + 1}) * ${
      foundLesson.totalAdded
    })`;
    foundLesson.totalAdded += 1;
  }

  const isSubjectsEmpty = lesson.subjects[0] === "";
  const hasNote = lesson.hasNote;
  const hasHomework = lesson.hasHomework;

  const numericTimes = getNumericLessonTimes(lesson);

  let displayOnlyTitle = false;
  if (numericTimes.endTime - numericTimes.startTime < 0.75) {
    displayOnlyTitle = true;
  }

  function getTitleSize() {
    let titleSize = "text-sm @[124px]:text-sm";
    if (displayOnlyTitle) {
      titleSize = "text-sm";
    } else if (lesson.overlappingLessons >= 1) {
      titleSize = "text-xs @[124px]:text-sm";
    }
    return titleSize;
  }

  return (
    <Link
      key={Math.random()}
      href={"/skema"}
      className={cn(
        `@container group absolute ml-1 flex w-full gap-x-1 overflow-hidden rounded-md bg-opacity-50 transition-[transform,_background-color] hover:scale-[1.025] hover:bg-opacity-90 sm:gap-x-1.5`,
        backgroundColor,
      )}
      style={{
        top: `calc(var(--offset-top-lesson) + var(--height-hour) * ${multi})`,
        height: `calc((${endTime - startTime}) * var(--height-hour))`,
        width: `calc((100% - 16px) / ${lesson.overlappingLessons + 1})`,
        left: leftOffset,
      }}
    >
      <div
        className={cn(
          "h-full w-1.5 rounded-l-md transition-colors",
          sidebarColor,
          hoverSidebarColor,
        )}
      />
      <div className="w-full overflow-hidden">
        <div className="w-auto overflow-auto break-words pt-1">
          <div
            className={cn(
              "@[124px]:semibold flex flex-wrap items-start gap-x-1.5 font-bold leading-3 transition-colors",
              textColor,
              hoverTextColor,
              getTitleSize(),
            )}
          >
            {lesson.subjects.join(", ")}
            {!isSubjectsEmpty && (
              <div className="flex items-center">
                {hasNote && (
                  <NoteIcon
                    className={cn(
                      "h-4 w-4 transition-colors",
                      fillColor,
                      hoverFillColor,
                    )}
                  />
                )}
                {hasHomework && <BookmarkFilledIcon className="h-4 w-4" />}
              </div>
            )}
          </div>
          <div
            className={cn(
              isSubjectsEmpty
                ? `@[124px]:semibold flex flex-wrap items-start gap-x-1.5 font-bold leading-3 transition-colors ${getTitleSize()}`
                : "@[124px]:text-xs w-full text-2xs transition-colors",
              lesson.title.length > 20 && !displayOnlyTitle
                ? "@[124px]:text-2xs text-3xs"
                : "text-sm",
              textColor,
              hoverTextColor,
            )}
          >
            {lesson.title}
            {isSubjectsEmpty && (
              <div className="flex items-center">
                {hasNote && (
                  <NoteIcon
                    className={cn(
                      "h-4 w-4 transition-colors",
                      fillColor,
                      hoverFillColor,
                    )}
                  />
                )}
                {hasHomework && <BookmarkFilledIcon className="h-4 w-4" />}
              </div>
            )}
          </div>
          {!displayOnlyTitle && (
            <>
              <p
                className={cn(
                  "@[124px]:text-xs text-2xs transition-colors",
                  textColor,
                  hoverTextColor,
                )}
              >
                {lesson.classrooms.join(", ")}
              </p>
              <p
                className={cn(
                  " transition-colors",
                  textColor,
                  hoverTextColor,
                  lesson.classes.join(", ").length > 40
                    ? "text-2xs"
                    : "@[124px]:text-xs text-2xs",
                )}
              >
                {lesson.classes.join(", ")}
              </p>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}
