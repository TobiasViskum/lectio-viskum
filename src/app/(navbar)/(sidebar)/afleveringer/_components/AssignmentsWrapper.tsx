"use client";

import { Fragment, useEffect, useState } from "react";
import { Assignment } from "./Assignment";
import { vEvent } from "@/lib/viskum/vEvent";
import { H3 } from "@/components/ui/h3";
import { P } from "@/components/ui/p";

type Props = { strAssignments: string };

export function AssignmentsWrapper({ strAssignments }: Props) {
  let assignments: Assignment[] = JSON.parse(strAssignments);
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

  let currWeek = "-1";
  let wasEmpty = false;
  let currStudentTime = 0;

  if (filter === "submitted") {
    assignments = assignments.filter((obj) => obj.status === "Afleveret");
  } else if (filter === "pending") {
    assignments = assignments.filter((obj) => obj.status === "Venter");
  } else if (filter === "missing") {
    assignments = assignments.filter((obj) => obj.status === "Mangler");
  }

  if (assignments.length === 0) {
    wasEmpty = true;
  }

  if (search !== "") {
    assignments = assignments.filter((obj) => {
      const query = search.toLowerCase();

      const match1 = obj.title.toLowerCase().includes(query);
      const match2 = obj.subject.toLowerCase().includes(query);
      const match3 = obj.class.toLowerCase().includes(query);
      const match4 = [obj.subject, obj.class]
        .join(", ")
        .toLowerCase()
        .includes(query);
      return match1 || match2 || match3 || match4;
    });
  }

  return (
    <>
      {assignments.length === 0 && (
        <div className="flex w-full flex-col items-center justify-center gap-y-1 pt-16 text-center lg:items-start lg:gap-y-2 lg:pt-8">
          <p className="text-lg font-semibold text-muted-foreground">
            Ingen Opgaver
          </p>
          <p className="text-sm text-muted-foreground opacity-50">
            {search === "" || wasEmpty
              ? "Der er ingen opgaver at vise. Godt klaret!"
              : "Der var intet resultat"}
          </p>
        </div>
      )}
      {assignments.map((assignment) => {
        const addWeek = currWeek !== assignment.week;
        if (addWeek) {
          currStudentTime = 0;
          currWeek = assignment.week;
          for (let i = 0; i < assignments.length; i++) {
            const studentTime = Number(
              assignments[i].studentTime.split(",")[0],
            );
            if (assignments[i].week === currWeek && !isNaN(studentTime)) {
              currStudentTime += studentTime;
            }
          }
        }

        return (
          <Fragment key={assignment.id}>
            {addWeek && (
              <H3 className="flex w-full items-end justify-between pb-2 pr-2 pt-4  font-bold md:pr-8">
                <p>Uge {assignment.week}</p>
                <P>{currStudentTime} elevtimer</P>
              </H3>
            )}
            <Assignment addWeek={addWeek} assignment={assignment} />
          </Fragment>
        );
      })}
    </>
  );
}
