import { Badge } from "@/components/ui/badge";
import { Lesson } from "./Lesson";
import { capitalizeFirstLetter } from "@/util/capitalizeFirstLetter";
import { Dot } from "lucide-react";
import Link from "next/link";

type Props = { week: Week; timestamps: number[]; userId: string };

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

export async function Weekday({ week, timestamps, userId }: Props) {
  return (
    <div className="min-w-full sm:min-w-1/2 lg:min-w-1/3 xl:min-w-1/4 2xl:min-w-1/5">
      {/* <div className="flex w-full flex-col items-center gap-y-2">
        <div className="text-center">
          <p className="text-lg font-medium text-muted-foreground">{weekDay}</p>
          <p className="text-sm text-muted-foreground">{formattedDate}</p>
        </div>
        <div className="flex flex-col items-center text-center text-xs">
          {week.notes.map((note) => {
            if (note.lessonId === "") {
              return (
                <div key={note.text} className="flex items-center">
                  <Dot /> {note.text}
                </div>
              );
            }
            return (
              <Link
                href={`/skema/elev/${userId}/modul/${note.lessonId}`}
                key={note.text}
                className="flex items-center text-link hover:underline"
              >
                <Dot /> {note.text}
              </Link>
            );
          })}
        </div>
      </div> */}
      <div className="relative z-50 flex h-full w-full justify-between">
        {week.lessons.map((lesson, index) => {
          return (
            <Lesson
              key={lesson.id}
              lesson={lesson}
              timestamps={timestamps}
              userId={userId}
            />
          );
        })}
      </div>
    </div>
  );
}
