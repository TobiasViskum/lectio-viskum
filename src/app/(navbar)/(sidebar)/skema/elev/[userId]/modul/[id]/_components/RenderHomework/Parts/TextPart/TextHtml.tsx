import { DocumentButton } from "@/components/global/DocumentButton";
import { cn } from "@/lib/utils";
import { urlify } from "@/util/urlify";
import Link from "next/link";

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
        <DocumentButton
          className={cn(content.isTitle ? "text-lg" : "text-sm")}
          strDocument={JSON.stringify({
            name: content.text,
            href: content.href,
          })}
        />
      );
    } else {
      return (
        <Link
          href={content.href}
          target="_blank"
          className={cn(
            content.isTitle ? "text-lg" : "text-sm",
            // content.isBold ? "" : "font-light",
            "text-link hover:underline  ",
          )}
          dangerouslySetInnerHTML={{ __html: content.text }}
        />
      );
    }
  }
}
