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
    <div className="flex min-w-full sm:min-w-1/2 lg:min-w-1/3 xl:min-w-1/4 2xl:min-w-1/5">
      <div className="relative w-full">
        <div className="absolute grid w-full place-items-center  px-2">
          <Badge className="px-6 py-1">{day}</Badge>
        </div>
        <div className="absolute z-50 flex h-full w-full justify-between">
          {week.lessons.map((lesson, index) => {
            return (
              <Lesson
                key={lesson.id}
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
