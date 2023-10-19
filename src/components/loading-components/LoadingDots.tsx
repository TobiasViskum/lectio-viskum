import * as React from "react";

import { cn } from "@/lib/utils";

const LoadingDots = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const dotTw =
    "relative h-3 w-3 rounded-full bg-zinc-500 text-zinc-500 animate-dot-flashing delay-500";

  const dotBeforeAfterTw =
    'before:content-[""] before:inline-block before:absolute before:top-0 after:content-[""] after:inline-block after:absolute after:top-0';

  const dotBeforeTw =
    "before:-left-4 before:h-3 before:w-3 before:rounded-full before:bg-zinc-500 before:text-zinc-500 before:animate-dot-flashing before:delay-0";
  const dotAfterTw =
    "after:left-4 after:h-3 after:w-3 after:rounded-full after:bg-zinc-500 after:text-zinc-500 after:animate-dot-flashing after:delay-1000";

  return (
    <>
      <div
        ref={ref}
        className={cn(
          dotTw,
          dotBeforeAfterTw,
          dotBeforeTw,
          dotAfterTw,
          className,
        )}
        {...props}
      ></div>
    </>
  );
});
LoadingDots.displayName = "LoadingDots";

export { LoadingDots };
