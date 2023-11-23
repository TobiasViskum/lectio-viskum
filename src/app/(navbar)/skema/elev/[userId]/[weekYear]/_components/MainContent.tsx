import { H3 } from "@/components/ui/h3";
import { generateTimestamps } from "../_util/generateTimestamps";
import { Timestamps } from "./Timestamps";
import { TimestampsLines } from "./TimestampsLines";
import { Weekday } from "./Weekday";
import { Wrapper } from "./Wrapper";
import { capitalizeFirstLetter } from "@/util/capitalizeFirstLetter";
import Link from "next/link";
import { getPageState } from "../page-state";

type Props = { userId: string };

export async function MainContent({ userId }: Props) {
  const pageState = getPageState();
  let schedule = await pageState.schedule;

  if (schedule === null) schedule = await pageState.cachedSchedule;
  if (schedule === null) {
    return <p>Return skeleton with error state</p>;
  }

  const timestamps = generateTimestamps(schedule);

  let hoursBefore8 = 0;
  for (let i = 0; i < timestamps.length; i++) {
    const t = timestamps[i];
    if (t === 8) break;
    hoursBefore8++;
  }

  return (
    <>
      {schedule.length === 0 ? (
        <div className="w-full text-center" id="no_schedule_activities">
          <p>Der er ingen aktiviteter i denne uge!</p>
          <p>Nyd ugen!</p>
        </div>
      ) : (
        <div className="relative flex w-full max-w-[1920px] flex-col justify-center">
          <div className="overflow-x-hidden sm:ml-12">
            <Wrapper>
              {schedule.map((week) => {
                const formattedDate = new Intl.DateTimeFormat("da-dk", {
                  dateStyle: "long",
                }).format(new Date(week.date));

                const weekDay = capitalizeFirstLetter(
                  new Intl.DateTimeFormat("da-dk", {
                    weekday: "long",
                  }).format(new Date(week.date)),
                );
                return (
                  <div
                    key={new Date(week.date).toISOString()}
                    className="flex h-32 min-w-full flex-col gap-y-2 pb-4 sm:min-w-1/2 lg:min-w-1/3 xl:min-w-1/4 2xl:min-w-1/5"
                  >
                    <div className="text-center">
                      <H3 className="">{weekDay}</H3>
                      <p className="text-sm text-muted-foreground">
                        {formattedDate}
                      </p>
                    </div>
                    <ul className="flex list-outside list-disc flex-col items-center gap-y-1 pl-4 text-center text-xs">
                      {week.notes.map((note) => {
                        if (note.lessonId === "") {
                          return <li key={note.text}>{note.text}</li>;
                        }
                        return (
                          <li key={note.text}>
                            <Link
                              href={`/skema/elev/${userId}/modul/${note.lessonId}`}
                              className=" text-link hover:underline"
                            >
                              {note.text}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
            </Wrapper>
          </div>
          <div className="relative flex w-full justify-center">
            <div className="flex h-full w-14 flex-col ">
              <div className="grid w-16 pl-4 text-muted-foreground opacity-70 sm:pl-2">
                <div className="absolute -left-1 sm:-left-2 md:-left-4">
                  <div
                    className="absolute top-0 grid h-12 place-items-center rounded-r-md bg-accent px-[3px] text-xs font-semibold text-foreground"
                    style={{
                      height: "calc(var(--height-hour) * 1.5)",
                      top: `calc(var(--height-hour) * ${hoursBefore8})`,
                    }}
                  >
                    1
                  </div>
                  <div
                    className="absolute grid h-12 place-items-center rounded-r-md bg-accent px-[3px] text-xs font-semibold text-foreground"
                    style={{
                      height: "calc(var(--height-hour) * 1.5)",
                      top: `calc(var(--height-hour) * ${2 + hoursBefore8})`,
                    }}
                  >
                    2
                  </div>
                  <div
                    className="absolute grid h-12 place-items-center rounded-r-md bg-accent px-[3px] text-xs font-semibold text-foreground"
                    style={{
                      height: "calc(var(--height-hour) * 1.5)",
                      top: `calc(var(--height-hour) * ${4 + hoursBefore8})`,
                    }}
                  >
                    3
                  </div>
                  <div
                    className="absolute grid h-12 place-items-center rounded-r-md bg-accent px-[3px] text-xs font-semibold text-foreground"
                    style={{
                      height: "calc(var(--height-hour) * 1.5)",
                      top: `calc(var(--height-hour) * ${5.75 + hoursBefore8})`,
                    }}
                  >
                    4
                  </div>
                </div>
                <Timestamps timestamps={timestamps} />
              </div>
            </div>

            <div className="relative w-full max-w-[1920px] overflow-x-hidden overflow-y-hidden">
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
