"use client";

import { usePathname } from "next/navigation";
import { AssignmentsSidebar } from "./AssignmentsSidebar";

type Props = { children: React.ReactNode };

export function SidebarWrapper({ children }: Props) {
  const path = usePathname();

  if (path.includes("/log-ind")) {
    return <div className="w-full flex justify-center">{children}</div>;
  }

  const componentMap: { [key: string]: JSX.Element } = {
    "/afleveringer": <AssignmentsSidebar />,
  };

  return (
    <>
      <div className="container px-0 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 w-full lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10 xl:grid">
        <div className="hidden w-full shrink-0 lg:sticky md:block">
          <div className="fixed top-24">
            <div className="w-full">{componentMap[path]}</div>
          </div>
        </div>
        {children}
      </div>
    </>
  );
}
