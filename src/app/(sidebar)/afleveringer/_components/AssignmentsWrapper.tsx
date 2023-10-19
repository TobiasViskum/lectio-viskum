"use client";

import { Fragment, useEffect, useState } from "react";
import { Assignment } from "./Assignment";
import { vEvent } from "@/lib/viskum/vEvent";

type Props = { strAssignments: string };

export function AssignmentsWrapper({ strAssignments }: Props) {
  let assignments: Assignment[] = JSON.parse(strAssignments);
  const [filter, setFilter] = useState<
    "all" | "submitted" | "pending" | "missing"
  >("pending");

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
        <div className="flex w-full flex-col items-center justify-center gap-y-1 pt-16 lg:items-start lg:gap-y-2 lg:pt-8">
          <p className="text-lg font-semibold text-muted-foreground">
            Ingen Opgaver
          </p>
          <p className="text-sm text-muted-foreground opacity-50">
            Der er ingen opgaver at vise. Godt klaret!
          </p>
        </div>
      )}
      {assignments.map((assignment, index) => {
        const addWeek = currWeek !== assignment.week;
        if (addWeek) {
          currWeek = assignment.week;
        }

        return (
          <Fragment key={assignment.id}>
            {addWeek && (
              <p className="w-full pb-2 pt-4 text-xl font-bold">
                Uge {assignment.week}
              </p>
            )}
            <Assignment addWeek={addWeek} assignment={assignment} />
          </Fragment>
        );
      })}
    </>
  );
}
