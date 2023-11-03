import { Fragment } from "react";
import { TextPart } from "./Parts/TextPart";
import { cn } from "@/lib/utils";

export function RenderHomework({
  homework,
  listType,
}: {
  homework: LessonHomework;
  listType?: "ol" | "ul" | "";
}) {
  return (
    <>
      {homework.map((content, index) => {
        const isArray = Array.isArray(content);
        let html = <></>;

        if (isArray) {
        } else if (!isArray) {
          if ("isTitle" in content) {
            html = <TextPart content={content} listType={listType} />;
          } else if ("videoHref" in content) {
            html = (
              <iframe
                style={{ aspectRatio: content.aspectRatio }}
                src={content.videoHref}
                className="max-w-lg"
              ></iframe>
            );
          } else if ("img" in content) {
            content;
          } else if ("listContent" in content) {
            html = (
              <ul
                className={cn(
                  "py-4 pl-6",
                  content.listType === "ol"
                    ? "list-outside list-decimal"
                    : content.listType === "ul"
                    ? "list-outside list-disc"
                    : "",
                )}
              >
                <RenderHomework
                  homework={content.listContent}
                  listType={content.listType}
                />
              </ul>
            );
          }
        }

        return <Fragment key={index}>{html}</Fragment>;
      })}
    </>
  );
}
