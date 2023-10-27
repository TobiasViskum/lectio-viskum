type StandardProps = Prettify<{
  lectioCookies: string;
  schoolCode: string;
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

type Homework = Prettify<{
  titleHref: string;
  title: string;
  description: (string | string[] | { img: string })[];
}>;
