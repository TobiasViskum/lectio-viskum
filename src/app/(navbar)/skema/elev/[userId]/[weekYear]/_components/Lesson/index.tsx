import Link from "next/link";
import { cn } from "@/lib/utils";
import { NoteIcon } from "@/components/icons/NoteIcon";
import { getNumericLessonTimes } from "../../_util/getNumericLessonTimes";
import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import { getWeekAndYear } from "@/util/getWeekAndYear";

type Props = {
  lesson: Lesson;
  timestamps: number[];
  userId: string;
};

export async function Lesson({ lesson, timestamps, userId }: Props) {
  const time = lesson.time;
  const startTime =
    new Date(time.startDate).getHours() +
    new Date(time.startDate).getMinutes() / 60;

  const endTime =
    new Date(time.endDate).getHours() +
    new Date(time.endDate).getMinutes() / 60;

  const multi = startTime - timestamps[0];

  let backgroundColor = "bg-blue-500";
  let sidebarColor = "bg-blue-400";
  let textColor = "text-blue-300";
  let fillColor = "fill-blue-300";
  let hoverSidebarColor = "group-hover:bg-blue-200";
  let hoverTextColor = "group-hover:text-white";
  let hoverFillColor = "group-hover:fill-white";
  if (lesson.status === "cancelled") {
    backgroundColor = "bg-red-500";
    sidebarColor = "bg-red-400";
    textColor = "text-red-300";
    fillColor = "fill-red-300";
    hoverSidebarColor = "group-hover:bg-red-200";
  } else if (lesson.status === "changed") {
    backgroundColor = "bg-green-500";
    sidebarColor = "bg-green-400";
    textColor = "text-green-300";
    fillColor = "fill-green-300";
    hoverSidebarColor = "group-hover:bg-green-200";
  }

  const leftOffset = `calc(((100% - 16px) / ${
    lesson.styling.overlappingLessons + 1
  }) * ${lesson.styling.position})`;

  const hasNote = lesson.hasNote;
  const hasHomework = lesson.hasHomework;

  const numericTimes = getNumericLessonTimes(lesson);

  let displayOnlyTitle = false;
  if (numericTimes.endTime - numericTimes.startTime < 0.75) {
    displayOnlyTitle = true;
  }
  let isVerySmall = numericTimes.endTime - numericTimes.startTime < 0.4;

  function getTitleSize() {
    let titleSize = "text-sm @[124px]:text-sm";
    if (displayOnlyTitle) {
      titleSize = "text-sm";
    } else if (lesson.styling.overlappingLessons >= 1) {
      titleSize = "text-xs @[124px]:text-sm";
    }
    if (isVerySmall) {
      titleSize = "text-xs";
    }
    return titleSize;
  }

  const { week, year } = getWeekAndYear(new Date(lesson.time.startDate));

  const Icons = () => {
    return (
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
    );
  };

  return (
    <Link
      key={Math.random()}
      href={{
        pathname: `/skema/elev/${userId}/modul/${lesson.id}`,
        query: { prevWeek: week, prevYear: year },
      }}
      className={cn(
        `group absolute ml-1 flex w-full gap-x-1 overflow-hidden rounded-md bg-opacity-50 transition-[transform,_background-color] @container hover:scale-[1.015] hover:bg-opacity-90 sm:gap-x-1.5`,
        backgroundColor,
      )}
      style={{
        top: `calc(var(--offset-top-lesson) + var(--height-hour) * ${multi})`,
        height: `calc((${endTime - startTime}) * var(--height-hour))`,
        width: `calc((100% - 16px) / ${lesson.styling.overlappingLessons + 1})`,
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
        <div
          className={cn(
            "w-auto overflow-auto break-words",
            isVerySmall ? "" : "pt-1",
          )}
        >
          {lesson.title !== "" && (
            <div
              className={cn(
                `@[124px]:semibold flex flex-wrap items-start gap-x-1.5 break-words break-all font-bold  leading-3 transition-colors ${getTitleSize()}`,

                textColor,
                hoverTextColor,
              )}
            >
              {lesson.title}

              <Icons />
            </div>
          )}
          {!displayOnlyTitle && (
            <>
              <div
                className={cn(
                  " transition-colors",
                  textColor,
                  hoverTextColor,
                  lesson.classes.join(", ").length > 40
                    ? lesson.title === ""
                      ? "text-xs"
                      : "text-2xs"
                    : lesson.title === ""
                    ? "text-xs @[124px]:text-sm"
                    : "text-2xs @[124px]:text-xs",
                  lesson.title === "" ? "flex gap-x-2 font-bold" : "",
                )}
              >
                <p>{lesson.classes.join(", ")}</p>
                {lesson.title === "" && <Icons />}
              </div>
              <p
                className={cn(
                  "text-2xs transition-colors @[124px]:text-xs",
                  textColor,
                  hoverTextColor,
                )}
              >
                {lesson.classrooms.join(", ")}
              </p>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}
