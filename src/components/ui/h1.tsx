import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps extends React.HTMLAttributes<HTMLHeadingElement> {}

const H1 = React.forwardRef<HTMLHeadingElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <h1
        className={cn(
          "text-gradient py-1 text-3xl font-extrabold xs:text-4xl md:text-5xl",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
H1.displayName = "H1";

export { H1 };
