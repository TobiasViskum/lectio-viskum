"use client";

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
  const dayRef = useRef(day); // create a reference for 'day'
  dayRef.current = day;

  useEffect(() => {
    function handleResize() {
      if (getMaxDay() < dayRef.current) {
        setDay(getMaxDay());
      } else {
        setDay(0);
      }
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function changeDay(action: "forwards" | "backwards") {
    if (action === "forwards") {
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
