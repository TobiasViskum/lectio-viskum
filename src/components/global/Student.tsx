import { profile } from "@/assets";
import Image from "next/image";

export function Student({ student }: { student: Student }) {
  return (
    <div className="flex items-center gap-x-2 py-4">
      <Image
        src={student.imgSrc || profile}
        width={56}
        height={56}
        alt="img"
        className="obj aspect-square rounded-full object-cover"
      />
      <div>
        <p className="text-lg font-semibold">{student.name}</p>
        <p className="text-sm text-muted-foreground">{student.studentClass}</p>
      </div>
    </div>
  );
}
