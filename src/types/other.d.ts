type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

type FormResponse = {
  status: "idle" | "loading" | "success" | "error";
  message: string;
};

type APIResponse<T> = Prettify<
  { message: string } & (
    | { status: "error" }
    | { status: "success"; data: T | null; lectioCookies: string }
  )
>;

type RegularAPIResponse<T> = Prettify<
  { message: string } & ({ status: "error" } | { status: "success"; data: T })
>;
type NoDataAPIResponse = Prettify<{
  status: "success" | "error";
  message: string;
}>;

type XSidebar = Prettify<
  "none" | "all-assignments" | "assignment" | "lesson" | "student-feedback"
>;

type RedisCache<T> = Prettify<{ data: T; expires: number } | undefined>;

type Day =
  | "Mandag"
  | "Tirsdag"
  | "Onsdag"
  | "Torsdag"
  | "Fredag"
  | "Lørdag"
  | "Søndag";

type Pages =
  | "front"
  | "schedule"
  | "absence-overview"
  | "absence-reasons"
  | "assignments"
  | "homework"
  | "grades-overview"
  | "grades-messages"
  | "borrowed-books"
  | "questionnaire"
  | "messages-newest"
  | "messages-unread"
  | "messages-sent"
  | "messages-favorites"
  | "messages-all"
  | "messages-deleted"
  | "studyPlan-calender"
  | "studyPlan-educationDescription"
  | "studyPlan-studyDirection"
  | "studyPlan-elective"
  | "teachers";

type GetPageReturn =
  | "Not authenticated"
  | "Invalid school"
  | "No data"
  | "Forbidden access"
  | {
      $: cheerio.Root;
      fetchCookie: FetchCookieImpl<RequestInfo | URL, RequestInit, Response>;
    }
  | null;

type MessagesTypes =
  | "all"
  | "unread"
  | "sent"
  | "newest"
  | "deleted"
  | "favorites";

type CacheMap<T = any> = Map<string, { data: T; expires: number }>;
