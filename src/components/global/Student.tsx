import { profile } from "@/assets";
import { cn } from "@/lib/utils";
import { getWeekAndYear } from "@/util/getWeekAndYear";
import Image from "next/image";
import Link from "next/link";

type Props = {
  student: Student;
  size?: "small" | "normal" | "large";
  disableHover?: boolean;
  linkToSchedule?: boolean;
  removable?: boolean;
};

export function Student({
  student,
  size,
  disableHover = false,
  linkToSchedule = false,
}: Props) {
  let sizeNumber = 48;
  if (size === "normal") {
    sizeNumber = 56;
  } else if (size === "large") {
    sizeNumber = 72;
  }

  function Wrapper({ children }: { children: React.ReactNode }) {
    if (linkToSchedule) {
      const { week, year } = getWeekAndYear(new Date());
      return (
        <Link
          href={`/skema/elev/${student.studentId}/${week}-${year}`}
          className={cn(
            "flex w-full items-center gap-x-2 overflow-hidden rounded-lg py-2 pl-1 pr-3 transition-colors ",
            disableHover ? "pointer-events-none" : "hover:bg-accent",
            size === "small" ? " max-h-[64px]" : "",
          )}
        >
          {children}
        </Link>
      );
    } else {
      return (
        <button
          className={cn(
            "flex w-full items-center gap-x-2 overflow-hidden rounded-lg py-2 pl-1 pr-3 transition-colors ",
            disableHover ? "pointer-events-none" : "hover:bg-accent",
            size === "small" ? " max-h-[64px]" : "",
          )}
        >
          {children}
        </button>
      );
    }
  }

  return (
    <Wrapper>
      <Image
        src={student.imgSrc || profile}
        width={sizeNumber}
        height={sizeNumber}
        alt="img"
        className="obj aspect-square rounded-full object-cover"
      />
      <div className="flex flex-col overflow-hidden text-start">
        <p
          className={cn(
            "line-clamp-2 break-words text-lg font-semibold",
            size === "small" && "text-base font-medium",
            size === "large" && "text-2xl",
          )}
        >
          {student.name}
        </p>
        {size !== "small" && (
          <p
            className={cn(
              "text-sm text-muted-foreground",
              size === "large" && "text-base",
            )}
          >
            {size === "large" && "Klasse: "}
            {student.studentClass}
          </p>
        )}
      </div>
    </Wrapper>
  );
}
