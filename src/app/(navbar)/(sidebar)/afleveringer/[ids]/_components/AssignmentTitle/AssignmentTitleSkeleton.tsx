import { cn } from "@/lib/utils";

type Props = { title: string | undefined };
export function AssignmentTitleSkeleton({ title }: Props) {
  return (
    <div
      className={cn(
        "flex h-8 items-center text-2xl font-bold md:h-9 md:text-3xl",
      )}
    >
      {(title !== undefined && decodeURIComponent(title)) || (
        <div className="h-4 w-[min(100%,400px)] animate-pulse rounded-md bg-accent" />
      )}
    </div>
  );
}
