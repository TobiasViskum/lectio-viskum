"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Fragment } from "react";

export function SmartNavigation() {
  const path = usePathname();
  const searchParams = useSearchParams();
  const search = new URLSearchParams(searchParams).toString();

  let linkPath: { href: string; name: string }[] = [];

  const splitPath = path.split("/");
  splitPath.shift();

  if (path !== "/forside") {
    linkPath.push({ href: "/forside", name: "Forside" });
  }

  if (path.includes("/afleveringer")) {
    linkPath.push({ href: `/afleveringer`, name: "Afleveringer" });
    if (/\/afleveringer\/[0-9]+/i.test(path)) {
      linkPath.push({
        href: `/afleveringer/${splitPath[1]}?${search}`,
        name: "Opgave",
      });
    }
  } else if (path.includes("/skema/elev/")) {
    const prevWeek = searchParams.get("prevWeek");
    const prevYear = searchParams.get("prevYear");

    let url = `/skema/elev/${splitPath[2]}`;
    if (prevWeek && prevYear) {
      url = [url, prevWeek, "-", prevYear].join("");
    }

    linkPath.push({ href: url, name: "Skema" });
    if (/\/skema\/elev\/[0-9]+\/modul\/[0-9]+/.test(path)) {
      linkPath.push({
        href: `/skema/elev/${splitPath[2]}/modul/${splitPath[4]}?${search}`,
        name: "Modul",
      });
    }
  }

  const linkTw = "hover:underline";

  return (
    <div className="flex w-full gap-x-4 pt-4">
      {linkPath.map((linkItem, i) => {
        if (i === 0) {
          return (
            <Link className={linkTw} href={linkItem.href} key={linkItem.href}>
              {linkItem.name}
            </Link>
          );
        } else {
          return (
            <Fragment key={linkItem.href}>
              <p>{"→"}</p>
              <Link className={linkTw} href={linkItem.href}>
                {linkItem.name}
              </Link>
            </Fragment>
          );
        }
      })}
    </div>
  );
}
