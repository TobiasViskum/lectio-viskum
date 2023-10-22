"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type Props = { AssignmentsComponent: JSX.Element; children: React.ReactNode };

export function SidebarWrapper({ children, AssignmentsComponent }: Props) {
  const path = usePathname();
  const [backPath, setBackPath] = useState("/forside");

  useEffect(() => {
    const splitPath = path.split("/");
    splitPath.pop();
    if (splitPath.length === 1) {
      setBackPath("/forside");
    } else {
      setBackPath(splitPath.join("/"));
    }
  }, [path]);

  const componentMap: { [key: string]: number } = {
    "/afleveringer": 1,
  };

  return (
    <>
      <div className="container w-full items-start px-0 md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10 xl:grid">
        <div className="hidden w-full shrink-0 md:block lg:sticky">
          <div className="fixed top-24 md:w-[220px] lg:w-[240px]">
            <Link href={backPath} className="absolute -right-4 -top-4 h-8 w-8">
              <ArrowLeft className="h-full w-full" />
            </Link>
            <div className={componentMap[path] ? "block" : "hidden"}>
              {AssignmentsComponent}
            </div>
          </div>
        </div>
        {children}
      </div>
    </>
  );
}
