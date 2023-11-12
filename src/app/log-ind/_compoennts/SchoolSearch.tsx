"use client";

import { Input } from "@/components/ui/input";
import { vEvent } from "@/lib/viskum/vEvent";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

export function SchoolSearch() {
  return (
    <div className="flex items-center rounded-md border bg-black bg-opacity-60 px-2">
      <MagnifyingGlassIcon className="h-6 w-6 text-muted-foreground" />
      <Input
        spellCheck={false}
        placeholder="Search..."
        className="border-0 placeholder-muted-foreground focus-visible:ring-0"
        onChange={(e) => {
          vEvent.dispatch("searchSchool", { searchString: e.target.value });
        }}
      />
    </div>
  );
}
