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
    <div className="grid place-items-center gap-y-8 pt-8 sm:gap-y-12">
      <h1 className="flex flex-col text-center text-3xl font-semibold leading-snug [text-wrap:balance] sm:text-4xl">
        Velkommen til et nyt og opgraderet Lectio!
      </h1>

      <div className="flex w-full flex-col items-center gap-y-4">
        <Label className="text-muted-foreground">Vælg din skole:</Label>
        <SchoolSearch />
        <ScrollArea className="relative flex h-[512px] max-h-[55svh] w-full max-w-lg flex-col items-center justify-center pt-4 text-center">
          <Suspense
            fallback={
              <LoadingSpinner className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2" />
            }
          >
            <div className="grid h-full w-full place-items-center">
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
