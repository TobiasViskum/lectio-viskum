import { Suspense } from "react";
import { SidebarWrapper } from "../_components/SidebarWrapper";
import { AssignmentsSidebar } from "../_components/SidebarWrapper/AssignmentsSidebar";

type Props = { children: React.ReactNode };

export default function SmallScreen(props: Props) {
  return (
    <SidebarWrapper
      AssignmentsComponent={
        <Suspense>
          <AssignmentsSidebar />
        </Suspense>
      }
    >
      <div className="w-full">{props.children}</div>
    </SidebarWrapper>
  );
}
