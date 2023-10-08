"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  eyeOff?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, spellCheck, type, eyeOff = false, ...props }, ref) => {
  const [newType, setNewType] = React.useState(type);
  let showEye = eyeOff ? false : type === "password";
  const eyeTw = cn("absolute h-5 w-5 right-3", showEye ? "block" : "hidden");

  const height = className?.match(/h-[a-z0-9]+/i);

  return (
    <div className="relative flex items-center">
      <input spellCheck={spellCheck || false} type={newType} className={cn("flex h-10 w-full rounded-md border border-input bg-background py-2 pl-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", className, showEye ? "pr-10" : "pr-3")} ref={ref} {...props} />
      <button
        type="button"
        className="flex items-center"
        onClick={() => {
          if (showEye) {
            if (newType === "password") {
              setNewType("text");
            } else {
              setNewType(type);
            }
          }
        }}
      >
        {newType !== "password" ? <Eye className={eyeTw} /> : <EyeOff className={eyeTw} />}
      </button>
    </div>
  );
});
Input.displayName = "Input";

export { Input };
