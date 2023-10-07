import { Label } from "@/components/ui/label";
import { getSchool } from "@/lib/scrapeFunctions";
import { Title } from "./_components/Title";
import { Suspense } from "react";
import { LoadingDots } from "@/components/loading-components/LoadingDots";

type Props = {
  params: {
    schoolCode: string;
  };
  searchParams: {
    name?: string;
  };
};

function TitleSkeleton() {
  return (
    <>
      <div className="sm:h-10 h-9 text-4xl flex items-center">
        <LoadingDots />
      </div>
    </>
  );
}

export default async function SchoolCodePage({ params, searchParams }: Props) {
  // const schoolPromise = getSchool({ schoolCode: params.schoolCode });

  return (
    <div className="grid place-items-center pt-8 gap-y-8 sm:gap-y-12">
      <Suspense fallback={<TitleSkeleton />}>
        {/* <Title name={searchParams.name} schoolPromise={schoolPromise} /> */}
        {searchParams.name}
      </Suspense>

      <div className="w-full flex items-center flex-col gap-y-4">
        <Label className="text-muted-foreground">Log ind:</Label>
      </div>
    </div>
  );
}
