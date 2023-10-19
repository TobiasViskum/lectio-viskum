"use client";

import { usePathname } from "next/navigation";

type Props = { AssignmentsComponent: JSX.Element; children: React.ReactNode };

export function SidebarWrapper({ children, AssignmentsComponent }: Props) {
  const path = usePathname();

  const componentMap: { [key: string]: JSX.Element } = {
    "/afleveringer": AssignmentsComponent,
  };

  return (
    <>
      <div className="container w-full items-start px-0 md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10 xl:grid">
        <div className="hidden w-full shrink-0 md:block lg:sticky">
          <div className="fixed top-24 md:w-[220px] lg:w-[240px]">
            {componentMap[path]}
          </div>
        </div>
        {children}
      </div>
    </>
  );
}
