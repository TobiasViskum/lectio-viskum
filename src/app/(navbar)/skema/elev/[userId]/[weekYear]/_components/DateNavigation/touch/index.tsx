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
    <div className="flex w-full justify-between gap-x-4">
      <TooltipHover html={<p>{"⌘⇧←"}</p>}>
        <Button
          variant={"outline"}
          onClick={() => handleClick("backwards")}
          className="aspect-square h-12 w-12 px-1 py-1"
        >
          <ArrowLeft className="text-white" />
        </Button>
      </TooltipHover>

      {/* {[0, 1, 2, 3, 4].map((num) => {
        return (
          <Button
            onClick={() => setDay(num)}
            key={num}
            disableAnimation
            variant={"secondary"}
            className={cn(
              "flex h-12 w-full flex-col bg-primary-foreground text-center",
            )}
          >
            <p
              className={cn(
                "text-xs transition-all",
                day === num
                  ? "text-blue-400 opacity-100"
                  : "text-muted-foreground opacity-50",
              )}
            >
              mandag
            </p>
            <p
              className={cn(
                "hidden font-bold transition-all",
                day === num ? "text-blue-400 opacity-100" : "opacity-80",
              )}
            >
              {new Intl.DateTimeFormat("da-dk", {
                day: "2-digit",
                month: "long",
              }).format(new Date())}
            </p>
            <p
              className={cn(
                "font-bold transition-all",
                day === num ? "text-blue-400 opacity-100" : "opacity-80",
              )}
            >
              {new Intl.DateTimeFormat("da-dk", {
                day: "2-digit",
              }).format(new Date())}
            </p>
          </Button>
        );
      })} */}

      <TooltipHover html={<p>{"⌘⇧→"}</p>}>
        <Button
          variant={"outline"}
          onClick={() => handleClick("forwards")}
          className="aspect-square h-12 w-12 px-1 py-1"
        >
          <ArrowRight className="text-white" />
        </Button>
      </TooltipHover>
    </div>
  );
}
