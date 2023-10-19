import { AssignmentsRenderer } from "./_components/AssignmentsRenderer";
import { Suspense } from "react";
import { LoadingDots } from "@/components/loading-components/LoadingDots";
import { DynamicRevalidation } from "./_components/DynamicRevalidation";
import { FilterButtons } from "./_components/FilterButtons/FilterButtons";
import { FilterButtonsSkeleton } from "./_components/FilterButtons/FilterButtonsSkeleton";
import { DateUpdater } from "./_components/DateUpdater";

export default async function AssignmentsPage() {
  return (
    <>
      <h1 className="text-4xl font-medium pt-6 max-md:pl-4">Afleveringer</h1>
      <div className="block md:hidden pt-6">
        <Suspense fallback={<FilterButtonsSkeleton />}>
          <FilterButtons />
        </Suspense>
      </div>
      <div className="flex flex-col items-center pt-4 md:pt-0">
        <Suspense fallback={<LoadingDots className="mt-8" />}>
          <AssignmentsRenderer />
        </Suspense>
      </div>
      <DynamicRevalidation />
      <DateUpdater />
    </>
  );
}
