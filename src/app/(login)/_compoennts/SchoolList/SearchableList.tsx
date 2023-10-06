"use client";

import { Separator } from "@/components/ui/separator";
import { vEvent } from "@/lib/viskum/vEvent";
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
      {items.map((school, index) => {
        return (
          <>
            <div key={school.name} className="text-sm font-semibold">
              {school.name}
            </div>
            {items.length !== 1 ? <Separator className="my-2" /> : null}
          </>
        );
      })}
    </>
  );
}
