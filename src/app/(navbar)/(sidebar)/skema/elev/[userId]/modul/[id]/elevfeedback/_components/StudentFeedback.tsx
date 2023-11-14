"use client";

import { EditableTextArea } from "./EditableTextArea";
import { Input } from "@/components/ui/input";

type Props = {
  studentFeedback: StudentFeedback;
};

export function StudentFeedback({ studentFeedback }: Props) {
  return (
    <div>
      <Input
        className="rounded-none border-0 border-b px-2 text-lg focus-visible:outline-0 focus-visible:ring-0"
        placeholder="Titel..."
        defaultValue={studentFeedback.title || ""}
      />
      <EditableTextArea content={studentFeedback.content} />
    </div>
  );
}
