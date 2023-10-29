"use client";

import { cn } from "@/lib/utils";
import { vEvent } from "@/lib/viskum/vEvent";
import { useEffect, useState } from "react";

type Props = {
  children: React.ReactNode;
};
export function LessonWrapper({ children }: Props) {
  const [opacity, setOpacity] = useState("opacity-0");

  useEffect(() => {
    vEvent.listen("fade", (e) => {
      if (e.detail.action === "in") {
        setOpacity("opacity-100");
      } else if (e.detail.action === "out") {
        setOpacity("opacity-0");
      }
    });
  }, []);

  return (
    <div className={cn("transition-opacity duration-300", opacity)}>
      {children}
    </div>
  );
}
