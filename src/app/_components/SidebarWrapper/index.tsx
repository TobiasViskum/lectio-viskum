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
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10  xl:grid">
        <div className="hidden h-full w-full shrink-0 lg:sticky md:block">
          <h2>Hej2</h2>
        </div>
        {children}
      </div>
    </>
  );
}
