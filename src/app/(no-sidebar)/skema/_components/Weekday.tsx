import { Badge } from "@/components/ui/badge";
import { Lesson } from "./Lesson";

type Props = { week: Week; timestamps: number[]; day: Day };

export async function Weekday({ week, timestamps, day }: Props) {
  let lessonsAddedAtTimestamp: {
    start: number;
    end: number;
    totalAdded: number;
  }[] = [];

  return (
    <div>
      <div
        className="relative"
        style={{
          width: "var(--lesson-width)",
          minWidth: "var(--lesson-width)",
        }}
      >
        <div className="absolute grid w-full place-items-center  px-2">
          <Badge className="px-6 py-1">{day}</Badge>
        </div>
        <div
          className="absolute h-full"
          style={{ width: "var(--lesson-width)" }}
        >
          {week.lessons.map((lesson, index) => {
            return (
              <Lesson
                key={new URLSearchParams(lesson.time).toString()}
                lesson={lesson}
                timestamps={timestamps}
                lessonsAddedAtTimestamp={lessonsAddedAtTimestamp}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
