export function NoDataSkeleton() {
  const linkTw =
    "transition-colors flex flex-col gap-y-1 items-center duration-300 text-muted-foreground";
  const countTw = "text-xs h-6 w-6 p-1 rounded-full bg-zinc-500 bg-opacity-5";

  return (
    <>
      <div className="relative grid w-full min-w-[256px] max-w-sm animate-pulse grid-cols-4 text-center text-sm">
        <button className={linkTw}>
          <p className={countTw}>0</p>
          <p>Alle</p>
        </button>
        <button className={linkTw}>
          <p className={countTw}>0</p>
          <p>Afleveret</p>
        </button>
        <button className={linkTw}>
          <p className={countTw}>0</p>
          <p>Venter</p>
        </button>
        <button className={linkTw}>
          <p className={countTw}>0</p>
          <p>Mangler</p>
        </button>
        <div className="absolute -bottom-2 h-0.5 w-1/4 translate-x-[200%] rounded-md bg-muted-foreground transition-all duration-300" />
      </div>
    </>
  );
}
