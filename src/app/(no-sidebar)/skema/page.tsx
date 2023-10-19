import { getCredentials } from "@/lib/auth/getCredentials";
import { lectioAPI } from "@/lib/lectio-api";
import { generateTimestamps } from "./_util/generateTimestamps";
import { Timestamps } from "./_components/Timestamps";
import { TimestampsLines } from "./_components/TimestampsLines";
import { Weekday } from "./_components/Weekday";
import { z } from "zod";
import { getCurrWeekAndYear } from "@/lib/utils";
import Link from "next/link";
import { redirect } from "next/navigation";
import { DaySwitcher } from "./_components/DaySwitcher";
import { Separator } from "@/components/ui/separator";
import { Wrapper } from "./_components/Wrapper";

type Props = { searchParams: { [key: string]: string } };

export default async function SchedulePage({ searchParams }: Props) {
  const schema = z.object({
    week: z.string().min(1),
    year: z.string().length(4),
  });
  let searchParamsObj = getCurrWeekAndYear();

  try {
    const data = schema.parse(searchParams);
    searchParamsObj = data;

    // if (isNaN(Number(data.week)) || isNaN(Number(data.year))) {
    //   const newObj = getCurrWeekAndYear();

    //   redirect(`/skema?week=${newObj.week}&year=${newObj.year}`);
    // }
  } catch (err) {
    console.log(err);
  }

  function getTag(week: string) {
    const tag = `skema-${credentials.username}-${[
      week,
      searchParamsObj.year,
    ].join("")}`;

    return tag;
  }

  const credentials = getCredentials();

  const schedule = await lectioAPI.getSchedule.byCredentials({
    ...credentials,
    ...searchParamsObj,
    tag: getTag(searchParamsObj.week),
  });

  if (schedule === null) {
    redirect("/log-ind");
  }

  const timestamps = generateTimestamps(schedule);

  const indexToDayMap: { [key: number]: Day } = {
    0: "Mandag",
    1: "Tirsdag",
    2: "Onsdag",
    3: "Torsdag",
    4: "Fredag",
    5: "Lørdag",
    6: "Søndag",
  };

  const roundingInterval = "var(--lesson-width) + var(--lesson-gap)";
  const valueToRound = "100svw - var(--text-width) - 32px";
  const multi = `round(down, ${valueToRound}, ${roundingInterval})`;
  const cssWidth = `calc(var(--text-width) + ${multi})`;

  return (
    <div id="schedule-main">
      <h1>Skema</h1>
      <Link
        href={{
          query: {
            week: Number(searchParamsObj.week) - 1,
            year: searchParamsObj.year,
          },
        }}
      >
        {"< Back"}
      </Link>
      <Link
        href={{
          query: {
            week: Number(searchParamsObj.week) + 1,
            year: searchParamsObj.year,
          },
        }}
      >
        {"Forward >"}
      </Link>
      <DaySwitcher />
      <div className="relative flex rounded-md" style={{ width: cssWidth }}>
        <div className="flex h-full w-16 flex-col pl-2">
          <div
            className="grid w-16 text-muted-foreground opacity-70"
            style={{ paddingTop: "var(--offset-top-text)" }}
          >
            <Timestamps timestamps={timestamps} />
          </div>
        </div>

        <div className="relative flex w-full overflow-x-hidden overflow-y-hidden bg-opacity-10 pl-2">
          <div
            className="pointer-events-none absolute h-full w-full bg-transparent"
            style={{ paddingTop: "var(--offset-top-lesson)" }}
          >
            <TimestampsLines timestamps={timestamps} />
          </div>
          <div className="absolute left-0 h-full">
            {[1, 2, 3, 4].map((item, index) => {
              return (
                <Separator
                  key={item}
                  orientation="vertical"
                  style={{
                    left: `calc(1px + 13px * ${item} + var(--lesson-width) * ${item})`,
                  }}
                  className="absolute"
                />
              );
            })}
          </div>
          <Wrapper>
            {schedule.map((week, index) => {
              return (
                <Weekday
                  key={index}
                  week={week}
                  timestamps={timestamps}
                  day={indexToDayMap[index]}
                />
              );
            })}
          </Wrapper>
        </div>
      </div>
    </div>
  );
}
