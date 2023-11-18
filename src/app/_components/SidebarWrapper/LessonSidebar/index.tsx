import { Input } from "@/components/ui/input";
import { Content } from "./Content";
import { LoadingDots } from "@/components/loading-components/LoadingDots";
import { getPageState } from "@/app/(navbar)/(sidebar)/skema/elev/[userId]/modul/[id]/page-state";

export async function LessonSidebar() {
  // const [lesson, setLesson] = useState<FullLesson | null>(null);
  // const params = useParams();
  // const path = usePathname();
  // const searchParams = useSearchParams();

  // useEffect(() => {
  //   async function setNewLesson() {
  //     const userId = params.userId;
  //     const lessonId = params.id;
  //     const year = searchParams.get("prevYear");

  //     if (typeof userId === "string" && typeof lessonId === "string" && year) {
  //       try {
  //         const q = new URLSearchParams({
  //           userId: userId,
  //           lessonId: lessonId,
  //           year: year,
  //         }).toString();
  //         const url = "/api/get-lesson-information?" + q;

  //         const res = await fetch(url);
  //         const newLesson = (await res.json()) as FullLesson | undefined;

  //         if (newLesson !== undefined) {
  //           setLesson(newLesson);
  //         }
  //       } catch {
  //         setLesson(null);
  //       }
  //     }
  //   }
  //   setNewLesson();
  // }, [path, params, searchParams]);

  const pageState = getPageState();
  let lesson = await pageState.lesson;

  // if (lesson === null) {
  //   lesson = await pageState.cachedAssignment
  // }

  // const lesson = await lectioAPI.getLessonById()

  return (
    <div className="h-full">
      {lesson !== null ? (
        <Content lesson={lesson} />
      ) : (
        <div className=" w-full animate-pulse opacity-75">
          <div className="flex flex-col items-center gap-y-2 py-2 pb-4 pl-1 pr-3 text-left">
            <p className="w-full text-sm text-muted-foreground">
              Søg efter elever eller lærere:
            </p>
            <Input placeholder="Søg..." />
            <LoadingDots className="mt-8" />
          </div>
        </div>
      )}
    </div>
  );
}
