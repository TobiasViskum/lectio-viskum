import { Input } from "@/components/ui/input";
import { getLectioProps } from "@/lib/auth/getLectioProps";
import { lectioAPI } from "@/lib/lectio-api";
import { StudentFeedback } from "./StudentFeedback";
import { getStudentFeedback } from "@/api-functions/scrapeFunctions/getStudentFeedback";

type Props = {
  params: {
    userId: string;
    id: string;
  };
};

export default async function StudentFeedbackPage({ params }: Props) {
  const lectioProps = getLectioProps();
  const lesson = await lectioAPI.getLessonById({
    lessonId: params.id,
    lectioCookies: lectioProps.lectioCookies,
    schoolCode: lectioProps.schoolCode,
    userId: params.userId,
    year: "2023",
  });

  if (lesson === null) {
    return <p>An error happened</p>;
  }

  getStudentFeedback({
    lectioCookies: lectioProps.lectioCookies,
    userId: params.userId,
    schoolCode: lectioProps.userId,
    lessonId: params.id,
  });

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
          <StudentFeedback />
        </div>
      </div>
    </div>
  );
}
