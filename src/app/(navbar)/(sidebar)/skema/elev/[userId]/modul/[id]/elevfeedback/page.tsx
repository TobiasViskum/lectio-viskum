import { lectioAPI } from "@/lib/lectio-api";
import { StudentFeedback } from "./_components/StudentFeedback";
import { getStudentFeedback } from "@/api-functions/scrapeFunctions/getStudentFeedback";

type Props = {
  params: {
    userId: string;
    id: string;
  };
};

export default async function StudentFeedbackPage({ params }: Props) {
  const lessonPromise = lectioAPI.getLessonById({
    lessonId: params.id,
    userId: params.userId,
    year: "2023",
  });
  const studentFeedbackPromise = getStudentFeedback({
    lessonId: params.id,
  });

  const [lesson, studentFeedback] = await Promise.all([
    lessonPromise,
    studentFeedbackPromise,
  ]);

  if (lesson === null || studentFeedback === null) {
    return <p>An error happened</p>;
  }

  return (
    <div>
      <h1 className="pt-4 text-3xl">Elevfeedback</h1>
      <h2 className="py-2 text-xl text-muted-foreground">
        {lesson.subjects.length !== 0
          ? [
              lesson.subjects.join(", "),
              lesson.title ? [", ", lesson.title].join("") : "",
            ].join("")
          : lesson.title}
      </h2>

      <div className="flex flex-col py-4">
        <div>
          <StudentFeedback studentFeedback={studentFeedback} />
        </div>
      </div>
    </div>
  );
}
