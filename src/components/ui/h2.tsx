import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps extends React.HTMLAttributes<HTMLHeadingElement> {}

const H2 = React.forwardRef<HTMLHeadingElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <h2
        className={cn(
          "text-gradient py-1 text-xl font-bold xs:text-2xl md:text-3xl",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
H2.displayName = "H2";

export { H2 };
