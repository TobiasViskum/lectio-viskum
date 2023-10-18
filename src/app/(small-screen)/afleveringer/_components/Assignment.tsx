import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { getColors } from "../_util/getColors";
import { getFormattedDate } from "../_util/getFormattedDate";

type Props = { assignment: Assignment; addWeek: boolean };

export function Assignment({ assignment, addWeek }: Props) {
  const { sideColor, dateColor } = getColors(assignment);
  const formattedDate = getFormattedDate(assignment);

  return (
    <>
      <Link href="/" className="group flex h-[88px] py-1 gap-x-4 items-center bg-background hover:bg-muted rounded-lg pl-1 transition-colors focus:bg-muted focus:outline-0 w-full relative">
        {addWeek && <Separator className="w-[calc(100%-32px)] absolute top-0 right-4" />}
        <div className={cn("w-2 h-2/3 rounded-md", sideColor)} />
        <div>
          <p className="text-muted-foreground opacity-50 text-sm">
            {[assignment.subject, ", "].join("")}
            {assignment.class}
          </p>
          <p className="font-medium py-0.5">{assignment.title}</p>
          <p className={cn("opacity-75 text-sm", dateColor)}>{formattedDate}</p>
        </div>
        <ChevronRightIcon className="text-muted-foreground ml-auto mr-8 opacity-75 transition-transform group-hover:scale-110 group-hover:translate-x-2 group-focus:scale-110 group-focus:translate-x-2 hidden md:block" />
        <Separator className="w-[calc(100%-32px)] absolute bottom-0 right-4" />
      </Link>
    </>
  );
}
