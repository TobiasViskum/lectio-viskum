"use client";

import { CalendarBack } from "@/components/icons/CalendarBack";
import { DatePicker } from "@/components/ui/datepicker";
import { cn } from "@/lib/utils";
import { getWeekAndYear } from "@/util/getWeekAndYear";
import { getWeekStartEnd } from "@/util/getWeekStartEnd";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useContext } from "react";
import { ScheduleContext } from "../../../schedule-context";

type Props = { searchParamsObj: { week: string; year: string } };
export function DateNavigationPc({ searchParamsObj }: Props) {
  const context = useContext(ScheduleContext);
  const params = useParams();
  const userId = params.userId;
  const router = useRouter();
  const numberWeek = Number(searchParamsObj.week);
  const numberYear = Number(searchParamsObj.year);

  const dateRange = getWeekStartEnd(
    Number(searchParamsObj.year),
    Number(searchParamsObj.week),
  );
  const start = new Intl.DateTimeFormat("da-dk", {
    dateStyle: "medium",
  }).format(dateRange.start);

  const end = new Intl.DateTimeFormat("da-dk", {
    dateStyle: "medium",
  }).format(dateRange.end);

  let canUseCalendarBack = false;

  type NextPreviousWeek = {
    week: string;
    year: string;
  } | null;

  let nowWeek = getWeekAndYear(new Date());
  let nextWeek: NextPreviousWeek = null;
  let previousWeek: NextPreviousWeek = null;

  if (!isNaN(numberWeek) && !isNaN(numberYear)) {
    const { start, end } = getWeekStartEnd(numberYear, numberWeek);
    const now = new Date().getTime();
    if (now < start.getTime() || now > end.getTime()) {
      canUseCalendarBack = true;
    }

    const start1 = new Date(start);
    start1.setDate(start1.getDate() + 7);
    nextWeek = getWeekAndYear(start1);

    const start2 = new Date(start);
    start2.setDate(start2.getDate() - 7);
    previousWeek = getWeekAndYear(start2);
  }

  return (
    <div className="flex items-center gap-x-2 xl:flex">
      <button
        disabled={!canUseCalendarBack}
        onClick={() => {
          const newUrl = [
            "/skema/elev/",
            userId,
            "/",
            nowWeek.week,
            "-",
            nowWeek.year,
          ].join("");
          router.push(newUrl);
        }}
      >
        <CalendarBack
          className="transition-colors"
          fillTw={cn(
            canUseCalendarBack ? "fill-foreground" : "fill-muted-foreground",
          )}
        />
      </button>
      <div className="flex h-2/3 w-72 items-center justify-between rounded-md border bg-background">
        <button onClick={() => context.changeDay("backwards")} className="pr-6">
          <ChevronLeft className="h-6 w-6 text-muted-foreground" />
        </button>

        <DatePicker
          onChange={(e) => {
            if (e) {
              const { week, year } = getWeekAndYear(e);
              const newUrl = [
                "/skema/elev/",
                userId,
                "/",
                week,
                "-",
                year,
              ].join("");
              router.push(newUrl);

              router.push(newUrl);
            }
          }}
        >
          <button className="text-xs">
            {start} - {end}
          </button>
        </DatePicker>
        <button onClick={() => context.changeDay("forwards")} className="pl-6">
          <ChevronRight className="h-6 w-6 text-muted-foreground" />
        </button>
      </div>
    </div>
  );
}
