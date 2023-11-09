type StandardProps = Prettify<{
  lectioCookies: string;
  schoolCode: string;
  userId: string;
}>;

type AuthProps = Prettify<{
  username: string;
  password: string;
  schoolCode: string;
}>;

type School = Prettify<{
  schoolCode: string;
  name: string;
}>;

type LectioAuth = Prettify<{
  isAuthenticated: boolean;
  lectioCookies: string;
  studentId: string;
}>;

type Student = Prettify<{
  name: string;
  studentClass: string;
  imgUrl: string;
  imgSrc: string | null;
}>;

type Teacher = Prettify<{
  name: string;
  initials: string;
  teacherId: string;
  imgUrl: string;
  imgSrc: string;
}>;
type LectioDocument = Prettify<{ name: string; href: string }>;
type LessonStatus = Prettify<"changed" | "cancelled" | "normal">;
type LessonTime = Prettify<{
  startDate: Date;
  endDate: Date;
}>;
type SchoolClass = Prettify<{
  class: string;
  fullClass: string;
  subject: string;
  classId: string;
}>;
type Lesson = Prettify<{
  id: string;
  status: LessonStatus;
  time: LessonTime;
  teachers: Teacher[];
  classrooms: string[];
  classes: string[];
  title: string;
  subjects: string[];
  hasNote: boolean;
  hasHomework: boolean;
  hasOtherContent: boolean;
  hasPresentation: boolean;
  overlappingLessons: number;
  hasPossibleTest: boolean;
}>;
type Week = Prettify<{ lessons: Lesson[]; notes: string[] }>;

type Assignment = Prettify<{
  week: string;
  class: string;
  href: string;
  subject: string;
  title: string;
  dueTo: string;
  studentTime: string;
  description: string;
  status: string;
  absence: string;
  awaiter: string;
  grade: string;
  gradeNote: string;
  id: string;
}>;

type Submit = Prettify<{
  time: string;
  submitter: string;
  comment: string;
  document: LectioDocument;
}>;
type FullAssignment = Prettify<{
  studentName: string;
  title: string;
  documents: LectioDocument[];
  description: string[];
  subject: string;
  class: string;
  gradeSystem: string;
  teacher: Teacher;
  studentTime: number;
  dueTo: string;
  inTeachingDescription: boolean;
  awaiter: string;
  status: string;
  absence: string;
  finished: boolean;
  grade: string;
  gradeNote: string;
  studentNote: string;
  submits: Submit[];
}>;

type LessonText = {
  text: string;
  href: string;
  isTitle: boolean;
  isBold: boolean;
};
type LessonVideo = {
  thumbnail: string;
  videoHref: string;
  aspectRatio: string;
};
type LessonTable = { tableContent: LessonText[][] };
type LessonList = { listContent: LessonHomework; listType: "ol" | "ul" | "" };
type LessonImage = { img: string; width: number; height: number };

type LessonHomework = Prettify<
  (
    | Prettify<LessonText>
    | Prettify<LessonTable>
    | Prettify<LessonList>
    | Prettify<LessonImage>
    | Prettify<LessonVideo>
  )[]
>;
type AdditionalLessonInfo = Prettify<{
  title: string;
  status: string;
  time: { startDate: Date; endDate: Date };
  lessonNumber: number;
  teachers: Teacher[];
  classes: SchoolClass[];
  subjects: string[];
  classrooms: string[];
}>;
type FullLesson = Prettify<
  AdditionalLessonInfo & {
    subjectTheme: {
      theme: string;
      themeId: string;
    };
    note: string[];
    homework: LessonHomework[];
    other: LessonHomework[];
    presentation: LessonHomework[][];
  }
>;
