import Link from "next/link";
import { cn } from "@/lib/utils";
import { NoteIcon } from "@/components/icons/NoteIcon";
import { HomeworkIcon } from "@/components/icons/HomeworkIcon";
import { getNumericLessonTimes } from "../_util/getNumericLessonTimes";

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
  const splitStartTime = time.startTime.split(":");
  const startTime = Number(splitStartTime[0]) + Number(splitStartTime[1]) / 60;
  const splitEndTime = time.endTime.split(":");
  const endTime = Number(splitEndTime[0]) + Number(splitEndTime[1]) / 60;

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
    leftOffset = `calc((var(--lesson-width) / ${
      lesson.overlappingLessons + 1
    }) * ${foundLesson.totalAdded})`;
    foundLesson.totalAdded += 1;
  }

  const isSubjectsEmpty = lesson.subjects[0] === "";
  const hasNote = lesson.hasNote;
  const hasHomework = lesson.hasHomework;

  const cornerWidth = Number(hasNote) * 20 + Number(hasHomework) * 20;

  let titleSize = "text-base";
  if (lesson.overlappingLessons >= 1) {
    titleSize = "text-sm";
  }

  const numericTimes = getNumericLessonTimes(lesson);

  let displayOnlyTitle = false;
  if (numericTimes.endTime - numericTimes.startTime < 0.75) {
    titleSize = "text-sm";
    displayOnlyTitle = true;
  }

  return (
    <Link
      key={Math.random()}
      href={"/skema"}
      className={cn(
        `group absolute flex w-full gap-x-2 overflow-hidden rounded-md bg-opacity-50 transition-[transform,_background-color] hover:z-50 hover:scale-[1.025] hover:bg-opacity-90`,
        backgroundColor,
      )}
      style={{
        top: `calc(var(--offset-top-lesson) + var(--height-hour) * ${multi})`,
        height: `calc((${endTime - startTime}) * var(--height-hour))`,
        width: `calc(var(--lesson-width) / ${lesson.overlappingLessons + 1})`,
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
          className="float-right flex h-6 items-center justify-end pr-0.5"
          style={{
            shapeOutside: `polygon(0 0, ${cornerWidth}px 0, ${cornerWidth}px 24px, 0 24px)`,
            width: cornerWidth,
          }}
        >
          {lesson.hasNote && (
            <NoteIcon
              className={cn("transition-colors", fillColor, hoverFillColor)}
            />
          )}
          {lesson.hasHomework && (
            <HomeworkIcon
              className="h-5 w-5"
              fillTw={cn("transition-colors", fillColor, hoverFillColor)}
            />
          )}
        </div>

        <div className="w-auto overflow-auto break-words pt-1">
          <p
            className={cn(
              "py-0.5 font-semibold leading-3 transition-colors",
              textColor,
              hoverTextColor,
              titleSize,
            )}
          >
            {lesson.subjects.join(", ")}
          </p>
          <p
            className={cn(
              isSubjectsEmpty
                ? `font-semibold leading-3 transition-colors ${titleSize}`
                : "w-full text-xs transition-colors",
              textColor,
              hoverTextColor,
            )}
          >
            {lesson.title}
          </p>
          {!displayOnlyTitle && (
            <>
              <p
                className={cn(
                  "text-xs transition-colors",
                  textColor,
                  hoverTextColor,
                )}
              >
                {lesson.classrooms.join(", ")}
              </p>
              <p
                className={cn(
                  "transition-colors",
                  textColor,
                  hoverTextColor,
                  lesson.classes.join(", ").length > 40
                    ? "text-2xs"
                    : "text-xs",
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
