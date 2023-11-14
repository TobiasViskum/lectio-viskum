import { Badge } from "@/components/ui/badge";
import { Lesson } from "./Lesson";

type Props = { week: Week; timestamps: number[]; day: string; userId: string };

export function getDateFromWeekAndYear(week: number, year: number): Date {
  const dowOffset = 0;
  let date = new Date(year, 0, 1 + (week - 1) * 7);
  let day = date.getDay() - dowOffset;
  day = day >= 0 ? day : day + 7;

  if (day < 4) {
    date.setDate(date.getDate() - date.getDay() + 1);
  } else {
    date.setDate(date.getDate() + (8 - date.getDay()));
  }

  return date;
}

export async function Weekday({ week, timestamps, day, userId }: Props) {
  let lessonsAddedAtTimestamp: {
    start: number;
    end: number;
    totalAdded: number;
  }[] = [];
  const monday = getDateFromWeekAndYear(46, 2023);

  return (
    <div className="flex min-w-full sm:min-w-1/2 lg:min-w-1/3 xl:min-w-1/4 2xl:min-w-1/5">
      <div className="relative w-full">
        <div className="absolute grid w-full place-items-center px-2 ">
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
                userId={userId}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
