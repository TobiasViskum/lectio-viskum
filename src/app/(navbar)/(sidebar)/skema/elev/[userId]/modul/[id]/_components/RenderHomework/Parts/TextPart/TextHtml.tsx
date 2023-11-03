import { DocumentButton } from "@/components/global/DocumentButton";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function TextHtml({ content }: { content: LessonText }) {
  if (content.href === "") {
    return (
      <p
        className={cn(
          content.isTitle
            ? "text-lg text-foreground"
            : "text-sm text-muted-foreground",
          content.isBold ? "font-semibold" : "font-light opacity-80",
        )}
      >
        {content.text}
      </p>
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
            content.isBold ? "font-bold" : "font-light",
            "text-blue-400",
          )}
        >
          {content.text}
        </Link>
      );
    }
  }
}
