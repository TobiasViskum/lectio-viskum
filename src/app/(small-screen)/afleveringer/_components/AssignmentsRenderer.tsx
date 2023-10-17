import { getCredentials } from "@/lib/auth/getCredentials";
import { lectioAPI } from "@/lib/lectio-api";
import { Assignment } from "./Assignment";
import { AssignmentPageProps } from "../page";
import { z } from "zod";

export async function AssignmentsRenderer({ searchParams }: AssignmentPageProps) {
  let view: "alle" | "afleveret" | "venter" | "mangler" = "alle";
  try {
    view = z.enum(["alle", "afleveret", "venter", "mangler"]).parse(searchParams.view);
  } catch {}

  const credentials = getCredentials();
  const tag = `assignments-${credentials.username}`;
  let assignments = await lectioAPI.getAssignments({ ...credentials, tag: tag });

  if (assignments === null) {
    return <p className="text-red-400">An error happened</p>;
  }
  let currWeek = "-1";

  if (view === "afleveret") {
    assignments = assignments.filter((obj) => obj.status === "Afleveret");
  } else if (view === "venter") {
    assignments = assignments.filter((obj) => obj.status === "Venter");
  } else if (view === "mangler") {
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
