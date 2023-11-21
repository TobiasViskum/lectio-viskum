"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { H2 } from "@/components/ui/h2";
import { H3 } from "@/components/ui/h3";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { vEvent } from "@/lib/viskum/vEvent";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type Props = { strAssignments: string };

export function Content({ strAssignments }: Props) {
  const assignments: Assignment[] = JSON.parse(strAssignments);
  const path = usePathname();

  useEffect(() => {
    vEvent.dispatch("assignmentsFilter", { filter: "pending", search: "" });
  }, [path]);

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
    <div className="flex flex-col gap-y-6 px-1">
      <div className="flex flex-col gap-y-2">
        <H2>Søg</H2>
        <Input
          placeholder="Navn..."
          value={search}
          onChange={(e) => handleInput(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-y-4">
        <H2>Filtre</H2>
        <div className="flex flex-col gap-y-5 px-1">
          <div className="group flex w-full items-center justify-between">
            <div className="flex justify-center gap-x-2">
              <Checkbox
                id="all"
                checked={filter === "all"}
                onCheckedChange={() => handleClick("all")}
              />
              <Label htmlFor="all">Alle</Label>
            </div>
            <Label className="text-muted-foreground">
              ({totalAssignments})
            </Label>
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
    </div>
  );
}
