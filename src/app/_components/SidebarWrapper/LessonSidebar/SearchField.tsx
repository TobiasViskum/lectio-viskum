"use client";

import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export function SearchField() {
  return (
    <div className="flex flex-col gap-y-2 py-2 pb-4 pl-1 pr-3">
      <p className="text-sm text-muted-foreground">
        Søg efter elever eller lærere:
      </p>
      <Input />
    </div>
  );
}
