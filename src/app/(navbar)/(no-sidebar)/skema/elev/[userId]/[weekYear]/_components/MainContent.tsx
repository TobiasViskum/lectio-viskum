import { Fragment } from "react";
import { generateTimestamps } from "../_util/generateTimestamps";
import { Timestamps } from "./Timestamps";
import { TimestampsLines } from "./TimestampsLines";
import { Weekday } from "./Weekday";
import { Wrapper } from "./Wrapper";
import { capitalizeFirstLetter } from "@/util/capitalizeFirstLetter";
import { Dot } from "lucide-react";
import Link from "next/link";

type Props = { schedulePromise: Promise<Week[] | null>; userId: string };

export async function MainContent({ schedulePromise, userId }: Props) {
  const schedule = await schedulePromise;

  if (schedule == null) {
    return <p>Return skeleton with error state</p>;
  }

  const timestamps = generateTimestamps(schedule);

  return (
    <>
      {schedule.length === 0 ? (
        <div className="text-center" id="no_schedule_activities">
          <p>Der er ingen aktiviteter i denne uge!</p>
          <p>Nyd ugen!</p>
        </div>
      ) : (
        <div className="relative flex w-full flex-col justify-center">
          <div className="ml-14 overflow-x-hidden">
            <Wrapper>
              {schedule.map((week) => {
                const formattedDate = new Intl.DateTimeFormat("da-dk", {
                  dateStyle: "long",
                }).format(week.date);

                const weekDay = capitalizeFirstLetter(
                  new Intl.DateTimeFormat("da-dk", {
                    weekday: "long",
                  }).format(week.date),
                );
                return (
                  <div
                    key={week.date}
                    className="flex min-w-full flex-col gap-y-4 pb-4 sm:min-w-1/2 lg:min-w-1/3 xl:min-w-1/4 2xl:min-w-1/5"
                  >
                    <div className="text-center">
                      <p className="text-lg font-medium text-muted-foreground">
                        {weekDay}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {formattedDate}
                      </p>
                    </div>
                    <div className="flex flex-col items-center text-center text-xs">
                      {week.notes.map((note) => {
                        if (note.lessonId === "") {
                          return (
                            <div key={note.text} className="flex items-center">
                              <Dot /> {note.text}
                            </div>
                          );
                        }
                        return (
                          <Link
                            href={`/skema/elev/${userId}/modul/${note.lessonId}`}
                            key={note.text}
                            className="flex items-center text-blue-400 hover:underline"
                          >
                            <Dot /> {note.text}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </Wrapper>
          </div>
          <div className="relative flex w-full justify-center">
            <div className="flex h-full w-14 flex-col ">
              <div className="grid w-16 pl-1 text-muted-foreground opacity-70">
                <Timestamps timestamps={timestamps} />
              </div>
            </div>

            <div className="relative w-full max-w-[1600px] overflow-x-hidden overflow-y-hidden">
              <div
                className="pointer-events-none absolute h-full w-full bg-transparent"
                style={{
                  paddingTop: "var(--offset-top-lesson)",
                  width: "calc(100% - 12px)",
                }}
              >
                <TimestampsLines timestamps={timestamps} />
              </div>

              <Wrapper>
                {schedule.map((week, index) => {
                  return (
                    <Weekday
                      week={week}
                      timestamps={timestamps}
                      key={index}
                      userId={userId}
                    />
                  );
                })}
              </Wrapper>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
