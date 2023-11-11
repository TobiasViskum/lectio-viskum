import { profile } from "@/assets";
import { cn } from "@/lib/utils";
import Image from "next/image";

type Props = { teacher: Teacher; size?: "small" | "normal" | "large" };

export function Teacher({ teacher, size }: Props) {
  let sizeNumber = 48;
  if (size === "normal") {
    sizeNumber = 56;
  } else if (size === "large") {
    sizeNumber = 72;
  }

  return (
    <button className="flex w-full items-center gap-x-2 rounded-lg py-2 pl-1 pr-3 transition-colors hover:bg-accent">
      <Image
        src={teacher.imgSrc || profile}
        width={sizeNumber}
        height={sizeNumber}
        alt="img"
        className="obj aspect-square rounded-full object-cover"
      />
      <div className="flex flex-col text-start">
        <p
          className={cn(
            "break-words text-lg font-semibold",
            size === "small" && "text-base",
            size === "large" && "text-2xl",
          )}
        >
          {teacher.name}
        </p>
        {size !== "small" && (
          <p
            className={cn(
              "text-sm text-muted-foreground",
              size === "large" && "text-base",
            )}
          >
            {teacher.initials}
          </p>
        )}
      </div>
    </button>
  );
}
