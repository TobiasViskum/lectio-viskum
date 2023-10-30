"use client";

import * as React from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "./button";

type Props = {
  children: React.ReactNode;
  onChange?: (e: Date | undefined) => void;
  disabled?: boolean;
};
export function DatePicker({ children, onChange, disabled = false }: Props) {
  const [date, setDate] = React.useState<Date>();
  const [isOpen, setIsOpen] = React.useState(false);

  function changeDate(e: Date | undefined) {
    if (onChange) {
      onChange(e);
    }
    setIsOpen(false);
    setDate(e);
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        align="start"
        className="flex w-auto flex-col space-y-2 p-2"
      >
        <Button
          disabled={disabled}
          disableAnimation
          variant={"outline"}
          onClick={() => changeDate(new Date())}
        >
          I dag
        </Button>
        <div className="rounded-md border">
          <Calendar
            disabled={disabled}
            mode="single"
            selected={date}
            onSelect={changeDate}
            defaultMonth={date}
            initialFocus
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
