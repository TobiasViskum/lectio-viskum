import { getPageState } from "@/app/(navbar)/(sidebar)/skema/elev/[userId]/modul/[id]/page-state";
import { LoadingDots } from "@/components/loading-components/LoadingDots";
import { Input } from "@/components/ui/input";

export async function LessonSidebarSkeleton() {
  const pageState = getPageState();

  return (
    <div className=" w-full animate-pulse opacity-75">
      <div className="flex flex-col items-center gap-y-2 py-2 pb-4 pl-1 pr-3 text-left">
        <p className="w-full text-sm text-muted-foreground">
          Søg efter elever eller lærere:
        </p>
        <Input disabled placeholder="Søg..." />
        <LoadingDots className="mt-8" />
      </div>
    </div>
  );
}
