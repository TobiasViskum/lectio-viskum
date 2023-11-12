import { AssignmentsRenderer } from "./_components/AssignmentsRenderer";
import { Suspense } from "react";
import { LoadingDots } from "@/components/loading-components/LoadingDots";
import { FilterButtons } from "./_components/FilterButtons/FilterButtons";
import { FilterButtonsSkeleton } from "./_components/FilterButtons/FilterButtonsSkeleton";

export default function AssignmentsPage() {
  return (
    <>
      <h1 className="pt-6 text-4xl font-medium">Afleveringer</h1>
      <div className="sticky top-12 z-40 block bg-black bg-opacity-50 pb-4 pt-6 backdrop-blur-sm md:hidden ">
        <Suspense fallback={<FilterButtonsSkeleton />}>
          <FilterButtons />
        </Suspense>
      </div>
      <div className="flex flex-col items-center md:pt-0">
        <Suspense fallback={<LoadingDots className="mt-8" />}>
          <AssignmentsRenderer />
        </Suspense>
      </div>
    </>
  );
}
