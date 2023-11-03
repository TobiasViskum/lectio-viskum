import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export function TablePart({ content }: { content: LessonTable }) {
  const tableContent = content.tableContent;
  return (
    <div className="relative grid max-w-2xl grid-cols-1 gap-y-1 rounded-md border">
      <Separator
        orientation="vertical"
        className="absolute left-[calc(50%-2px)] top-0"
      />
      {tableContent.map((tableRow, index) => {
        return (
          <div
            key={index}
            className="group grid grid-cols-2 border-b last:border-b-0"
          >
            {tableRow.map((tableColumn) => {
              return (
                <p
                  key={tableColumn.text}
                  className={cn(
                    tableColumn.isBold ? "font-semibold" : "",
                    "break-words px-2 py-1 group-[:nth-child(2)]:bg-accent",
                  )}
                >
                  {tableColumn.text}
                </p>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
