"use client";

import { vEvent } from "@/lib/viskum/vEvent";
import { useEffect } from "react";

export function DateUpdater() {
  useEffect(() => {
    setInterval(() => {
      vEvent.dispatch("assignmentsDateUpdate", {});
    }, 200);
  }, []);

  return null;
}
