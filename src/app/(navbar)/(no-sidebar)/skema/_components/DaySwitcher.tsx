"use client";

import TooltipHover from "@/components/global/TooltipHover";
import { Button } from "@/components/ui/button";
import { vEvent } from "@/lib/viskum/vEvent";
import { ArrowLeft, ArrowRight } from "lucide-react";

export function DaySwitcher() {
  function handleClick(action: "forwards" | "backwards") {
    vEvent.dispatch("newScheduleWeek", { action: action });
  }

  return (
    <div className="flex w-full justify-between 2xl:hidden">
      <TooltipHover html={<p>{"⌘⇧←"}</p>}>
        <Button
          variant={"outline"}
          onClick={() => handleClick("backwards")}
          className="h-12 w-12 px-1 py-1"
        >
          <ArrowLeft className="text-white" />
        </Button>
      </TooltipHover>
      <TooltipHover html={<p>{"⌘⇧→"}</p>}>
        <Button
          variant={"outline"}
          onClick={() => handleClick("forwards")}
          className="h-12 w-12 px-1 py-1"
        >
          <ArrowRight className="text-white" />
        </Button>
      </TooltipHover>
    </div>
  );
}
