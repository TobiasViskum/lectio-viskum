import { lectioAPI } from "@/lib/lectio-api";
import { z } from "zod";
import { getWeekAndYear } from "@/util/getWeekAndYear";
import { redirect } from "next/navigation";
import { ScheduleProvider } from "./schedule-context";
import { FetchAdjacentWeeks } from "./_components/FetchAdjacentWeeks";
import { MainContent } from "./_components/MainContent";
import { ScheduleHeader } from "./_components/ScheduleHeader";
import { Suspense } from "react";
import { TimestampSkeleton } from "./_components/TimestampSkeleton";
import { ScheduleHeaderSkeleton } from "./_components/ScheduleHeaderSkeleton";

type Props = {
  params: { userId: string; weekYear: string };
};

export default function SchedulePage({ params }: Props) {
  const schema = z.object({
    week: z.string().min(1),
    year: z.string().length(4),
  });
  let searchParamsObj = getWeekAndYear(new Date());

  try {
    const splitParams = params.weekYear.split("-");

    const data = schema.parse({
      week: splitParams[0],
      year: splitParams[1],
    });
    searchParamsObj = data;

    if (isNaN(Number(data.week)) || isNaN(Number(data.year))) {
      const newObj = getWeekAndYear(new Date());

      redirect(
        `/skema/elev/${params.userId}?week=${newObj.week}&year=${newObj.year}`,
      );
    }
  } catch (err) {
    redirect(
      `/skema/elev/${params.userId}?week=${searchParamsObj.week}&year=${searchParamsObj.year}`,
    );
  }

  const schedulePromise = lectioAPI.getSchedule.byStudentId({
    userId: params.userId,
    week: searchParamsObj.week,
    year: searchParamsObj.year,
  });

  return (
    <ScheduleProvider>
      <div id="schedule-main" className="w-full">
        <h1 className="pt-4 text-2xl font-bold">
          Uge {searchParamsObj.week}, {searchParamsObj.year}
        </h1>
        <Suspense fallback={<ScheduleHeaderSkeleton />}>
          <ScheduleHeader
            schedulePromise={schedulePromise}
            searchParamsObj={searchParamsObj}
            userId={params.userId}
          />
        </Suspense>
        <div className="relative flex w-full justify-center rounded-md pt-8">
          <Suspense fallback={<TimestampSkeleton />}>
            <MainContent
              schedulePromise={schedulePromise}
              userId={params.userId}
            />
          </Suspense>
        </div>
      </div>
      <FetchAdjacentWeeks
        searchParamsObj={searchParamsObj}
        userId={params.userId}
      />
    </ScheduleProvider>
  );
}
