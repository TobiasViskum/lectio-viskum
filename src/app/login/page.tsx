import { LoadingSpinner } from "@/components/loading-components/LoadingSpinner";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Suspense } from "react";
import { SchoolList } from "./_compoennts/SchoolList";
import { SchoolSearch } from "./_compoennts/SchoolSearch";
import { lectioAPI } from "@/lib/lectio-api";

export default function LoginPage() {
  const allSchoolsPromise = lectioAPI.getAllSchools();

  return (
    <div className="grid place-items-center pt-8 gap-y-8 sm:gap-y-12">
      <h1 className="sm:text-4xl text-3xl leading-snug font-semibold flex flex-col [text-wrap:balance] text-center">Velkommen til et nyt og opgraderet Lectio!</h1>

      <div className="w-full flex items-center flex-col gap-y-4">
        <Label className="text-muted-foreground">Vælg din skole:</Label>
        <SchoolSearch />
        <ScrollArea className="h-[512px] max-h-[55svh] w-full max-w-lg relative flex flex-col items-center justify-center text-center pt-4">
          <Suspense fallback={<LoadingSpinner className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2" />}>
            <div className="w-full h-full grid place-items-center">
              <div className="h-full w-[calc(100%-32px)]">
                <SchoolList allSchoolsPromise={allSchoolsPromise} />
              </div>
            </div>
          </Suspense>
        </ScrollArea>
      </div>
    </div>
  );
}
