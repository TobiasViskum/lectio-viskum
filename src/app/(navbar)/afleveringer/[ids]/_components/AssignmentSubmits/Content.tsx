import { Badge } from "@/components/ui/badge";
import { Submit } from "../Submit";
import { Fragment } from "react";
import { Separator } from "@/components/ui/separator";
import { getDate } from "../../../../../../util/schedule/getDate";
import Link from "next/link";

export function Content({ assignment }: { assignment: FullAssignment }) {
  const studentSubmits = assignment.submits.filter(
    (obj) => "studentId" in obj.submitter,
  );
  const teacherSubmits = assignment.submits.filter(
    (obj) => "teacherId" in obj.submitter,
  );

  return (
    <div className="flex max-w-3xl flex-col gap-y-8">
      {teacherSubmits.length > 0 && (
        <div className="flex flex-col gap-y-3">
          <Badge
            variant={"secondary"}
            className="w-max px-1 text-sm font-medium text-muted-foreground"
          >
            Feedback
          </Badge>
          {teacherSubmits.map((submit) => {
            const key = JSON.stringify(submit.time);
            return <Submit key={key} submit={submit} />;
          })}
        </div>
      )}
      {studentSubmits.length > 0 && (
        <div className="flex flex-col gap-y-4">
          <Badge
            variant={"secondary"}
            className="w-max px-1 text-sm font-medium text-muted-foreground"
          >
            Elevbesvarelser
          </Badge>
          <Submit submit={studentSubmits[0]} />
          {studentSubmits.length > 1 && (
            <div className="pt-2">
              <p className="pb-4 text-sm">
                {studentSubmits.length > 2
                  ? "TIDLIGERE BESVARELSER:"
                  : "TIDLIGERE BESVARELSE:"}
              </p>
              <div className="flex flex-col gap-y-4">
                {studentSubmits.map((submit, i) => {
                  if (i < 1) return null;

                  const addSeparator = i !== studentSubmits.length - 1;

                  const key = JSON.stringify(submit.time);
                  const date = new Date(submit.time);
                  const formattedDate = new Intl.DateTimeFormat("da-dk", {
                    dateStyle: "long",
                    timeStyle: "short",
                  }).format(date);

                  return (
                    <Fragment key={key + i}>
                      <div>
                        <p className="text-xs text-muted-foreground">
                          {formattedDate}
                        </p>
                        <button
                          data-lectio-href={submit.document.href}
                          className="link text-sm"
                        >
                          {submit.document.name}
                        </button>
                        {submit.comment !== "" && (
                          <div className="pt-1">
                            <p className="text-sm">Note:</p>
                            <p className="text-sm text-muted-foreground">
                              {submit.comment}
                            </p>
                          </div>
                        )}
                      </div>
                      {addSeparator && <Separator className="" />}
                    </Fragment>
                  );
                })}
              </div>
            </div>
          )}

          {/* {studentSubmits.map((submit, i) => {
            const key = JSON.stringify(submit.time);
            const addSeparator = i !== studentSubmits.length - 1;

            return (
              <Fragment key={key}>
                <Submit submit={submit} />
                {addSeparator && <Separator />}
              </Fragment>
            );
          })} */}
        </div>
      )}
    </div>
  );
}
