"use client";

import { EditableTextArea } from "@/components/global/EditableTextArea";
import { Input } from "@/components/ui/input";

export function StudentFeedback() {
  return (
    <div>
      <Input
        className="max-w-xs rounded-none border-0 border-b px-2 text-lg focus-visible:outline-0 focus-visible:ring-0"
        placeholder="Titel..."
      />
      <EditableTextArea />
    </div>
  );
}
