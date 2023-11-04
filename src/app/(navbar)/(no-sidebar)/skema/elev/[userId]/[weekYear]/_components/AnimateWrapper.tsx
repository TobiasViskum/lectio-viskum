"use client";

import { cn } from "@/lib/utils";
import { vEvent } from "@/lib/viskum/vEvent";
import { useEffect, useState } from "react";

type Props = {
  children: React.ReactNode;
};
export function AnimateWrapper({ children }: Props) {
  const [twClassName, setTwClassName] = useState("opacity-0");

  useEffect(() => {
    vEvent.listen("fade", (e) => {
      if (window.innerWidth >= 1280) {
        setTwClassName("opacity-100");
      } else {
        if (e.detail.action === "in") {
          setTwClassName("transition-opacity duration-300 opacity-100");
        } else if (e.detail.action === "out") {
          setTwClassName("transition-opacity duration-300 opacity-0");
        }
      }
    });
  }, []);

  return <div className={cn(twClassName)}>{children}</div>;
}
