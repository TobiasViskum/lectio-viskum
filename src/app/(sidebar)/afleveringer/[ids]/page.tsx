import { getCredentials } from "@/lib/auth/getCredentials";
import { lectioAPI } from "@/lib/lectio-api";
import Image from "next/image";
import Link from "next/link";
import { ClassAndTeacher } from "./_components/ClassAndTeacher";
import { AssignmentDescription } from "./_components/AssignmentDescription";

type Props = { params: { ids: string } };

export default async function AssignmentPage({ params }: Props) {
  const studentId = params.ids.split("-")[0];
  const assignmentId = params.ids.split("-")[1];
  const href = `ElevAflevering.aspx?elevid=${studentId}&exerciseid=${assignmentId}`;
  const credentials = getCredentials();
  const tag = `assignment-${assignmentId}-${credentials.username}`;
  const assignment = await lectioAPI.getAssignment.byHref({
    ...credentials,
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
        <div>
          <p>Vedhæftede filer:</p>
          <div>
            {assignment.documents.map((item, index) => {
              const key = `${item.href}-${item.name}`;
              return (
                <div key={key}>
                  <Link
                    className="text-sm text-muted-foreground "
                    href={item.href}
                  >
                    {item.name}
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
