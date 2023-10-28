import { getLectioProps } from "@/lib/auth/getLectioProps";
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
import { Wrapper } from "./_components/Wrapper";
import { ScheduleProvider } from "./schedule-context";

export const dynamic = "force-dynamic";
export const revalidate = 0;

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

    if (isNaN(Number(data.week)) || isNaN(Number(data.year))) {
      const newObj = getCurrWeekAndYear();

      redirect(`/skema?week=${newObj.week}&year=${newObj.year}`);
    }
  } catch (err) {
    redirect(
      `/skema?week=${searchParamsObj.week}&year=${searchParamsObj.year}`,
    );
  }

  const lectioProps = getLectioProps();

  const d = new Date().getTime();

  const schedule = await lectioAPI.getSchedule.byCredentials({
    ...lectioProps,
    ...searchParamsObj,
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

  await lectioAPI.getSchedule.byCredentials({
    ...lectioProps,
    week: (Number(searchParamsObj.week) - 1).toString(),
    year: searchParamsObj.year,
  });
  await lectioAPI.getSchedule.byCredentials({
    ...lectioProps,
    week: (Number(searchParamsObj.week) + 1).toString(),
    year: searchParamsObj.year,
  });

  return (
    <ScheduleProvider>
      <div id="schedule-main" className="w-full">
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

        <div className="relative flex w-full justify-center rounded-md">
          {schedule.length === 0 ? (
            <div className="text-center">
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
                <Wrapper>
                  {schedule.map((week, index) => {
                    return (
                      <Weekday
                        week={week}
                        timestamps={timestamps}
                        day={indexToDayMap[index]}
                        key={index}
                      />
                    );
                  })}
                </Wrapper>
              </div>
            </>
          )}
        </div>
      </div>
    </ScheduleProvider>
  );
}
