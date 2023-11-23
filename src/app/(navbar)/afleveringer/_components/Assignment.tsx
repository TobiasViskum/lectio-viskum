"use client";

import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { getColors } from "../../../../util/schedule/getColors";
import { getFormattedDate } from "../../../../util/schedule/getFormattedDate";
import TooltipHover from "@/components/global/TooltipHover";

type Props = { assignment: Assignment; addWeek: boolean };

function TooltipHoverContent({ assignment }: { assignment: Assignment }) {
  const studentTime = !isNaN(Number(assignment.studentTime.split(",")[0]))
    ? Number(assignment.studentTime.split(",")[0])
    : 0;

  return (
    <div className="flex flex-col">
      <div className="flex">
        <p className="w-16">Fravær:</p>
        <p>{assignment.absence}</p>
      </div>
      <div className="flex">
        <p className="w-16">Afventer:</p>
        <p>{assignment.awaiter}</p>
      </div>
      <div className="flex">
        <p className="w-16">Elevtimer:</p>
        <p>{studentTime}</p>
      </div>
    </div>
  );
}

export function Assignment({ assignment, addWeek }: Props) {
  const { sideColor, dateColor } = getColors(assignment);
  const formattedDate = getFormattedDate(assignment);

  const separatorTw =
    "w-[calc(100%-24px)] absolute right-0 md:right-4 md:w-[calc(100%-32px)]";

  return (
    <TooltipHover html={<TooltipHoverContent assignment={assignment} />}>
      <Link
        key={assignment.title}
        href={{
          pathname: `/afleveringer/${assignment.id}`,
          query: {
            title: assignment.title,
            class: assignment.class,
          },
        }}
        className="group relative flex h-[88px] w-full items-center gap-x-4 whitespace-nowrap rounded-lg py-1 pl-1 transition-colors hover:bg-accent focus:bg-accent focus:outline-0"
      >
        {addWeek && <Separator className={cn(separatorTw, "top-0")} />}
        <div className={cn("h-2/3 w-2 rounded-md", sideColor)} />
        <div className="overflow-hidden">
          <p className="text-sm text-muted-foreground opacity-50">
            {assignment.class}
          </p>
          <p
            className={cn(
              assignment.title.length > 30
                ? "text-sm"
                : assignment.title.length > 40
                ? "text-xs"
                : "text-base",
              "overflow-hidden text-ellipsis whitespace-nowrap py-0.5 font-medium",
            )}
          >
            {assignment.title}
          </p>
          <p className={cn("text-sm opacity-75", dateColor)}>{formattedDate}</p>
        </div>
        <ChevronRightIcon className="ml-auto mr-8 hidden text-muted-foreground opacity-75 transition-transform group-hover:translate-x-2 group-hover:scale-110 group-focus:translate-x-2 group-focus:scale-110 md:block" />
        <Separator className={cn(separatorTw, "bottom-0")} />
      </Link>
    </TooltipHover>
  );
}
