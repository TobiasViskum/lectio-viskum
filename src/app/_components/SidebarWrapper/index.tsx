"use client";

import { usePathname } from "next/navigation";

type Props = { children: React.ReactNode };

export function SidebarWrapper({ children }: Props) {
  const path = usePathname();

  if (path.includes("/log-ind")) {
    return <div className="w-full flex justify-center">{children}</div>;
  }

  return (
    <>
      <div className="container px-0 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 w-full lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10 xl:grid">
        <div className="hidden w-full shrink-0 lg:sticky md:block">
          <div className="fixed top-24">Fixed</div>
        </div>
        {children}
      </div>
    </>
  );
}
