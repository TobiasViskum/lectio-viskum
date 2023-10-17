import { AssignmentsRenderer } from "./_components/AssignmentsRenderer";
import { Suspense } from "react";
import { LoadingDots } from "@/components/loading-components/LoadingDots";
import { DynamicRevalidation } from "./_components/DynamicRevalidation";
import { FilterButtons } from "./_components/FilterButtons";
import { FilterButtonsSkeleton } from "./_components/FilterButtonsSkeleton";

export type AssignmentPageProps = { searchParams: { view?: string; search?: string } };

export default async function AssignmentsPage({ searchParams }: AssignmentPageProps) {
  return (
    <>
      <h1 className="text-4xl font-medium py-6">Afleveringer</h1>
      <Suspense fallback={<FilterButtonsSkeleton />}>
        <FilterButtons searchParams={searchParams} />
      </Suspense>
      <div className="flex flex-col items-center">
        <Suspense fallback={<LoadingDots className="mt-8" />}>
          <AssignmentsRenderer searchParams={searchParams} />
        </Suspense>
      </div>
      <DynamicRevalidation />
    </>
  );
}
