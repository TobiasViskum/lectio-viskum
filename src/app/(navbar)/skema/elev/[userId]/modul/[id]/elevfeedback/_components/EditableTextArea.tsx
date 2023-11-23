"use client";

import { execCommand } from "@/util/execCommand";
import { Toggle } from "@/components/ui/toggle";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { MDXEditorMethods } from "@mdxeditor/editor";

type Props = { content: string[] };

export function EditableTextArea({ content }: Props) {
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);

  const ref = useRef<MDXEditorMethods>(null);
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
        dangerouslySetInnerHTML={{
          __html: content.join("<br>"),
        }}
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
        onPaste={(e) => {
          e.preventDefault();

          // get text representation of clipboard
          let text = e.clipboardData.getData("text/html");

          // create a temporary div to hold the pasted content
          let tempDiv = document.createElement("div");
          tempDiv.innerHTML = text;

          // remove all style attributes
          let all = tempDiv.getElementsByTagName("*");
          for (let i = 0; i < all.length; i++) {
            all[i].removeAttribute("style");
            all[i].removeAttribute("className");
            all[i].removeAttribute("class");
          }

          // insert cleaned HTML manually
          document.execCommand("insertHTML", false, tempDiv.innerHTML);
        }}
        id="myDiv"
        contentEditable={true}
        className="min-h-[150px] rounded-md border border-input p-1 text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
      ></div>

      <Button>Gem</Button>
    </div>
  );
}
