"use client";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export function BlueBlur() {
  const path = usePathname();

  let opacity = "opacity-75";
  if (path === "/log-ind") {
    opacity = "opacity-100";
  }

  return (
    <div
      className={cn(
        "after:bg-gradient-conic fixed inset-1/2 z-[-1] flex -translate-x-1/2 -translate-y-1/2 rotate-[-6deg] place-items-center transition-opacity before:absolute before:h-[450px] before:w-[720px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-to-br before:from-transparent before:to-blue-700 before:opacity-10 before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[270px] after:w-[360px] after:translate-x-1/3 after:from-sky-900 after:via-[#0141ff] after:opacity-40 after:blur-2xl after:content-[''] before:lg:h-[540px]",
        opacity,
      )}
    />
  );
}
