"use client";

import { cn } from "@/lib/utils";
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
      url = [url, "/", prevWeek, "-", prevYear].join("");
    }

    linkPath.push({ href: url, name: "Skema" });
    if (/\/skema\/elev\/[0-9]+\/modul\/[0-9]+/.test(path)) {
      if (path.includes("/elevfeedback")) {
        linkPath.push({
          href: `/skema/elev/${splitPath[2]}/modul/${splitPath[4]}?${search}`,
          name: "Modul",
        });
        linkPath.push({
          href: `/skema/elev/${splitPath[2]}/modul/${splitPath[4]}/elevfeedback`,
          name: "Elevfeedback",
        });
      } else {
        linkPath.push({
          href: `/skema/elev/${splitPath[2]}/modul/${splitPath[4]}?${search}`,
          name: "Modul",
        });
      }
    }
  }

  let linkTw = "hover:underline hover:text-blue-600 ";

  return (
    <div className="flex w-full gap-x-1.5 pt-4 text-sm">
      {linkPath.map((linkItem, i) => {
        const isLast = i === linkPath.length - 1;
        let textColor = "text-blue-500";
        if (isLast) {
          textColor = "text-muted-foreground";
          linkTw = [linkTw, "pointer-events-none"].join(" ");
        }

        if (i === 0) {
          return (
            <Link
              className={cn(linkTw, textColor)}
              href={linkItem.href}
              key={linkItem.href + `${Math.random()}`}
            >
              {linkItem.name}
            </Link>
          );
        } else {
          return (
            <Fragment key={linkItem.href + `${Math.random()}`}>
              <p className={"text-muted-foreground"}>{">" /*{"→"}*/}</p>

              <Link className={cn(linkTw, textColor)} href={linkItem.href}>
                {linkItem.name}
              </Link>
            </Fragment>
          );
        }
      })}
    </div>
  );
}
