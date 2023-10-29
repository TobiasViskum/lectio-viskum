"use client";

import { useContext, useEffect, useRef } from "react";
import { ScheduleContext } from "../schedule-context";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

type Props = { children: React.ReactNode };
export function Wrapper({ children }: Props) {
  const context = useContext(ScheduleContext);
  const searchParams = useSearchParams();
  const transform = useRef("transition-transform duration-300");

  function getNewTransform() {
    if (typeof window !== "undefined") {
      const width = window.innerWidth;
      if (width < 640) {
        return -100 * context.day;
      } else if (width < 1024) {
        return -50 * context.day;
      } else if (width < 1280) {
        return -33.333333 * context.day;
      } else if (width < 1536) {
        return -25 * context.day;
      } else {
        return -20 * context.day;
      }
    }
    return 0;
  }

  useEffect(() => {
    transform.current = "";
    setTimeout(() => {
      transform.current = "transition-transform duration-300";
    }, 100);
  }, [searchParams]);

  return (
    <div
      onWheel={(e) => {
        e.preventDefault();
        console.log(e.deltaX);
      }}
      className={cn("flex h-full", transform.current)}
      style={{ transform: `translateX(${getNewTransform()}%)` }}
    >
      {children}
    </div>
  );
}
