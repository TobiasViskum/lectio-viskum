"use client";

import { useEffect, useState } from "react";
import { Assignment } from "./Assignment";
import { vEvent } from "@/lib/viskum/vEvent";

type Props = { strAssignments: string };

export function AssignmentsWrapper({ strAssignments }: Props) {
  let assignments: Assignment[] = JSON.parse(strAssignments);
  const [filter, setFilter] = useState<"all" | "submitted" | "pending" | "missing">("pending");

  useEffect(() => {
    vEvent.listen("assignmentsFilter", (e) => {
      setFilter(e.detail.filter);
    });
  }, []);

  let currWeek = "-1";

  if (filter === "submitted") {
    assignments = assignments.filter((obj) => obj.status === "Afleveret");
  } else if (filter === "pending") {
    assignments = assignments.filter((obj) => obj.status === "Venter");
  } else if (filter === "missing") {
    assignments = assignments.filter((obj) => obj.status === "Mangler");
  }

  return (
    <>
      {assignments.length === 0 && (
        <div className="w-full pt-16 grid place-items-center gap-y-1">
          <p className="text-muted-foreground text-lg font-semibold">Ingen Opgaver</p>
          <p className="text-muted-foreground opacity-50 text-sm">Du mangler ikke nogen opgaver!</p>
        </div>
      )}
      {assignments.map((assignment, index) => {
        const addWeek = currWeek !== assignment.week;
        if (addWeek) {
          currWeek = assignment.week;
        }

        return (
          <>
            {addWeek && (
              <>
                <p key={index + 50} className="pt-4 font-bold text-xl w-full pb-2">
                  Uge {assignment.week}
                </p>
              </>
            )}
            <Assignment addWeek={addWeek} key={index} assignment={assignment} />
          </>
        );
      })}
    </>
  );
}
