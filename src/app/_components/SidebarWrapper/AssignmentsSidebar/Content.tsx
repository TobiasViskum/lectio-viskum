"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { vEvent } from "@/lib/viskum/vEvent";
import { useEffect, useState } from "react";

type Props = { strAssignments: string };

export function Content({ strAssignments }: Props) {
  const assignments: Assignment[] = JSON.parse(strAssignments);

  const [filter, setFilter] = useState<
    "all" | "submitted" | "pending" | "missing"
  >("pending");
  const [search, setSearch] = useState("");

  useEffect(() => {
    vEvent.listen("assignmentsFilter", (e) => {
      setFilter(e.detail.filter);
      setSearch(e.detail.search);
    });
  }, []);

  function handleClick(newFilter: typeof filter) {
    vEvent.dispatch("assignmentsFilter", { filter: newFilter, search: search });
  }
  function handleInput(newValue: string) {
    vEvent.dispatch("assignmentsFilter", { filter: filter, search: newValue });
  }

  if (assignments === null) return <p>Error</p>;

  const totalAssignments = assignments.length;
  const submittedAssignments = assignments.filter(
    (obj) => obj.status === "Afleveret",
  ).length;
  const pendingAssignments = assignments.filter(
    (obj) => obj.status === "Venter",
  ).length;
  const missingAssignments = assignments.filter(
    (obj) => obj.status === "Mangler",
  ).length;

  return (
    <div className="flex flex-col gap-y-6">
      <div className="flex flex-col gap-y-2">
        <h3 className="text-muted-foreground">Filtre:</h3>
        <Input
          placeholder="Search..."
          value={search}
          onChange={(e) => handleInput(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-y-5 px-2">
        <div className="group flex w-full items-center justify-between">
          <div className="flex justify-center gap-x-2">
            <Checkbox
              id="all"
              checked={filter === "all"}
              onCheckedChange={() => handleClick("all")}
            />
            <Label htmlFor="all">Alle</Label>
          </div>
          <Label className="text-muted-foreground">({totalAssignments})</Label>
        </div>
        <div className="flex w-full items-center justify-between">
          <div className="flex justify-center gap-x-2">
            <Checkbox
              id="submitted"
              checked={filter === "submitted"}
              onCheckedChange={() => handleClick("submitted")}
            />
            <Label htmlFor="submitted">Afleveret</Label>
          </div>
          <Label className="text-muted-foreground">
            ({submittedAssignments})
          </Label>
        </div>

        <div className="flex w-full items-center justify-between">
          <div className="flex justify-center gap-x-2">
            <Checkbox
              id="pending"
              checked={filter === "pending"}
              onCheckedChange={() => handleClick("pending")}
            />
            <Label htmlFor="pending">Venter</Label>
          </div>
          <Label className="text-muted-foreground">
            ({pendingAssignments})
          </Label>
        </div>

        <div className="flex w-full items-center justify-between">
          <div className="flex justify-center gap-x-2">
            <Checkbox
              id="missing"
              checked={filter === "missing"}
              onCheckedChange={() => handleClick("missing")}
            />
            <Label htmlFor="missing">Mangler</Label>
          </div>
          <Label className="text-muted-foreground">
            ({missingAssignments})
          </Label>
        </div>
      </div>
    </div>
  );
}
