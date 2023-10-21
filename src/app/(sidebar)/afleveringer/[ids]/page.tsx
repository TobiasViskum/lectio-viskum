import { getLectioProps } from "@/lib/auth/getLectioProps";
import { lectioAPI } from "@/lib/lectio-api";
import Link from "next/link";
import { ClassAndTeacher } from "./_components/ClassAndTeacher";
import { AssignmentDescription } from "./_components/AssignmentDescription";
import { AssignmentFiles } from "./_components/AssignmentFiles";

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
      </div>
    </div>
  );
}
