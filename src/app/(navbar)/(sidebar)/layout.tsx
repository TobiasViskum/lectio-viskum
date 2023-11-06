import { Suspense } from "react";
import { SidebarWrapper } from "../../_components/SidebarWrapper";
import { AssignmentsSidebar } from "../../_components/SidebarWrapper/AssignmentsSidebar";
import { ContentSkeleton } from "../../_components/SidebarWrapper/AssignmentsSidebar/ContentSkeleton";
import { SmartNavigation } from "@/app/_components/SmartNavigation";

type Props = { children: React.ReactNode };

export default function SmallScreen(props: Props) {
  return (
    <SidebarWrapper
      AssignmentsComponent={
        <Suspense fallback={<ContentSkeleton />}>
          <AssignmentsSidebar />
        </Suspense>
      }
    >
      <div className="w-full">
        <Suspense>
          <SmartNavigation />
        </Suspense>
        {props.children}
      </div>
    </SidebarWrapper>
  );
}
