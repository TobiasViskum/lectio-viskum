import { profileLoading } from "@/assets";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

export function NoDataSkeleton() {
  return (
    <div className="flex h-12 gap-x-2 px-2">
      <Image
        src={profileLoading}
        width={40}
        height={40}
        alt="img"
        className="ml-1 aspect-square h-10 w-10 animate-pulse rounded-full object-cover"
      />
      <ChevronDown className="text-muted-foreground" />
    </div>
  );
}
