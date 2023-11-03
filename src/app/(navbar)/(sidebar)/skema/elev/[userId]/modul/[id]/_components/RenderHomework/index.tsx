import { Fragment } from "react";
import { TextPart } from "./Parts/TextPart";
import { ListPart } from "./Parts/ListPart";
import { VideoPart } from "./Parts/VideoPart";
import { TablePart } from "./Parts/TablePart";
import { ImagePart } from "./Parts/ImagePart";

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

        if (!isArray) {
          if ("isTitle" in content) {
            html = <TextPart content={content} listType={listType} />;
          } else if ("videoHref" in content) {
            html = <VideoPart content={content} />;
          } else if ("tableContent" in content) {
            html = <TablePart content={content} />;
          } else if ("img" in content) {
            html = <ImagePart content={content} />;
          } else if ("listContent" in content) {
            html = <ListPart content={content} />;
          }
        }

        return <Fragment key={index}>{html}</Fragment>;
      })}
    </>
  );
}
