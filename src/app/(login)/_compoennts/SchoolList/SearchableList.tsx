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

  return (
    <>
      {schools.map((school, index) => {
        if (search === "") {
          return (
            <>
              <div key={school.name} className="text-sm font-semibold">
                {school.name}
              </div>
              <Separator className="my-2" />
            </>
          );
        } else if (school.name.toLowerCase().includes(search.toLowerCase())) {
          return (
            <>
              <div key={school.name} className="text-sm font-semibold">
                {school.name}
              </div>
              <Separator className="my-2" />
            </>
          );
        }
      })}
    </>
  );
}
