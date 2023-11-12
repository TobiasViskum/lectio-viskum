import { Suspense } from "react";
import { AssignmentsSidebarSkeleton } from "./AssignmentsSidebar/AssignmentsSidebarSkeleton";
import { AssignmentsSidebar } from "./AssignmentsSidebar";
import { LessonSidebar } from "./LessonSidebar";
import { ContentSwitcher } from "./ContentSwitcher";
import { LessonSidebarSkeleton } from "./LessonSidebar/LessonSidebarSkeleton";

type Props = {
  children: React.ReactNode;
};

export function SidebarWrapper({ children }: Props) {
  return (
    <div className="container w-full items-start px-0 md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10 xl:grid ">
      <div className="hidden w-full shrink-0 md:block lg:sticky">
        <div className="fixed top-24 h-[calc(100svh-128px)] overflow-hidden md:w-[220px] lg:w-[240px] ">
          <div className="h-full">
            <ContentSwitcher
              assignmentsSidebar={
                <Suspense fallback={<AssignmentsSidebarSkeleton />}>
                  <AssignmentsSidebar />
                </Suspense>
              }
              lessonSidebar={
                <Suspense fallback={<LessonSidebarSkeleton />}>
                  <LessonSidebar />
                </Suspense>
              }
            />
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}
