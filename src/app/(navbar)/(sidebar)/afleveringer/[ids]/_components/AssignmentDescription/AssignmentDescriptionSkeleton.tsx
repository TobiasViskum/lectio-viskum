export function AssignmentDescriptionSkeleton() {
  return (
    <div className="flex max-w-[min(85%,768px)] animate-pulse flex-col gap-y-1">
      <div className="flex h-6 w-40 items-center">
        <div className="h-4 w-full rounded-md bg-accent" />
      </div>
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
  );
}
