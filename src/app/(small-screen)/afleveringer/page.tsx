import { Badge } from "@/components/ui/badge";
import { AssignmentsRenderer } from "./_components/AssignmentsRenderer";
import { Suspense } from "react";
import { LoadingDots } from "@/components/loading-components/LoadingDots";
import Link from "next/link";
import { DynamicRevalidation } from "./_components/DynamicRevalidation";

export type AssignmentPageProps = { searchParams: { view?: string; search?: string } };

export default async function AssignmentsPage({ searchParams }: AssignmentPageProps) {
  return (
    <>
      <h1 className="text-4xl font-medium py-6">Afleveringer</h1>
      <div>
        <Link href="?view=alle">
          <Badge className="py-1.5 px-4">Alle</Badge>
        </Link>
        <Link href="?view=afleveret">
          <Badge className="py-1.5 px-4">Afleveret</Badge>
        </Link>
        <Link href="?view=venter">
          <Badge className="py-1.5 px-4">Venter</Badge>
        </Link>
        <Link href="?view=mangler">
          <Badge className="py-1.5 px-4">Mangler</Badge>
        </Link>
      </div>
      <div className="flex flex-col items-center">
        <Suspense fallback={<LoadingDots className="mt-8" />}>
          <AssignmentsRenderer searchParams={searchParams} />
        </Suspense>
      </div>
      <DynamicRevalidation />
    </>
  );
}
