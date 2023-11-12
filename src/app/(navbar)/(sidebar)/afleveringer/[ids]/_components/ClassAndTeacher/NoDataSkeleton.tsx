import { profileLoading } from "@/assets";
import Image from "next/image";

type Props = {
  schoolClass: string | undefined;
  subject: string | undefined;
};

export function NoDataSkeleton({ schoolClass, subject }: Props) {
  return (
    <div className="flex flex-col gap-y-1">
      <div className="flex h-6 w-56 items-center gap-x-1">
        <p className="font-bold">Klasse:</p>
        {schoolClass && subject ? (
          <p className="text-muted-foreground">
            {[
              decodeURIComponent(subject),
              decodeURIComponent(schoolClass),
            ].join(", ")}
          </p>
        ) : (
          <div className="ml-2 h-3 w-full animate-pulse rounded-md bg-accent" />
        )}
      </div>
      <div className="flex w-max animate-pulse items-center gap-x-2 rounded-lg py-2 pl-1 pr-3 transition-colors">
        <Image
          src={profileLoading}
          width={48}
          height={48}
          alt="img"
          className="obj aspect-square rounded-full object-cover opacity-40"
        />
        <div className="flex flex-col justify-center gap-y-2">
          <div className="h-4 w-40 rounded-md bg-accent font-medium text-accent" />
          <div className="h-3 w-12 rounded-md bg-accent font-medium text-accent" />
        </div>
      </div>
    </div>
  );
}
