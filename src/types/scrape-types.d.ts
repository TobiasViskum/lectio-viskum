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
  studentId: string;
  imgUrl: string;
  imgSrc: string;
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
  hasNote: boolean;
  hasHomework: boolean;
  hasOtherContent: boolean;
  hasPresentation: boolean;
  styling: {
    overlappingLessons: number;
    position: number;
  };
}>;
type Week = Prettify<{
  lessons: Lesson[];
  notes: { text: string; lessonId: string }[];
  date: Date;
}>;

type Assignment = Prettify<{
  week: string;
  class: string;
  href: string;
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
  time: Date;
  submitter: Teacher | Student;
  comment: string;
  document: LectioDocument;
}>;
type FullAssignment = Prettify<{
  title: string;
  documents: LectioDocument[];
  description: string[];
  class: string;
  gradeSystem: string;
  assignmentId: string;
  teacher: Teacher;
  students: (Student & { isRemovable: boolean })[];
  groupMembersToAdd: { name: string; studentId: string }[];
  studentTime: number;
  dueTo: Date;
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

  color: string;
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
    | Prettify<{ html: string }>
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
  students: Student[];
  teachers: Teacher[];
  classes: SchoolClass[];
  subjects: string[];
  classrooms: string[];
}>;
type FullLesson = Prettify<
  AdditionalLessonInfo & {
    id: string;
    subjectTheme: {
      theme: string;
      themeId: string;
    };
    note: string[];
    homework: string[];
    other: string[];
    presentation: string[];
  }
>;

type StudentFeedback = Prettify<{
  title: string;
  content: string[];
}>;

type ClassInformation = Prettify<{
  teachers: Teacher[];
  students: Student[];
}>;

type Subject = Prettify<{ shortName: string; fullName: string }>;

type FrontPageInformation = Prettify<{
  importantInformation: string[][];
  unreadMessages: [];
  education: {
    nextAssignments: { title: string; dueTo: Date; schoolClass: SchoolClass }[];
    nextHomework: { title: string; dueTo: Date; schoolClass: SchoolClass }[];
  };
}>;

type Message = Prettify<{
  title: string;
  latestSender: string;
  sender: string;
  receivers: string;
  latestChange: string;
  isUnread: boolean;
  id: string;
  eventArgument: { [key: string]: string };
}>;
