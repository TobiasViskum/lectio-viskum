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
    <div className="flex items-center gap-x-2 py-4">
      <Image
        src={student.imgSrc || profile}
        width={sizeNumber}
        height={sizeNumber}
        alt="img"
        className="obj aspect-square rounded-full object-cover"
      />
      <div>
        <p
          className={cn(
            "text-lg font-semibold",
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
    </div>
  );
}
