import { Label } from "@/components/ui/label";
import { getSchool } from "@/lib/scrapeFunctions";
import { Title } from "./_components/Title";
import { Suspense } from "react";
import { LoadingDots } from "@/components/loading-components/LoadingDots";
import { lectioAPI } from "@/lib/lectio-api";
import { Input } from "@/components/ui/input";

type Props = {
  params: {
    schoolCode: string;
  };
  searchParams: {
    name?: string;
  };
};

export default async function SchoolCodePage({ params, searchParams }: Props) {
  const promise = lectioAPI.getSchool({ schoolCode: params.schoolCode });

  return (
    <div className="grid place-items-center pt-8 gap-y-8 sm:gap-y-12">
      <Title schoolPromise={promise} name={searchParams.name} />

      <div className="w-full flex items-center flex-col gap-y-4">
        <Label className="text-muted-foreground">Log ind:</Label>

        <Input className="" type="password" />
      </div>
    </div>
  );
}
