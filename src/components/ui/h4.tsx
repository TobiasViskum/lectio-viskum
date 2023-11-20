import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps extends React.HTMLAttributes<HTMLHeadingElement> {}

const H4 = React.forwardRef<HTMLHeadingElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <h4
        className={cn(
          "py-0.5 text-base font-semibold text-secondary-foreground xs:text-lg",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
H4.displayName = "H4";

export { H4 };
