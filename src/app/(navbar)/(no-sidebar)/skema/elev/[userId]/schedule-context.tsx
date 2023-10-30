"use client";

import { vEvent } from "@/lib/viskum/vEvent";
import { getWeekAndYear } from "@/util/getWeekAndYear";
import { getWeekStartEnd } from "@/util/getWeekStartEnd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { createContext, useEffect, useRef, useState } from "react";

type ScheduleContext = {
  day: number;
  changeDay: (action: "forwards" | "backwards") => void;
};

export const ScheduleContext = createContext<ScheduleContext>({
  day: 0,
} as ScheduleContext);

export function getMaxDay() {
  if (typeof window !== "undefined") {
    const width = window.innerWidth;
    if (width < 640) {
      return 4;
    } else if (width < 1024) {
      return 3;
    } else if (width < 1280) {
      return 2;
    } else if (width < 1536) {
      return 1;
    } else {
      return 0;
    }
  }
  return 0;
}

export function ScheduleProvider({ children }: { children: React.ReactNode }) {
  const [day, setDay] = useState(0);
  const router = useRouter();
  const path = usePathname();
  const searchParams = useSearchParams();
  const numberWeek = Number(searchParams.get("week"));
  const numberYear = Number(searchParams.get("year"));
  const dayRef = useRef(day);
  const prevMaxDay = useRef(0);
  dayRef.current = day;
  const nextAction = useRef<"none" | "min" | "max">("none");

  useEffect(() => {
    if (nextAction.current === "min") {
      setDay(0);
    } else if (nextAction.current === "max") {
      setDay(getMaxDay());
    }
    vEvent.dispatch("fade", { action: "in" });
    nextAction.current = "none";
  }, [searchParams]);

  useEffect(() => {
    prevMaxDay.current = getMaxDay();
    function handleResize() {
      if (getMaxDay() < dayRef.current) {
        setDay(getMaxDay());
      } else if (prevMaxDay.current !== getMaxDay()) {
        prevMaxDay.current = getMaxDay();
        setDay(0);
      }
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function pushPreviousWeek(noDelay: boolean = false) {
    const { start } = getWeekStartEnd(numberYear, numberWeek);
    start.setDate(start.getDate() - 7);
    const nextWeek = getWeekAndYear(start);

    const newUrl = [
      path,
      "?week=",
      nextWeek.week,
      "&year=",
      nextWeek.year,
    ].join("");

    if (noDelay) {
      router.push(newUrl, { scroll: false });
    } else {
      // setTimeout(() => {
      router.push(newUrl, { scroll: false });
      // }, 300);
    }
  }
  function pushNextWeek(noDelay: boolean = false) {
    const { start } = getWeekStartEnd(numberYear, numberWeek);
    start.setDate(start.getDate() + 7);
    const nextWeek = getWeekAndYear(start);

    const newUrl = [
      path,
      "?week=",
      nextWeek.week,
      "&year=",
      nextWeek.year,
    ].join("");

    if (noDelay) {
      router.push(newUrl, { scroll: false });
    } else {
      // setTimeout(() => {
      router.push(newUrl, { scroll: false });
      // }, 300);
    }
  }

  function changeDay(action: "forwards" | "backwards") {
    if (document.getElementById("no_schedule_activities")) {
      if (action === "forwards") {
        if (!isNaN(numberWeek) && !isNaN(numberYear)) {
          vEvent.dispatch("fade", { action: "out" });
          nextAction.current = "min";
          pushNextWeek();
        }
      } else if (action === "backwards") {
        if (!isNaN(numberWeek) && !isNaN(numberYear)) {
          vEvent.dispatch("fade", { action: "out" });
          nextAction.current = "max";
          pushPreviousWeek();
        }
      }
    } else if (action === "forwards" && dayRef.current === getMaxDay()) {
      if (!isNaN(numberWeek) && !isNaN(numberYear)) {
        vEvent.dispatch("fade", { action: "out" });
        nextAction.current = "min";
        pushNextWeek();
      }
    } else if (action === "backwards" && dayRef.current === 0) {
      if (!isNaN(numberWeek) && !isNaN(numberYear)) {
        vEvent.dispatch("fade", { action: "out" });
        nextAction.current = "max";
        pushPreviousWeek();
      }
    } else if (action === "forwards") {
      setDay((prev) => Math.min(prev + 1, getMaxDay()));
    } else if (action === "backwards") {
      setDay((prev) => Math.max(prev - 1, 0));
    }
  }

  return (
    <ScheduleContext.Provider value={{ day: day, changeDay: changeDay }}>
      {children}
    </ScheduleContext.Provider>
  );
}
