"use client";

import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { getColors } from "../_util/getColors";
import dynamic from "next/dynamic";

type Props = { assignment: Assignment; addWeek: boolean };

export function Assignment({ assignment, addWeek }: Props) {
  const { sideColor } = getColors(assignment);

  const separatorTw = "w-[calc(100%-24px)] absolute right-0 md:right-4 md:w-[calc(100%-32px)]";

  const FormattedDate = dynamic(() => import("./FormattedDate").then((res) => res.FormattedDate), {
    ssr: false,
  });

  return (
    <>
      <Link key={assignment.title} href="/" className="group flex h-[88px] py-1 gap-x-4 items-center bg-background hover:bg-muted rounded-lg pl-1 transition-colors focus:bg-muted focus:outline-0 w-full relative whitespace-nowrap">
        {addWeek && <Separator className={cn(separatorTw, "top-0")} />}
        <div className={cn("w-2 h-2/3 rounded-md", sideColor)} />
        <div className="overflow-hidden">
          <p className="text-muted-foreground opacity-50 text-sm">
            {[assignment.subject, ", "].join("")}
            {assignment.class}
          </p>
          <p className={cn(assignment.title.length > 30 ? "text-sm" : assignment.title.length > 40 ? "text-xs" : "text-base", "font-medium py-0.5 whitespace-nowrap text-ellipsis overflow-hidden")}>{assignment.title}</p>
          <FormattedDate assignment={assignment} />
        </div>
        <ChevronRightIcon className="text-muted-foreground ml-auto mr-8 opacity-75 transition-transform group-hover:scale-110 group-hover:translate-x-2 group-focus:scale-110 group-focus:translate-x-2 hidden md:block" />
        <Separator className={cn(separatorTw, "bottom-0")} />
      </Link>
    </>
  );
}
