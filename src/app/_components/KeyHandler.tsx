"use client";

import { useEffect } from "react";
import { vEvent } from "@/lib/viskum/vEvent";

export function KeyHandler() {
  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight" && e.metaKey && e.shiftKey) {
        vEvent.dispatch("newScheduleWeek", { action: "forwards" });
      } else if (e.key === "ArrowLeft" && e.metaKey && e.shiftKey) {
        vEvent.dispatch("newScheduleWeek", { action: "backwards" });
      }
    });
  }, []);

  return null;
}
