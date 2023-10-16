import { getCredentials } from "@/lib/auth/getCredentials";
import { lectioAPI } from "@/lib/lectio-api";
import { redirect } from "next/navigation";

export default async function AssignmentsPage() {
  const credentials = getCredentials();

  const assignments = await lectioAPI.getAssignments(credentials);

  if (assignments === null) {
    redirect("/");
  }

  let currWeek = "0";
  return (
    <>
      <h1 className="text-4xl">Afleveringer</h1>
      <div>
        {assignments.map((assignment, index) => {
          const addWeek = currWeek !== assignment.week;
          if (addWeek) {
            currWeek = assignment.week;
          }
          function getDate() {
            const splitDueTo = assignment.dueTo.split("-");
            const splitDayMonth = splitDueTo[0].split("/");
            const day = Number(splitDayMonth[0]);
            const month = Number(splitDayMonth[1]) - 1;
            const splitYearTime = splitDueTo[1].split(" ");
            const year = Number(splitYearTime[0]);

            const splitHoursMinutes = splitYearTime[1].split(":");
            const hours = Number(splitHoursMinutes[0]);
            const minutes = Number(splitHoursMinutes[1]);

            return new Date(year, month, day, hours, minutes);
          }
          const date = getDate();

          const formattedDate = new Intl.DateTimeFormat("da-dk", { dateStyle: "long", timeStyle: "short" }).format(date);

          return (
            <>
              {addWeek && <p className="pt-4 font-bold text-xl">Uge {assignment.week}</p>}
              <div className="flex border-y">
                <div className="w-1 rounded-lg h-full bg-red-400" />
                <div>
                  <p className="text-muted-foreground opacity-75 text-sm">
                    {[assignment.subject, ", "].join("")}
                    {assignment.class}
                  </p>
                  <p className="font-medium">{assignment.title}</p>
                  <p className="text-muted-foreground opacity-75 text-sm">{formattedDate}</p>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}
