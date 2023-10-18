"use client";

import { cn } from "@/lib/utils";
import { vEvent } from "@/lib/viskum/vEvent";
import { useRef, useState } from "react";

type Props = { strAssignments: string };
export function Buttons({ strAssignments }: Props) {
  let assignments: Assignment[] = JSON.parse(strAssignments);

  const [filter, setFilter] = useState<"all" | "submitted" | "pending" | "missing">("pending");
  const containerRef = useRef<HTMLDivElement | null>(null);

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
    "all": "bg-blue-500",
    "submitted": "bg-green-500",
    "pending": "bg-yellow-500",
    "missing": "bg-red-500",
  } as const;

  console.log(`translateX(${containerRef.current ? (containerRef.current.clientWidth / 4) * multi : 0})`);

  const totalAssignments = assignments.length;
  const submittedAssignments = assignments.filter((obj) => obj.status === "Afleveret").length;
  const pendingAssignments = assignments.filter((obj) => obj.status === "Venter").length;
  const missingAssignments = assignments.filter((obj) => obj.status === "Mangler").length;

  const linkTw = "transition-colors flex flex-col gap-y-1 items-center duration-500";

  function handleClick(newFilter: "all" | "submitted" | "pending" | "missing") {
    vEvent.dispatch("assignmentsFilter", { filter: newFilter });
    setFilter(newFilter);
  }

  return (
    <div className="relative grid grid-cols-4 text-center w-full max-w-sm text-sm" ref={containerRef}>
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
      <div
        className={cn("absolute -bottom-2 h-0.5 rounded-md transition-all duration-500", activeMap[filter])}
        style={{
          transform: `translateX(${containerRef.current ? (containerRef.current.clientWidth / 4) * multi : 0})`,
          width: containerRef.current ? containerRef.current.clientWidth / 4 : 0,
        }}
      />
    </div>
  );
}
