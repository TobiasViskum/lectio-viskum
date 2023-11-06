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
    <>
      <div className="grid place-items-center gap-y-8 pt-8 sm:gap-y-12">
        {/* <div className="before:bg-gradient-radial after:bg-gradient-conic absolute z-10 flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]" /> */}
        <h1 className="drop-shadow-glow-sm flex flex-col text-center text-3xl font-semibold leading-snug [text-wrap:balance] sm:text-4xl">
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
    </>
  );
}
