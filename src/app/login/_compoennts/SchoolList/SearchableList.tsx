"use client";

import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { vEvent } from "@/lib/viskum/vEvent";
import Link from "next/link";
import { useEffect, useState } from "react";

export function SearchableList({ strSchools }: { strSchools: string }) {
  const schools = JSON.parse(strSchools) as School[];

  const [search, setSearch] = useState("");

  useEffect(() => {
    vEvent.listen("searchSchool", (e) => {
      setSearch(e.detail.searchString);
    });
  }, []);

  const items = schools.filter((school) => school.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <>
      <h2 className="w-full text-left font-medium pb-4">Skoler</h2>
      {items.map((school, index) => {
        return (
          <Link href={`/login/${school.schoolCode}`} key={school.name} className={cn("w-full rounded-md flex flex-col items-center", index === items.length - 1 ? "mb-4" : "")}>
            <div className="text-sm font-semibold text-left whitespace-nowrap pt-2 w-full hover:bg-accent rounded-md pl-2">
              {school.name}
              {index !== items.length ? <Separator className="w-[calc(100%-16px)] mt-2" /> : null}
            </div>
          </Link>
        );
      })}
    </>
  );
}
