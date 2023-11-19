import { ClassAndTeacher } from "./_components/ClassAndTeacher";
import { AssignmentDescription } from "./_components/AssignmentDescription";
import { AssignmentFiles } from "./_components/AssignmentFiles";
import { AssignmentSubmits } from "./_components/AssignmentSubmits";
import { Suspense } from "react";
import { ClassAndTeacherSkeleton } from "./_components/ClassAndTeacher/ClassAndTeacherSkeleton";
import { AssignmentTitle } from "./_components/AssignmentTitle";
import { AssignmentTitleSkeleton } from "./_components/AssignmentTitle/AssignmentTitleSkeleton";
import { AssignmentDescriptionSkeleton } from "./_components/AssignmentDescription/AssignmentDescriptionSkeleton";
import { AssignmentInfo } from "./_components/AssignmentInfo";
import { AssignmentInfoSkeleton } from "./_components/AssignmentInfo/AssignmentInfoSkeleton";
import { AssignmentFilesSkeleton } from "./_components/AssignmentFiles/AssignmentFilesSkeleton";
import { AssignmentSubmitsSkeleton } from "./_components/AssignmentSubmits/AssignmentSubmitsSkeleton";
import { setPageState } from "./page-state";
import { UploadAssignment } from "./_components/UploadAssignment";

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

  setPageState(assignmentId);

  return (
    <div className="flex flex-col gap-y-6 pt-6">
      <Suspense
        fallback={<AssignmentTitleSkeleton title={searchParams.title} />}
      >
        <AssignmentTitle title={searchParams.title} />
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
          <ClassAndTeacher
            schoolClass={searchParams.class}
            subject={searchParams.subject}
          />
        </Suspense>
        <Suspense fallback={<AssignmentInfoSkeleton />}>
          <AssignmentInfo />
        </Suspense>
        <Suspense fallback={<AssignmentDescriptionSkeleton />}>
          <AssignmentDescription />
        </Suspense>
        <Suspense fallback={<AssignmentFilesSkeleton />}>
          <AssignmentFiles />
        </Suspense>
        <Suspense fallback={null}>
          <UploadAssignment />
        </Suspense>
        <Suspense fallback={<AssignmentSubmitsSkeleton />}>
          <AssignmentSubmits />
        </Suspense>
      </div>
    </div>
  );
}
