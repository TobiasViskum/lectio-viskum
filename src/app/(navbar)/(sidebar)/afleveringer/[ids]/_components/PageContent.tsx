import { Suspense } from "react";
import { setPageState } from "../page-state";
import { AssignmentTitleSkeleton } from "./AssignmentTitle/AssignmentTitleSkeleton";
import { AssignmentTitle } from "./AssignmentTitle";
import { ClassAndTeacherSkeleton } from "./ClassAndTeacher/ClassAndTeacherSkeleton";
import { ClassAndTeacher } from "./ClassAndTeacher";
import { AssignmentInfoSkeleton } from "./AssignmentInfo/AssignmentInfoSkeleton";
import { AssignmentInfo } from "./AssignmentInfo";
import { AssignmentDescriptionSkeleton } from "./AssignmentDescription/AssignmentDescriptionSkeleton";
import { AssignmentDescription } from "./AssignmentDescription";
import { AssignmentFilesSkeleton } from "./AssignmentFiles/AssignmentFilesSkeleton";
import { AssignmentFiles } from "./AssignmentFiles";
import { AssignmentSubmitsSkeleton } from "./AssignmentSubmits/AssignmentSubmitsSkeleton";
import { AssignmentSubmits } from "./AssignmentSubmits";

type Props = {
  params: { ids: string };
  searchParams: {
    title?: string;
    class?: string;
    subject?: string;
    dueTo?: string;
  };
};

export async function PageContent({ searchParams, params }: Props) {
  const assignmentId = params.ids;

  setPageState(assignmentId);

  return (
    <div className="flex flex-col gap-y-6 pt-6">
      {/* <Suspense
        fallback={<AssignmentTitleSkeleton title={searchParams.title} />}
      > */}
      <AssignmentTitle title={searchParams.title} />
      {/* </Suspense> */}
      <div className="flex flex-col gap-y-6">
        {/* <Suspense
          fallback={
            <ClassAndTeacherSkeleton
              schoolClass={searchParams.class}
              subject={searchParams.subject}
            />
          }
        > */}
        <ClassAndTeacher
          schoolClass={searchParams.class}
          subject={searchParams.subject}
        />
        {/* </Suspense> */}
        {/* <Suspense fallback={<AssignmentInfoSkeleton />}> */}
        <AssignmentInfo />
        {/* </Suspense> */}
        {/* <Suspense fallback={<AssignmentDescriptionSkeleton />}> */}
        <AssignmentDescription />
        {/* </Suspense> */}
        {/* <Suspense fallback={<AssignmentFilesSkeleton />}> */}
        <AssignmentFiles />
        {/* </Suspense> */}
        {/* <Suspense fallback={<AssignmentSubmitsSkeleton />}> */}
        <AssignmentSubmits />
        {/* </Suspense> */}
      </div>
    </div>
  );
}
