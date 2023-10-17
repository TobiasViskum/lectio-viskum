import { getCredentials } from "@/lib/auth/getCredentials";
import { lectioAPI } from "@/lib/lectio-api";
import { Assignment } from "./Assignment";
import { AssignmentPageProps } from "../page";

export async function AssignmentsRenderer({ searchParams }: AssignmentPageProps) {
  const credentials = getCredentials();

  const tag = `assignments-${credentials.username}`;
  const assignments = await lectioAPI.getAssignments({ ...credentials, tag: tag });

  if (assignments === null) {
    return <p className="text-red-400">An error happened</p>;
  }
  let currWeek = "-1";

  return (
    <>
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
