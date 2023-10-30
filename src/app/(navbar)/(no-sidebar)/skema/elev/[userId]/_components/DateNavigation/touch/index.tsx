"use client";

import TooltipHover from "@/components/global/TooltipHover";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useContext } from "react";
import { ScheduleContext } from "../../../schedule-context";

export function DateNavigationTouch() {
  const context = useContext(ScheduleContext);

  function handleClick(action: "forwards" | "backwards") {
    context.changeDay(action);
  }

  return (
    <div className="flex w-full justify-between">
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
