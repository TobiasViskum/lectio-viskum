import { profile } from "@/assets";
import { cn } from "@/lib/utils";
import Image from "next/image";

type Props = { student: Student; size?: "small" | "normal" | "large" };

export function Student({ student, size = "normal" }: Props) {
  let sizeNumber = 48;
  if (size === "normal") {
    sizeNumber = 56;
  } else if (size === "large") {
    sizeNumber = 72;
  }

  return (
    <button className="flex max-h-[64px] w-full items-center gap-x-2 overflow-hidden rounded-lg py-2 pl-1 pr-3 transition-colors hover:bg-accent">
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
            size === "small" && "text-base",
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
    </button>
  );
}
