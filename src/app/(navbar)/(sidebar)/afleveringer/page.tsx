import { AssignmentsRenderer } from "./_components/AssignmentsRenderer";
import { Suspense } from "react";
import { LoadingDots } from "@/components/loading-components/LoadingDots";
import { FilterButtons } from "./_components/FilterButtons/FilterButtons";
import { FilterButtonsSkeleton } from "./_components/FilterButtons/FilterButtonsSkeleton";
import { getLectioProps } from "@/lib/auth/getLectioProps";
import { lectioAPI } from "@/lib/lectio-api";

export default async function AssignmentsPage() {
  const lectioProps = getLectioProps();
  const assignmentsPromise = lectioAPI.getAssignment.all({
    ...lectioProps,
  });

  return (
    <>
      <h1 className="pt-6 text-4xl font-medium max-md:pl-4">Afleveringer</h1>
      <div className="block pt-6 md:hidden">
        <Suspense fallback={<FilterButtonsSkeleton />}>
          <FilterButtons assignmentsPromise={assignmentsPromise} />
        </Suspense>
      </div>
      <div className="flex flex-col items-center pt-4 md:pt-0">
        <Suspense fallback={<LoadingDots className="mt-8" />}>
          <AssignmentsRenderer assignmentsPromise={assignmentsPromise} />
        </Suspense>
      </div>
    </>
  );
}
