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
import Image from "next/image";
import { profile } from "@/assets";
import { DatePickerDemo } from "@/components/ui/datepicker";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  searchParams: { [key: string]: string };
  params: { userId: string };
};

export default async function SchedulePage({ searchParams, params }: Props) {
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

      redirect(
        `/skema/elev/${params.userId}?week=${newObj.week}&year=${newObj.year}`,
      );
    }
  } catch (err) {
    redirect(
      `/skema/elev/${params.userId}?week=${searchParamsObj.week}&year=${searchParamsObj.year}`,
    );
  }

  const lectioProps = getLectioProps();

  const schedulePromise = lectioAPI.getSchedule.byCredentials({
    ...lectioProps,
    userId: params.userId,
    ...searchParamsObj,
  });
  const studentPromise = lectioAPI.getStudent.byId({
    lectioCookies: lectioProps.lectioCookies,
    schoolCode: lectioProps.schoolCode,
    userId: params.userId,
  });

  const [schedule, student] = await Promise.all([
    schedulePromise,
    studentPromise,
  ]);

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

  lectioAPI.getSchedule.byCredentials({
    ...lectioProps,
    week: (Number(searchParamsObj.week) - 1).toString(),
    year: searchParamsObj.year,
  });
  lectioAPI.getSchedule.byCredentials({
    ...lectioProps,
    week: (Number(searchParamsObj.week) + 1).toString(),
    year: searchParamsObj.year,
  });

  return (
    <ScheduleProvider>
      <div id="schedule-main" className="w-full">
        <h1 className="pt-4 text-3xl font-bold text-muted-foreground">
          Uge {searchParamsObj.week}, {searchParamsObj.year}
        </h1>
        <div className="flex flex-col gap-x-4 pb-4 sm:flex-row sm:items-center sm:pb-0">
          <div className="flex items-center gap-x-2 py-4">
            <Image
              src={student?.imgSrc || profile}
              width={56}
              height={56}
              alt="img"
              className="obj aspect-square rounded-full object-cover"
            />
            <div>
              <p className="text-lg font-semibold">{student?.name}</p>
              <p className="text-sm text-muted-foreground">
                Klasse: {student?.studentClass}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-x-2">
            <DatePickerDemo />
            <div className="flex h-2/3 items-center rounded-md border bg-background">
              <Link
                href={{
                  query: {
                    week: Number(searchParamsObj.week) - 1,
                    year: searchParamsObj.year,
                  },
                }}
                className="pr-2"
              >
                <ChevronLeft className="h-6 w-6 text-muted-foreground" />
              </Link>
              <p className="text-xs">27/10 - 03/11</p>
              <Link
                href={{
                  query: {
                    week: Number(searchParamsObj.week) + 1,
                    year: searchParamsObj.year,
                  },
                }}
                className="pl-2"
              >
                <ChevronRight className="h-6 w-6 text-muted-foreground" />
              </Link>
            </div>
          </div>
        </div>

        <DaySwitcher />

        <div className="relative flex w-full justify-center rounded-md pt-8">
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
