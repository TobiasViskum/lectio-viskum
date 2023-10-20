type StandardProps = Prettify<{
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
}>;

type Student = Prettify<{
  name: string;
  studentClass: string;
  imgSrc: string;
}>;

type Teacher = Prettify<{
  name: string;
  initials: string;
  teacherId: string;
  imgUrl: string;
  imgSrc: string;
}>;

type LessonStatus = Prettify<"changed" | "cancelled" | "normal">;
type LessonTime = Prettify<{
  date: string;
  startTime: string;
  endTime: string;
}>;
type Lesson = Prettify<{
  href: string;
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

type SubmittedDocument = Prettify<{ name: string; href: string }>;
type FullAssignment = Prettify<{
  title: string;
  documents: SubmittedDocument[];
  description: string[];
  subject: string;
  class: string;
  gradeSystem: string;
  teacher: Teacher;
  studentTime: number;
  dueTo: { date: string; time: string };
  inTeachingDescription: boolean;
  awaiter: string;
  status: string;
  absence: string;
  finished: boolean;
  grade: string;
  gradeNote: string;
  studentNote: string;
  submits: {
    time: { date: string; time: string };
    submitter: string;
    comment: string;
    document: SubmittedDocument;
  }[];
}>;
