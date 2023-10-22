import { AssignmentsRenderer } from "./_components/AssignmentsRenderer";
import { Suspense } from "react";
import { LoadingDots } from "@/components/loading-components/LoadingDots";
import { DynamicRevalidation } from "./_components/DynamicRevalidation";
import { FilterButtons } from "./_components/FilterButtons/FilterButtons";
import { FilterButtonsSkeleton } from "./_components/FilterButtons/FilterButtonsSkeleton";

export default async function AssignmentsPage() {
  return (
    <>
      <h1 className="pt-6 text-4xl font-medium max-md:pl-4">Afleveringer</h1>
      <div className="block pt-6 md:hidden">
        <Suspense fallback={<FilterButtonsSkeleton />}>
          <FilterButtons />
        </Suspense>
      </div>
      <div className="flex flex-col items-center pt-4 md:pt-0">
        <Suspense fallback={<LoadingDots className="mt-8" />}>
          <AssignmentsRenderer />
        </Suspense>
      </div>
      {/* <DynamicRevalidation /> */}
    </>
  );
}
