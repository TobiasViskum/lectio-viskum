import { Lesson } from "./Lesson";

type Props = { week: Week; timestamps: number[] };

export async function Weekday({ week, timestamps }: Props) {
  let lessonsAddedAtTimestamp: { start: number; end: number; totalAdded: number }[] = [];

  return (
    <>
      <div style={{ width: "var(--lesson-width)", minWidth: "var(--lesson-width)" }}>
        <div className="h-full absolute" style={{ width: "var(--lesson-width)" }}>
          {week.lessons.map((lesson, index) => {
            return <Lesson key={new URLSearchParams(lesson.time).toString()} lesson={lesson} timestamps={timestamps} lessonsAddedAtTimestamp={lessonsAddedAtTimestamp} />;
          })}
        </div>
      </div>
    </>
  );
}
