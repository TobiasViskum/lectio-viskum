import { cn } from "@/lib/utils";
import { urlify } from "@/util/urlify";

export function TextHtml({ content }: { content: LessonText }) {
  if (content.href === "") {
    const text = urlify(content.text);

    return (
      <p
        dangerouslySetInnerHTML={{ __html: text }}
        className={cn(
          content.isTitle
            ? "text-lg text-foreground"
            : "text-sm text-foreground",
          // content.isBold ? "" : "font-light",
        )}
        style={{ color: content.color }}
      />
    );
  } else if (content.href !== "") {
    if (content.href.includes("/lectio/")) {
      return (
        <button
          className={cn(content.isTitle ? "text-lg" : "text-sm")}
          data-lectio-href={content.href}
        >
          {content.text}
        </button>
      );
    } else {
      return (
        <button
          data-lectio-href={content.href}
          className={cn(
            content.isTitle ? "text-lg" : "text-sm",
            // content.isBold ? "" : "font-light",
            "link",
          )}
          dangerouslySetInnerHTML={{ __html: content.text }}
        />
      );
    }
  }
}
