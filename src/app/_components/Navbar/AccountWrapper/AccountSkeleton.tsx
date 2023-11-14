import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { NoDataSkeleton } from "./NoDataSkeleton";
import { getCachedStudent } from "@/cache-functions/getCachedStudent";
import { getLectioProps } from "@/lib/auth/getLectioProps";
import { Button } from "@/components/ui/button";

export async function AccountSkeleton() {
  const userId = getLectioProps().userId;
  const user = await getCachedStudent(userId);

  if (user === null) {
    return <NoDataSkeleton />;
  }

  return (
    <Button variant={"ghost"} className="flex h-12 gap-x-2 px-2">
      <Image
        src={user.imgSrc}
        width={40}
        height={40}
        alt="img"
        className="ml-1 aspect-square h-10 w-10 animate-pulse rounded-full object-cover"
      />
      <ChevronDown className="text-muted-foreground" />
    </Button>
  );
}
