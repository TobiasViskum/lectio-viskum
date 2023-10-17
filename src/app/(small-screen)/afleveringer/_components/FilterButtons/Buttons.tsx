"use client";

import { cn } from "@/lib/utils";
import { vEvent } from "@/lib/viskum/vEvent";
import { useState } from "react";

type Props = { strAssignments: string };
export function Buttons({ strAssignments }: Props) {
  let assignments: Assignment[] = JSON.parse(strAssignments);

  const [filter, setFilter] = useState<"all" | "submitted" | "pending" | "missing">("pending");

  const translateXMap = {
    "all": "translate-x-0 bg-blue-500",
    "submitted": "translate-x-20 bg-green-500",
    "pending": "translate-x-40 bg-yellow-500",
    "missing": "translate-x-60 bg-red-500",
  } as const;

  const totalAssignments = assignments.length;
  const submittedAssignments = assignments.filter((obj) => obj.status === "Afleveret").length;
  const pendingAssignments = assignments.filter((obj) => obj.status === "Venter").length;
  const missingAssignments = assignments.filter((obj) => obj.status === "Mangler").length;

  const linkTw = "transition-colors flex flex-col gap-y-1 items-center";

  function handleClick(newFilter: "all" | "submitted" | "pending" | "missing") {
    vEvent.dispatch("assignmentsFilter", { filter: newFilter });
    setFilter(newFilter);
  }

  return (
    <div className="relative grid grid-cols-4 text-center w-80 text-sm">
      <button onClick={() => handleClick("all")} className={cn(linkTw, filter === "all" ? "text-blue-500" : "text-muted-foreground")}>
        <p className="text-xs">{totalAssignments}</p>
        <p>Alle</p>
      </button>
      <button onClick={() => handleClick("submitted")} className={cn(linkTw, filter === "submitted" ? "text-green-500" : "text-muted-foreground")}>
        <p className="text-xs">{submittedAssignments}</p>
        <p>Afleveret</p>
      </button>
      <button onClick={() => handleClick("pending")} className={cn(linkTw, filter === "pending" ? "text-yellow-500" : "text-muted-foreground")}>
        <p className="text-xs">{pendingAssignments}</p>
        <p>Venter</p>
      </button>
      <button onClick={() => handleClick("missing")} className={cn(linkTw, filter === "missing" ? "text-red-500" : "text-muted-foreground")}>
        <p className="text-xs">{missingAssignments}</p>
        <p>Mangler</p>
      </button>
      <div className={cn("absolute -bottom-2 h-0.5 rounded-md w-20 transition-all", translateXMap[filter])} />
    </div>
  );
}
