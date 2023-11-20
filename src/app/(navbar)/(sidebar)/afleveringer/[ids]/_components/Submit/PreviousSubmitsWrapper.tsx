"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { ReactNode, useState } from "react";

export function PreviousSubmitsWrapper({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        variant={"outline"}
        className="flex w-24 gap-x-2"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {isOpen ? "Luk" : "Åbn"} <ChevronDown />
      </Button>
      <div
        className={cn(
          "grid grid-flow-col overflow-hidden align-top transition-all",
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">{children}</div>
      </div>
    </>
  );
}
