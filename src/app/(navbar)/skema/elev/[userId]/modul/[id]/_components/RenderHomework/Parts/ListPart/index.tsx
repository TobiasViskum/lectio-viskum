import { cn } from "@/lib/utils";
import { RenderHomework } from "../..";

export function ListPart({ content }: { content: LessonList }) {
  return (
    <ul
      className={cn(
        "flex flex-col gap-y-1",
        content.listType === "ol"
          ? "list-outside list-decimal gap-y-2 pl-6"
          : content.listType === "ul"
          ? "list-outside list-disc gap-y-2 pl-6 text-muted-foreground"
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
