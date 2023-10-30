import { generateTimestamps } from "../_util/generateTimestamps";
import { AnimateWrapper } from "./AnimateWrapper";
import { Timestamps } from "./Timestamps";
import { TimestampsLines } from "./TimestampsLines";
import { Weekday } from "./Weekday";
import { Wrapper } from "./Wrapper";

type Props = { schedulePromise: Promise<Week[] | null>; userId: string };

export async function MainContent({ schedulePromise, userId }: Props) {
  const schedule = await schedulePromise;

  if (schedule == null) {
    return <p>Return skeleton with error state</p>;
  }

  const timestamps = generateTimestamps(schedule);

  const indexToDayMap: { [key: number]: string } = {
    0: "Mandag",
    1: "Tirsdag",
    2: "Onsdag",
    3: "Torsdag",
    4: "Fredag",
    5: "Lørdag",
    6: "Søndag",
  };

  return (
    <>
      {schedule.length === 0 ? (
        <div className="text-center" id="no_schedule_activities">
          <p>Der er ingen aktiviteter i denne uge!</p>
          <p>Nyd ugen!</p>
        </div>
      ) : (
        <>
          <div className="flex h-full w-14 flex-col">
            <div
              className="grid w-16 pl-1 text-muted-foreground opacity-70"
              style={{ paddingTop: "var(--offset-top-text)" }}
            >
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
            {/* <AnimateWrapper> */}
            <Wrapper>
              {schedule.map((week, index) => {
                return (
                  <Weekday
                    week={week}
                    timestamps={timestamps}
                    day={indexToDayMap[index]}
                    key={index}
                    userId={userId}
                  />
                );
              })}
            </Wrapper>
            {/* </AnimateWrapper> */}
          </div>
        </>
      )}
    </>
  );
}
