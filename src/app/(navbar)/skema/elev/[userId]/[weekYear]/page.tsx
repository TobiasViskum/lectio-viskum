import { lectioAPI } from "@/lib/lectio-api";
import { z } from "zod";
import { getWeekAndYear } from "@/util/getWeekAndYear";
import { redirect } from "next/navigation";
import { ScheduleProvider } from "./schedule-context";
import { FetchAdjacentWeeks } from "./_components/FetchAdjacentWeeks";
import { MainContent } from "./_components/MainContent";
import { ScheduleHeader } from "./_components/ScheduleHeader";
import { Suspense } from "react";
import { SmartNavigation } from "@/app/_components/SmartNavigation";
import { H2 } from "@/components/ui/h2";
import { setPageState } from "./page-state";

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

      redirect(`/skema/elev/${params.userId}/${newObj.week}-${newObj.year}`);
    }
  } catch (err) {
    redirect(
      `/skema/elev/${params.userId}/${searchParamsObj.week}-${searchParamsObj.year}`,
    );
  }

  setPageState(params.userId, searchParamsObj.week, searchParamsObj.year);

  return (
    <ScheduleProvider>
      <SmartNavigation />

      <div id="schedule-main" className="w-full">
        <H2 className="pt-2 font-extrabold">
          Uge {searchParamsObj.week}, {searchParamsObj.year}
        </H2>
        <div className="py-4">
          {/* <Suspense
            fallback={<ScheduleHeaderSkeleton userId={params.userId} />}
          > */}
          <ScheduleHeader
            searchParamsObj={searchParamsObj}
            userId={params.userId}
          />
          {/* </Suspense> */}
        </div>
        <div className="relative flex w-full rounded-md">
          {/* <Suspense fallback={<TimestampSkeleton />}> */}
          <MainContent userId={params.userId} />
          {/* </Suspense> */}
        </div>
      </div>
      <FetchAdjacentWeeks
        searchParamsObj={searchParamsObj}
        userId={params.userId}
      />
    </ScheduleProvider>
  );
}
