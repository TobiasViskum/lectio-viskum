import { getLectioProps } from "@/lib/auth/getLectioProps";
import { lectioAPI } from "@/lib/lectio-api";
import { ClassAndTeacher } from "./_components/ClassAndTeacher";
import { AssignmentDescription } from "./_components/AssignmentDescription";
import { AssignmentFiles } from "./_components/AssignmentFiles/AssignmentFiles";
import { AssignmentSubmits } from "./_components/AssignmentSubmits";
import { Suspense } from "react";
import { ClassAndTeacherSkeleton } from "./_components/ClassAndTeacher/ClassAndTeacherSkeleton";
import { AssignmentTitle } from "./_components/AssignmentTitle";
import { AssignmentTitleSkeleton } from "./_components/AssignmentTitle/AssignmentTitleSkeleton";
import { AssignmentDescriptionSkeleton } from "./_components/AssignmentDescription/AssignmentDescriptionSkeleton";
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

export default function AssignmentPage({ params, searchParams }: Props) {
  const assignmentId = params.ids;

  const lectioProps = getLectioProps();

  const assignmentPromise = lectioAPI.getAssignment.byHref({
    ...lectioProps,
    assignmentId: assignmentId,
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
    </>
  );
}
