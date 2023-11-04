import { AssignmentsRenderer } from "./_components/AssignmentsRenderer";
import { Suspense } from "react";
import { LoadingDots } from "@/components/loading-components/LoadingDots";
import { FilterButtons } from "./_components/FilterButtons/FilterButtons";
import { FilterButtonsSkeleton } from "./_components/FilterButtons/FilterButtonsSkeleton";
import { getLectioProps } from "@/lib/auth/getLectioProps";
import { lectioAPI } from "@/lib/lectio-api";

export default function AssignmentsPage() {
  const lectioProps = getLectioProps();
  const assignmentsPromise = lectioAPI.getAssignment.all({
    ...lectioProps,
  });

  return (
    <>
      <h1 className="pt-6 text-4xl font-medium max-md:pl-4">Afleveringer</h1>
      <div className="sticky top-12 z-40 block bg-black bg-opacity-50 pb-4 pt-6 backdrop-blur-sm md:hidden ">
        <Suspense fallback={<FilterButtonsSkeleton />}>
          <FilterButtons assignmentsPromise={assignmentsPromise} />
        </Suspense>
      </div>
      <div className="flex flex-col items-center md:pt-0">
        <Suspense fallback={<LoadingDots className="mt-8" />}>
          <AssignmentsRenderer assignmentsPromise={assignmentsPromise} />
        </Suspense>
      </div>
    </>
  );
}
