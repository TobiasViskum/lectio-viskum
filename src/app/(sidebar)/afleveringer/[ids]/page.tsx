import { getLectioProps } from "@/lib/auth/getLectioProps";
import { lectioAPI } from "@/lib/lectio-api";
import Link from "next/link";
import { ClassAndTeacher } from "./_components/ClassAndTeacher";
import { AssignmentDescription } from "./_components/AssignmentDescription";
import { AssignmentFiles } from "./_components/AssignmentFiles";
import { getDate } from "../_util/getDate";
import { Fragment } from "react";
import { Separator } from "@/components/ui/separator";

type Props = { params: { ids: string } };

export default async function AssignmentPage({ params }: Props) {
  const studentId = params.ids.split("-")[0];
  const assignmentId = params.ids.split("-")[1];
  const href = `ElevAflevering.aspx?elevid=${studentId}&exerciseid=${assignmentId}`;
  const lectioProps = getLectioProps();
  const tag = `assignment-${assignmentId}-${lectioProps.username}`;
  const assignment = await lectioAPI.getAssignment.byHref({
    ...lectioProps,
    href: href,
    tag: tag,
  });

  if (assignment === null) {
    return <p className="text-red-500">Error</p>;
  }

  return (
    <div className="flex flex-col gap-y-6 pt-6">
      <h1 className="text-2xl font-bold md:text-3xl">{assignment.title}</h1>
      <div className="flex flex-col gap-y-6">
        <ClassAndTeacher assignment={assignment} />
        <AssignmentDescription assignment={assignment} />
        <AssignmentFiles strAssignment={JSON.stringify(assignment)} />
        <div className="flex flex-col gap-y-4">
          <p className="font-medium">Indlæg:</p>

          {assignment.submits.map((submit, index) => {
            const key = JSON.stringify(submit.time);
            const date = getDate(submit.time);
            const formattedDate = new Intl.DateTimeFormat("da-dk", {
              dateStyle: "medium",
              timeStyle: "short",
            }).format(date);

            if (index === 0) {
              return (
                <Fragment key={key}>
                  <div>
                    <p className="mb-2 text-sm text-muted-foreground">
                      Nyeste indlæg:
                    </p>
                    <div className="relative grid w-full rounded-md border text-sm">
                      <div className="grid grid-cols-[100px_1fr] bg-accent px-2">
                        <p className="text-lg font-semibold">Indlæg</p>
                        <p></p>
                      </div>
                      <Separator
                        className="absolute left-[98px] top-0"
                        orientation="vertical"
                      />
                      <div className="flex flex-col gap-y-1 py-1">
                        <div className="grid grid-cols-[100px_1fr] px-2">
                          <p className="font-semibold">Dato</p>
                          <p>{formattedDate}</p>
                        </div>
                        <Separator />
                        <div className="grid grid-cols-[100px_1fr] px-2">
                          <p className="font-semibold">Bruger</p>
                          <p>{submit.submitter}</p>
                        </div>
                        <Separator />
                        <div className="grid grid-cols-[100px_1fr] px-2">
                          <p className="font-semibold">Kommentar</p>
                          <p>{submit.comment}</p>
                        </div>
                        <Separator />
                        <div className="grid grid-cols-[100px_1fr] px-2">
                          <p className="font-semibold">Dokument</p>
                          <button className="text-left text-blue-400">
                            {submit.document.name}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {assignment.submits.length > 1 && (
                    <p className="text-sm text-muted-foreground">
                      Tidligere indlæg:
                    </p>
                  )}
                </Fragment>
              );
            } else {
              return <div key={key}>{formattedDate}</div>;
            }
          })}
        </div>
      </div>
    </div>
  );
}
