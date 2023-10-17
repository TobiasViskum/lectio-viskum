export function FilterButtonsSkeleton() {
  return (
    <>
      <div className="relative grid grid-cols-4 text-center w-96 animate-pulse">
        <div className="text-muted-foreground">Alle</div>
        <div className="text-muted-foreground">Afleveret</div>
        <div className="text-muted-foreground">Venter</div>
        <div className="text-muted-foreground">Mangler</div>
        <div className="absolute -bottom-1 h-0.5 rounded-md w-24 bg-muted-foreground" />
      </div>
    </>
  );
}
