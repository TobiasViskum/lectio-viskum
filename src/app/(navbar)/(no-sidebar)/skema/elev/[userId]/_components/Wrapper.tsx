"use client";

import { useContext } from "react";
import { ScheduleContext } from "../schedule-context";

type Props = { children: React.ReactNode };
export function Wrapper({ children }: Props) {
  const context = useContext(ScheduleContext);

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

  return (
    <div
      className="flex h-full"
      style={{ transform: `translateX(${getNewTransform()}%)` }}
    >
      {children}
    </div>
  );
}
