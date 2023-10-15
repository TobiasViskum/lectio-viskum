import { Separator } from "@/components/ui/separator";
import { getCredentials } from "@/lib/auth/getCredentials";
import { lectioAPI } from "@/lib/lectio-api";
import { redirect } from "next/navigation";
import { generateTimestamps } from "./_util/generateTimestamps";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { HomeworkIcon } from "@/components/icons/HomeworkIcon";
import { NoteIcon } from "@/components/icons/NoteIcon";

export default async function SchedulePage() {
  const credentials = getCredentials();
  const schedule = await lectioAPI.getSchedule.byCredentials({ ...credentials, week: "39", year: "2023" });

  if (schedule === null) {
    redirect("/log-ind");
  }

  const OFFSET_TOP_TEXT = 20;
  const OFFSET_TOP_LESSON = 30;
  const HEIGHT_HOUR = 75;
  const LESSON_WIDTH = 256;

  const timestamps = generateTimestamps(schedule);

  let lessonsAddedAtTimestamp: { start: number; end: number; totalAdded: number }[] = [];

  return (
    <>
      <h1>Skema</h1>
      <div className="w-full mt-12 relative h-[1260px] rounded-md flex">
        <div className="flex flex-col w-16 h-full pl-2">
          <div className="grid text-muted-foreground opacity-70" style={{ paddingTop: OFFSET_TOP_TEXT }}>
            {timestamps.map((timeStamp, index) => {
              const strTimeStamp = timeStamp.toString();
              let strTime = "";
              if (timeStamp < 10) {
                const strTimeStamp = timeStamp.toString();
                strTime = ["0", strTimeStamp, ":00"].join("");
              } else {
                strTime = [strTimeStamp, ":00"].join("");
              }

              return (
                <p className="text-sm" key={strTimeStamp} style={{ height: HEIGHT_HOUR }}>
                  {strTime}
                </p>
              );
            })}
          </div>
        </div>
        <div className="w-full relative bg-opacity-10 flex overflow-x-hidden pl-4">
          <div className="absolute w-full h-full bg-transparent pointer-events-none" style={{ paddingTop: OFFSET_TOP_LESSON }}>
            {timestamps.map((timeStamp, index) => {
              return (
                <div key={timeStamp} style={{ height: HEIGHT_HOUR }}>
                  <Separator />
                </div>
              );
            })}
          </div>
          <div className="h-full absolute" style={{ width: LESSON_WIDTH }}>
            {schedule[2].lessons.map((lesson, index) => {
              const time = lesson.time;
              const splitStartTime = time.startTime.split(":");
              const startTime = Number(splitStartTime[0]) + Number(splitStartTime[1]) / 60;
              const splitEndTime = time.endTime.split(":");
              const endTime = Number(splitEndTime[0]) + Number(splitEndTime[1]) / 60;

              const multi = startTime - timestamps[0];

              const height = (endTime - startTime) * HEIGHT_HOUR;

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

              let leftOffset = 0;
              const foundLesson = lessonsAddedAtTimestamp.find((obj) => startTime === obj.start);
              lessonsAddedAtTimestamp.push({ start: startTime, end: endTime, totalAdded: 1 });
              if (foundLesson) {
                leftOffset = (LESSON_WIDTH / (lesson.overlappingLessons + 1)) * foundLesson.totalAdded;
                foundLesson.totalAdded += 1;
              }

              const isSubjectsEmpty = lesson.subjects[0] === "";

              return (
                <Link href={"/skema"} key={index} className={cn(`group hover:scale-[1.025] bg-opacity-50 absolute w-full rounded-md transition-all hover:bg-opacity-90 flex gap-x-2 hover:z-50`, backgroundColor)} style={{ top: OFFSET_TOP_LESSON + HEIGHT_HOUR * multi, height: height, width: LESSON_WIDTH / (lesson.overlappingLessons + 1), left: leftOffset }}>
                  <div className={cn("h-full w-2 rounded-l-md transition-colors", sidebarColor, hoverSidebarColor)} />
                  <div className="pt-1">
                    <p className={cn("py-0.5 font-semibold transition-colors leading-4", textColor, hoverTextColor)}>{lesson.subjects.join(", ")}</p>
                    <p className={cn(isSubjectsEmpty ? "font-semibold  transition-colors w-5/6 break-all" : "text-xs transition-colors w-5/6 break-all", textColor, hoverTextColor)}>{lesson.title}</p>
                    <div className={cn("text-xs transition-colors", textColor, hoverTextColor)}>{lesson.classrooms.join(", ")}</div>
                    <div className="absolute right-1 top-1 flex items-center gap-x-1">
                      <div className="flex h-full justify-center ">{lesson.hasNote && <NoteIcon className={cn("transition-colors", fillColor, hoverFillColor)} />}</div>
                      {lesson.hasHomework && <HomeworkIcon className="h-5 w-5" fillTw={cn("transition-colors", fillColor, hoverFillColor)} />}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
