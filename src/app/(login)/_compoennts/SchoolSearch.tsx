"use client";

import { Input } from "@/components/ui/input";
import { vEvent } from "@/lib/viskum/vEvent";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

export function SchoolSearch() {
  return (
    <>
      <div className="flex border rounded-md items-center px-2">
        <MagnifyingGlassIcon className="h-6 w-6 text-muted-foreground" />
        <Input
          spellCheck={false}
          placeholder="Search..."
          className="border-0 focus-visible:ring-0 placeholder-muted-foreground"
          onChange={(e) => {
            vEvent.dispatch("searchSchool", { searchString: e.target.value });
          }}
        />
      </div>
    </>
  );
}
