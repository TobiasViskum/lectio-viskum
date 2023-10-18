"use client";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { vEvent } from "@/lib/viskum/vEvent";
import { useEffect, useState } from "react";

export function AssignmentsSidebar() {
  const [filter, setFilter] = useState<"all" | "submitted" | "pending" | "missing">("pending");

  useEffect(() => {
    vEvent.listen("assignmentsFilter", (e) => {
      setFilter(e.detail.filter);
    });
  }, []);

  return (
    <>
      <h3>Filtrér:</h3>
      <div className="flex flex-col px-2 gap-y-4">
        <Badge variant={"outline"} className="p-2 flex gap-x-2 bg-red-400 bg-opacity-50">
          <Checkbox id="alle" />
          <Label htmlFor="alle">Alle</Label>
        </Badge>
      </div>
    </>
  );
}
