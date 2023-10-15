"use client";

import { Separator } from "@/components/ui/separator";
import { optimisticAllSchools } from "@/lib/optimisticStates/all-schools";
import { cn } from "@/lib/utils";
import { vEvent } from "@/lib/viskum/vEvent";
import Link from "next/link";
import { useEffect, useState } from "react";
import { RetryButton } from "./RetryButton";
import { Button } from "@/components/ui/button";
import { lectioAPI } from "@/lib/lectio-api";
import { getAllSchools } from "../_actions/getAllSchools";
import { toast } from "sonner";

type Props = {
  allSchoolsPromise: Promise<School[] | null>;
};

export function SchoolList({ allSchoolsPromise }: Props) {
  const [allSchools, setAllSchools] = useState<School[] | null>(optimisticAllSchools);
  const [search, setSearch] = useState("");
  const [isRetrying, setIsRetrying] = useState(false);

  useEffect(() => {
    async function verifyAllSchools() {
      const schools = await allSchoolsPromise;
      if (schools === null) {
        toast.error("Der skete en fejl");
        setAllSchools(null);
      } else if (JSON.stringify(schools) !== JSON.stringify(optimisticAllSchools)) {
        setAllSchools(schools);
      }
    }
    verifyAllSchools();
  }, [allSchoolsPromise]);

  useEffect(() => {
    vEvent.listen("searchSchool", (e) => {
      setSearch(e.detail.searchString);
    });
  }, []);

  async function handleRetry() {
    setIsRetrying(true);
    const schools = await getAllSchools();
    setAllSchools(schools);
    setIsRetrying(false);
  }

  if (allSchools === null) {
    return (
      <div className="flex flex-col gap-y-6 items-center">
        <p className="pt-4 font-medium  text-red-400 text-sm">An error happened</p>
        <Button onClick={handleRetry} disabled={isRetrying} loading={isRetrying} className="w-18 grid place-items-center">
          {isRetrying ? "" : "Retry"}
        </Button>
      </div>
    );
  }

  const items = allSchools.filter((school) => school.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <>
      <h2 className="w-full text-left font-medium pb-4">Skoler</h2>
      {items.map((school, index) => {
        return (
          <Link href={{ pathname: `/log-ind/${school.schoolCode}`, query: { name: school.name } }} key={school.name} className={cn("w-full rounded-md flex flex-col items-center", index === items.length - 1 ? "mb-4" : "", school.name.length >= 35 ? "max-sm:pt-1" : "")}>
            <div className={cn("text-sm font-semibold text-left whitespace-nowrap pt-2 w-full hover:bg-accent rounded-md pl-2", school.name.length >= 35 ? "max-sm:text-xs" : "")}>
              {school.name}
              {index !== items.length ? <Separator className={cn("mt-2 w-[calc(100%-16px)]", school.name.length >= 35 ? "max-sm:mt-3" : "")} /> : null}
            </div>
          </Link>
        );
      })}
    </>
  );
}
