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
    return `skema-${credentials.username}-${[week, searchParamsObj.year].join("")}`;
  }

  const credentials = getCredentials();

  await lectioAPI.getSchedule.byCredentials({ ...credentials, ...searchParamsObj, tag: getTag((Number(searchParamsObj.week) - 1).toString()) });
  await lectioAPI.getSchedule.byCredentials({ ...credentials, ...searchParamsObj, tag: getTag((Number(searchParamsObj.week) - 2).toString()) });
  await lectioAPI.getSchedule.byCredentials({ ...credentials, ...searchParamsObj, tag: getTag((Number(searchParamsObj.week) + 1).toString()) });
  await lectioAPI.getSchedule.byCredentials({ ...credentials, ...searchParamsObj, tag: getTag((Number(searchParamsObj.week) + 2).toString()) });
  const schedule = await lectioAPI.getSchedule.byCredentials({ ...credentials, ...searchParamsObj, tag: getTag(searchParamsObj.week) });

  if (schedule === null) {
    redirect("/log-ind");
  }

  const timestamps = generateTimestamps(schedule);

  return (
    <div id="schedule-main">
      <h1>Skema</h1>
      <Link href={{ query: { week: Number(searchParamsObj.week) - 1, year: searchParamsObj.year } }}>{"< Back"}</Link>
      <Link href={{ query: { week: Number(searchParamsObj.week) + 1, year: searchParamsObj.year } }}>{"Forward >"}</Link>
      <div className="w-full mt-12 relative h-[1260px] rounded-md flex">
        <div className="flex flex-col w-16 h-full pl-2">
          <div className="grid text-muted-foreground opacity-70" style={{ paddingTop: "var(--offset-top-text)" }}>
            <Timestamps timestamps={timestamps} />
          </div>
        </div>
        <div className="w-full relative bg-opacity-10 flex overflow-x-hidden pl-4">
          <div className="absolute w-full h-full bg-transparent pointer-events-none" style={{ paddingTop: "var(--offset-top-lesson)" }}>
            <TimestampsLines timestamps={timestamps} />
          </div>
          <div className="relative flex w-full gap-x-2 overflow-x-scroll">
            {schedule.map((week, index) => {
              return (
                <>
                  <Weekday key={Math.random()} week={week} timestamps={timestamps} />
                </>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
