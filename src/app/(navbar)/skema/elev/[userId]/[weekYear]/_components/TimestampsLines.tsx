import { Separator } from "@/components/ui/separator";

type Props = { timestamps: number[] };

export function TimestampsLines({ timestamps }: Props) {
  return (
    <>
      {timestamps.map((timeStamp, i) => {
        return (
          <div key={timeStamp} style={{ height: "var(--height-hour)" }}>
            <Separator />
          </div>
        );
      })}
    </>
  );
}
