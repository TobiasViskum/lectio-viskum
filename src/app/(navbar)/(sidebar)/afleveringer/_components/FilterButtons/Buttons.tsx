"use client";

import { cn } from "@/lib/utils";
import { vEvent } from "@/lib/viskum/vEvent";
import { useEffect, useState } from "react";
import { FilterButtonsSkeleton } from "./FilterButtonsSkeleton";

type Props = { strAssignments: string };
export function Buttons({ strAssignments }: Props) {
  let assignments: Assignment[] | null = JSON.parse(strAssignments);

  useEffect(() => {
    vEvent.listen("assignmentsFilter", (e) => {
      setFilter(e.detail.filter);
    });
  }, []);

  const [filter, setFilter] = useState<
    "all" | "submitted" | "pending" | "missing"
  >("pending");

  if (assignments === null) return <FilterButtonsSkeleton />;

  let multi = 2;
  if (filter === "all") {
    multi = 0;
  } else if (filter === "submitted") {
    multi = 1;
  } else if (filter === "pending") {
    multi = 2;
  } else if (filter === "missing") {
    multi = 3;
  }
  const activeMap = {
    all: "bg-blue-500 translate-x-0",
    submitted: "bg-green-500 translate-x-full",
    pending: "bg-yellow-500 translate-x-[200%]",
    missing: "bg-red-500 translate-x-[300%]",
  } as const;

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

  const linkTw =
    "transition-colors flex flex-col gap-y-1 items-center duration-300";
  const countTw = "text-xs h-6 w-6 p-1 rounded-full bg-zinc-500 bg-opacity-5";

  function handleClick(newFilter: "all" | "submitted" | "pending" | "missing") {
    vEvent.dispatch("assignmentsFilter", { filter: newFilter, search: "" });
  }

  return (
    <div className="relative grid w-full min-w-[256px] max-w-sm grid-cols-4 text-center text-sm">
      <button
        onClick={() => handleClick("all")}
        className={cn(
          linkTw,
          filter === "all" ? "text-blue-500" : "text-muted-foreground",
        )}
      >
        <p
          className={cn(
            countTw,
            filter === "all" && activeMap[filter].split(" ")[0],
          )}
        >
          {totalAssignments}
        </p>
        <p>Alle</p>
      </button>
      <button
        onClick={() => handleClick("submitted")}
        className={cn(
          linkTw,
          filter === "submitted" ? "text-green-500" : "text-muted-foreground",
        )}
      >
        <p
          className={cn(
            countTw,
            filter === "submitted" && activeMap[filter].split(" ")[0],
          )}
        >
          {submittedAssignments}
        </p>
        <p>Afleveret</p>
      </button>
      <button
        onClick={() => handleClick("pending")}
        className={cn(
          linkTw,
          filter === "pending" ? "text-yellow-500" : "text-muted-foreground",
        )}
      >
        <p
          className={cn(
            countTw,
            filter === "pending" && activeMap[filter].split(" ")[0],
          )}
        >
          {pendingAssignments}
        </p>
        <p>Venter</p>
      </button>
      <button
        onClick={() => handleClick("missing")}
        className={cn(
          linkTw,
          filter === "missing" ? "text-red-500" : "text-muted-foreground",
        )}
      >
        <p
          className={cn(
            countTw,
            filter === "missing" && activeMap[filter].split(" ")[0],
          )}
        >
          {missingAssignments}
        </p>
        <p>Mangler</p>
      </button>
      <div
        className={cn(
          "absolute -bottom-2 h-0.5 w-1/4 rounded-md transition-all duration-300",
          activeMap[filter],
        )}
      />
    </div>
  );
}
