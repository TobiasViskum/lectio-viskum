export function NoDataSkeleton() {
  return (
    <div className="flex max-w-[min(85%,768px)] flex-col gap-y-2">
      <p className="font-medium">Opgavebeskrivelse:</p>
      <div className="flex animate-pulse flex-col gap-y-1">
        <div className="flex flex-col gap-y-0.5 text-sm text-muted-foreground">
          <div className="flex h-5 w-full items-center">
            <div className="h-3 w-full rounded-md bg-accent" />
          </div>
          <div className="flex h-5 w-full items-center">
            <div className="h-3 w-full rounded-md bg-accent" />
          </div>
          <div className="flex h-5 w-full items-center">
            <div className="h-3 w-full rounded-md bg-accent" />
          </div>
          <div className="flex h-5 w-1/2 items-center">
            <div className="h-3 w-full rounded-md bg-accent" />
          </div>
        </div>
      </div>
    </div>
  );
}
