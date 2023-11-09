"use client";

import { execCommand } from "@/util/execCommand";
import { Toggle } from "../ui/toggle";
import { useState } from "react";
import { SubscriptIcon, SuperscriptIcon } from "lucide-react";

export function EditableTextArea() {
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);

  return (
    <div>
      <div className="flex w-full items-center gap-x-1 py-2">
        <Toggle
          data-state={isBold ? "on" : "off"}
          className="aspect-square"
          onMouseDown={(e) => {
            e.preventDefault();
            execCommand("bold");
          }}
        >
          B
        </Toggle>
        <Toggle
          className="aspect-square"
          onMouseDown={(e) => {
            e.preventDefault();
            execCommand("italic");
          }}
        >
          I
        </Toggle>
        <Toggle
          className="aspect-square"
          onMouseDown={(e) => {
            e.preventDefault();
            execCommand("underline");
          }}
        >
          U
        </Toggle>
      </div>
      <div
        lang="da-dk"
        onInput={(e) => {
          setIsBold(document.queryCommandState("bold"));
        }}
        onKeyUp={(e) => {
          setIsBold(document.queryCommandState("bold"));
        }}
        onClick={(e) => {
          setIsBold(document.queryCommandState("bold"));
        }}
        id="myDiv"
        contentEditable={true}
        className="min-h-[150px] rounded-md border border-input p-1 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
      />
    </div>
  );
}
