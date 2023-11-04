import { Timestamps } from "./Timestamps";
import { TimestampsLines } from "./TimestampsLines";

export function TimestampSkeleton() {
  const timestamps = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

  return (
    <>
      <div className="flex h-full w-14 animate-pulse flex-col">
        <div
          className="grid w-16 pl-1 text-muted-foreground opacity-70"
          style={{ paddingTop: "var(--offset-top-text)" }}
        >
          <Timestamps timestamps={timestamps} />
        </div>
      </div>

      <div className="relative w-full max-w-[1600px] animate-pulse overflow-x-hidden overflow-y-hidden">
        <div
          className="pointer-events-none absolute h-full w-full bg-transparent"
          style={{
            paddingTop: "var(--offset-top-lesson)",
            width: "calc(100% - 12px)",
          }}
        >
          <TimestampsLines timestamps={timestamps} />
        </div>
      </div>
    </>
  );
}
