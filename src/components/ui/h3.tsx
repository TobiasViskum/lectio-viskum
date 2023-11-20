import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps extends React.HTMLAttributes<HTMLHeadingElement> {}

const H3 = React.forwardRef<HTMLHeadingElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <h3
        className={cn(
          "text-gradient-2 py-0.5 text-base font-semibold xs:text-lg md:text-xl",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
H3.displayName = "H3";

export { H3 };
