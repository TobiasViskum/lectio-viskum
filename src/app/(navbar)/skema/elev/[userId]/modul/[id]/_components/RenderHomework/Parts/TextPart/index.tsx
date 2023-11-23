import { TextHtml } from "./TextHtml";

export function TextPart({
  content,
  listType,
}: {
  content: LessonText;
  listType?: "ol" | "ul" | "";
}) {
  if (listType === "ol" || listType === "ul") {
    return (
      <li className="pl-2">
        <TextHtml content={content} />
      </li>
    );
  } else {
    return <TextHtml content={content} />;
  }
}
