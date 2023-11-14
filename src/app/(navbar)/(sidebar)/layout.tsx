import { Suspense } from "react";
import { SidebarWrapper } from "../../_components/SidebarWrapper";
import { SmartNavigation } from "@/app/_components/SmartNavigation";

type Props = { children: React.ReactNode };

export default function SidebarLayout(props: Props) {
  return (
    <SidebarWrapper>
      <div className="w-full">
        <Suspense>
          <SmartNavigation />
        </Suspense>
        {props.children}
      </div>
    </SidebarWrapper>
  );
}
