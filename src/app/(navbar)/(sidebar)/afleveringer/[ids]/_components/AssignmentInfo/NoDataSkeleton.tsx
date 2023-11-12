import { Separator } from "@/components/ui/separator";

export function NoDataSkeleton() {
  const divTw = "flex justify-between";
  const p_1Tw = "";
  const p_2Tw = "bg-accent h-3 w-24 animate-pulse rounded-md";

  return (
    <div className="w-full max-w-md text-sm">
      <p className="pb-2 text-xs text-muted-foreground">INFO OM OPGAVEN:</p>

      <div className="flex flex-col gap-y-2 px-2 py-2 md:px-0">
        <div className={divTw}>
          <p className={p_1Tw}>Frist:</p>
          <p className={p_2Tw} />
        </div>
        <Separator />
        <div className={divTw}>
          <p className={p_1Tw}>Status:</p>
          <p className={p_2Tw} />
        </div>
        <Separator />
        <div className={divTw}>
          <p className={p_1Tw}>Fravær:</p>
          <p className={p_2Tw} />
        </div>
        <Separator />
        <div className={divTw}>
          <p className={p_1Tw}>Afventer:</p>
          <p className={p_2Tw} />
        </div>
      </div>
    </div>
  );
}
