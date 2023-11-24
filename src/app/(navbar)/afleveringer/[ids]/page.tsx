import { ClassAndTeacher } from "./_components/ClassAndTeacher";
import { AssignmentDescription } from "./_components/AssignmentDescription";
import { AssignmentFiles } from "./_components/AssignmentFiles";
import { AssignmentSubmits } from "./_components/AssignmentSubmits";
import { Fragment, Suspense } from "react";
import { ClassAndTeacherSkeleton } from "./_components/ClassAndTeacher/ClassAndTeacherSkeleton";
import { AssignmentTitle } from "./_components/AssignmentTitle";
import { AssignmentTitleSkeleton } from "./_components/AssignmentTitle/AssignmentTitleSkeleton";
import { AssignmentDescriptionSkeleton } from "./_components/AssignmentDescription/AssignmentDescriptionSkeleton";
import { AssignmentInfo } from "./_components/AssignmentInfo";
import { AssignmentInfoSkeleton } from "./_components/AssignmentInfo/AssignmentInfoSkeleton";
import { AssignmentFilesSkeleton } from "./_components/AssignmentFiles/AssignmentFilesSkeleton";
import { AssignmentSubmitsSkeleton } from "./_components/AssignmentSubmits/AssignmentSubmitsSkeleton";
import { getPageState, setPageState } from "./page-state";
import { UploadAssignment } from "./_components/UploadAssignment";
import { UploadAssignmentSkeleton } from "./_components/UploadAssignment/UploadAssignmentSkeleton";
import { SidebarWrapper } from "@/app/_components/SidebarWrapper";
import { AssignmentSidebar } from "@/app/_components/SidebarWrapper/AssignmentSidebar";
import { H1 } from "@/components/ui/h1";
import { File } from "lucide-react";
import Link from "next/link";
import { getDate } from "../../../../util/schedule/getDate";
import { urlify } from "@/util/urlify";
import { Teacher } from "@/components/global/Teacher";
import { Student } from "@/components/global/Student";
import { H3 } from "@/components/ui/h3";
import { H2 } from "@/components/ui/h2";
import { P } from "@/components/ui/p";
import Image from "next/image";
import { sub } from "date-fns";
import { DrawingPinFilledIcon } from "@radix-ui/react-icons";
import { Separator } from "@/components/ui/separator";
import { SubmitItem } from "./_components/Submit/SubmitItem";
import { PreviousSubmitsWrapper } from "./_components/Submit/PreviousSubmitsWrapper";

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
  const assignmentId = params.ids;

  setPageState(assignmentId);

  const pageState = getPageState();
  let assignment = await pageState.assignment;
  if (assignment === null) assignment = await pageState.cachedAssignment;
  if (assignment === null) return <p>Error</p>;

  const formattedDate = new Intl.DateTimeFormat("da-dk", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(new Date(assignment.dueTo));
  const isAssignmentDue =
    new Date(assignment.dueTo).getTime() - new Date().getTime() < 0;

  const studentSubmits = assignment.submits.filter(
    (obj) => "studentId" in obj.submitter,
  );
  const teacherSubmits = assignment.submits.filter(
    (obj) => "teacherId" in obj.submitter,
  );

  return (
    <SidebarWrapper component={<AssignmentSidebar />}>
      <div className="space-y-6">
        {/* <Suspense
          fallback={<AssignmentTitleSkeleton title={searchParams.title} />}
        >
          <AssignmentTitle title={searchParams.title} />
        </Suspense> */}
        <H1>{assignment.title}</H1>
        <div className="grid max-w-2xl grid-cols-2 gap-y-6 text-xs xs:text-sm">
          <div className="border-l border-l-foreground pl-2 text-muted-foreground opacity-80">
            <div className="font-bold text-foreground">Klasse:</div>
            <div className="">{assignment.class}</div>
          </div>
          <div className="border-l border-l-foreground pl-2 text-muted-foreground opacity-80">
            <div className="font-bold text-foreground">Frist:</div>
            <div className="">{formattedDate}</div>
          </div>
          <div className="border-l border-l-foreground pl-2 text-muted-foreground opacity-80">
            <div className="font-bold text-foreground">Status:</div>
            <div className="">{assignment.status}</div>
          </div>
          <div className="border-l border-l-foreground pl-2 text-muted-foreground opacity-80">
            <div className="font-bold text-foreground">Fravær:</div>
            <div className="">
              {isAssignmentDue ? assignment.absence : "0%"}
            </div>
          </div>
          <div className="border-l border-l-foreground pl-2 text-muted-foreground opacity-80">
            <div className="font-bold text-foreground">Afventer:</div>
            <div className="">{assignment.awaiter}</div>
          </div>
          <div className="border-l border-l-foreground pl-2 text-muted-foreground opacity-80">
            <div className="font-bold text-foreground">Karakterskala:</div>
            <div className="">{assignment.gradeSystem}</div>
          </div>
        </div>

        <div className="space-y-6 sm:space-y-10">
          {/* <Suspense
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
          </Suspense> */}
          {/* <div className="space-y-2">
            <H2>Deltagere</H2>
            <div>
              <H3>Lærer:</H3>
              <div className="w-fit">
                <Teacher teacher={assignment.teacher} />
              </div>
            </div>
            <div>
              <H3>Elever</H3>
              <div className="w-fit">
                {assignment.students.map((student) => {
                  return <Student student={student} key={student.studentId} />;
                })}
              </div>
            </div>
          </div> */}
          <div className="md:hidden">
            <H2>Deltagere</H2>
            <div className="pb-6 pt-2">
              <P className="border-l border-l-foreground pl-2 text-sm">
                {assignment.teacher.name} ({assignment.teacher.initials})
              </P>
            </div>
            <div className="space-y-2">
              {assignment.students.map((student) => {
                return (
                  <P
                    key={student.studentId}
                    className="border-l border-l-foreground pl-2 text-sm"
                  >
                    {student.name} ({student.studentClass})
                  </P>
                );
              })}
            </div>
          </div>

          {assignment.description.length !== 0 && (
            <div className="space-y-2">
              <H2>Opgavebeskrivelse</H2>
              <P
                dangerouslySetInnerHTML={{
                  __html: urlify(assignment.description.join("<br/>")),
                }}
              />
            </div>
          )}
          {assignment.documents.length !== 0 && (
            <div className="space-y-2">
              <H2>Vedhæftede filer</H2>
              {assignment.documents.map((doc) => {
                return (
                  <div className="flex items-center space-x-2" key={doc.href}>
                    <File className="aspect-square h-5 min-h-[20px] w-5 min-w-[20px] text-link" />
                    <button
                      className="link overflow-x-hidden text-ellipsis whitespace-nowrap text-xs xs:text-sm"
                      data-lectio-href={doc.href}
                    >
                      {doc.name}
                    </button>
                  </div>
                );
              })}
            </div>
          )}
          {assignment.submits.length > 0 && (
            <div className="space-y-2 pb-8">
              <H2>Besvarelser</H2>
              <div className="space-y-6">
                {teacherSubmits.map((submit, i) => {
                  return (
                    <Fragment key={i}>
                      <SubmitItem submit={submit} pinned />
                      {studentSubmits.length >= 1 && <Separator />}
                    </Fragment>
                  );
                })}
                {studentSubmits.length >= 1 && (
                  <SubmitItem submit={studentSubmits[0]} />
                )}
                {studentSubmits.length > 1 && (
                  <PreviousSubmitsWrapper>
                    {studentSubmits.map((submit, i) => {
                      if (i === 0) return null;

                      return <SubmitItem key={i} submit={submit} />;
                    })}
                  </PreviousSubmitsWrapper>
                )}
              </div>
            </div>
          )}
          {/* <Suspense fallback={<AssignmentInfoSkeleton />}>
            <AssignmentInfo />
          </Suspense> */}
          {/* <Suspense fallback={<AssignmentDescriptionSkeleton />}>
            <AssignmentDescription />
          </Suspense>
          <Suspense fallback={<AssignmentFilesSkeleton />}>
            <AssignmentFiles />
          </Suspense>
          <Suspense fallback={<UploadAssignmentSkeleton />}>
            <UploadAssignment />
          </Suspense>
          <Suspense fallback={<AssignmentSubmitsSkeleton />}>
            <AssignmentSubmits />
          </Suspense> */}
        </div>
      </div>
    </SidebarWrapper>
  );
}
