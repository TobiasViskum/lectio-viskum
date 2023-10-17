"use client";

import TooltipHover from "@/components/global/TooltipHover";
import { Button } from "@/components/ui/button";
import { vEvent } from "@/lib/viskum/vEvent";
import { ArrowLeft, ArrowRight } from "lucide-react";

export function DaySwitcher() {
  function handleClick(action: "next" | "previous") {
    vEvent.dispatch("newScheduleWeek", { action: action });
  }

  return (
    <div className="w-full flex justify-between">
      <TooltipHover text="⌘⇧←">
        <Button variant={"outline"} onClick={() => handleClick("previous")} className="h-12 w-12 py-1 px-1">
          <ArrowLeft className="text-white" />
        </Button>
      </TooltipHover>
      <TooltipHover text="⌘⇧→">
        <Button variant={"outline"} onClick={() => handleClick("next")} className="h-12 w-12 py-1 px-1">
          <ArrowRight className="text-white" />
        </Button>
      </TooltipHover>
    </div>
  );
}
