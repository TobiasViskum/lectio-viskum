import { capitalizeFirstLetter } from "@/util/capitalizeFirstLetter";

export function LessonTime({
  time,
  lessonNumber,
}: {
  time: LessonTime;
  lessonNumber: number;
}) {
  const isSameDate = time.startDate.getDate() === time.endDate.getDate();

  if (isSameDate) {
    const formattedStartDate = new Intl.DateTimeFormat("da-dk", {
      dateStyle: "full",
    }).format(time.startDate);
    const formattedStartTime = new Intl.DateTimeFormat("da-dk", {
      timeStyle: "short",
    }).format(time.startDate);
    const formattedEndTime = new Intl.DateTimeFormat("da-dk", {
      timeStyle: "short",
    }).format(time.endDate);

    return (
      <div>
        <p className="text-sm text-muted-foreground">
          {capitalizeFirstLetter(formattedStartDate)}
        </p>
        <p className="text-lg font-semibold text-muted-foreground">
          {lessonNumber !== -1 && `${lessonNumber}. Modul, `}
          {formattedStartTime} - {formattedEndTime}
        </p>
      </div>
    );
  } else {
    const formattedStartDate = new Intl.DateTimeFormat("da-dk", {
      dateStyle: "long",
      timeStyle: "short",
    }).format(time.startDate);

    const formattedEndDate = new Intl.DateTimeFormat("da-dk", {
      dateStyle: "long",
      timeStyle: "short",
    }).format(time.endDate);

    return (
      <div className="flex flex-col gap-y-1">
        <div className="grid grid-cols-[50px_1fr] text-muted-foreground">
          <p className="font-bold">Start:</p>
          <p>{capitalizeFirstLetter(formattedStartDate)}</p>
        </div>
        <div className="grid grid-cols-[50px_1fr] text-muted-foreground">
          <p className="font-bold">Slut:</p>
          <p>{capitalizeFirstLetter(formattedEndDate)}</p>
        </div>
      </div>
    );
  }
}
