import { headers } from "next/headers";
import { Suspense } from "react";
import { AssignmentsSidebarSkeleton } from "./AssignmentsSidebar/AssignmentsSidebarSkeleton";
import { AssignmentsSidebar } from "./AssignmentsSidebar";
import { LessonSidebar } from "./LessonSidebar";

type Props = {
  children: React.ReactNode;
};

export function SidebarWrapper({ children }: Props) {
  const xSidebar = headers().get("x-sidebar") as XSidebar;

  return (
    <div className="container w-full items-start px-0 md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10 xl:grid ">
      <div className="hidden w-full shrink-0 md:block lg:sticky">
        <div className="fixed top-24 h-[calc(100svh-128px)] overflow-hidden md:w-[220px] lg:w-[240px] ">
          <div className={xSidebar !== "none" ? "block h-full" : "hidden"}>
            {xSidebar === "all-assignments" ? (
              <Suspense fallback={<AssignmentsSidebarSkeleton />}>
                <AssignmentsSidebar />
              </Suspense>
            ) : xSidebar === "lesson" ? (
              <Suspense>
                <LessonSidebar />
              </Suspense>
            ) : null}
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}
