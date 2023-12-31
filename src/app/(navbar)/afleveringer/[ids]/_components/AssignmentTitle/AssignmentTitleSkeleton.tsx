type Props = { title: string | undefined };
export function AssignmentTitleSkeleton({ title }: Props) {
  return (
    <div className="flex items-center">
      {title !== undefined ? (
        <h1 className="text-2xl font-bold md:text-3xl">
          {decodeURIComponent(title)}
        </h1>
      ) : (
        <div className="h-8 w-full md:h-9">
          <div className="h-4 w-[min(90%,400px)] animate-pulse rounded-md bg-accent" />
        </div>
      )}
    </div>
  );
}
