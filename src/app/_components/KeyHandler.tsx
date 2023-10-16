"use client";

import { useEffect } from "react";
import { vEvent } from "@/lib/viskum/vEvent";

export function KeyHandler() {
  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight" && e.metaKey && e.shiftKey) {
        vEvent.dispatch("newScheduleWeek", { action: "next" });
      } else if (e.key === "ArrowLeft" && e.metaKey && e.shiftKey) {
        vEvent.dispatch("newScheduleWeek", { action: "previous" });
      }
    });
  }, []);

  return null;
}
