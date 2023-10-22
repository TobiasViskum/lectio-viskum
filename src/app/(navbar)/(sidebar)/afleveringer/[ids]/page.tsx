import { getLectioProps } from "@/lib/auth/getLectioProps";
import { lectioAPI } from "@/lib/lectio-api";
import { ClassAndTeacher } from "./_components/ClassAndTeacher";
import { AssignmentDescription } from "./_components/AssignmentDescription";
import { AssignmentFiles } from "./_components/AssignmentFiles/AssignmentFiles";
import { AssignmentSubmits } from "./_components/AssignmentSubmits";
import { DynamicRevalidation } from "./_components/DynamicRevalidation";
import Link from "next/link";
import { Suspense } from "react";
import { ClassAndTeacherSkeleton } from "./_components/ClassAndTeacher/ClassAndTeacherSkeleton";
import { AssignmentTitle } from "./_components/AssignmentTitle";
import { AssignmentTitleSkeleton } from "./_components/AssignmentTitle/AssignmentTitleSkeleton";
import { AssignmentDescriptionSkeleton } from "./_components/AssignmentDescription/AssignmentDescriptionSkeleton";
import { Separator } from "@/components/ui/separator";
import { AssignmentInfo } from "./_components/AssignmentInfo";

type Props = {
  params: { ids: string };
  searchParams: {
    title?: string;
    class?: string;
    subject?: string;
    dueTo?: string;
  };
};

export default async function AssignmentPage({ params, searchParams }: Props) {
  const studentId = params.ids.split("-")[0];
  const assignmentId = params.ids.split("-")[1];
  const href = `ElevAflevering.aspx?elevid=${studentId}&exerciseid=${assignmentId}`;
  const lectioProps = getLectioProps();
  const tag = `assignment-${assignmentId}-${lectioProps.username}`;
  const assignmentPromise = lectioAPI.getAssignment.byHref({
    ...lectioProps,
    href: href,
    tag: tag,
  });

  return (
    <>
      <div className="flex flex-col gap-y-6 pt-6">
        <Suspense
          fallback={<AssignmentTitleSkeleton title={searchParams.title} />}
        >
          <AssignmentTitle assignmentPromise={assignmentPromise} />
        </Suspense>
        <div className="flex flex-col gap-y-6">
          <Suspense
            fallback={
              <ClassAndTeacherSkeleton
                schoolClass={searchParams.class}
                subject={searchParams.subject}
              />
            }
          >
            <ClassAndTeacher assignmentPromise={assignmentPromise} />
          </Suspense>
          <Suspense>
            <AssignmentInfo assignmentPromise={assignmentPromise} />
          </Suspense>
          <Suspense fallback={<AssignmentDescriptionSkeleton />}>
            <AssignmentDescription assignmentPromise={assignmentPromise} />
          </Suspense>
          <Suspense>
            <AssignmentFiles assignmentPromise={assignmentPromise} />
          </Suspense>
          <Suspense>
            <AssignmentSubmits assignmentPromise={assignmentPromise} />
          </Suspense>
        </div>
      </div>
      <DynamicRevalidation ids={params.ids} />
    </>
  );
}
