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
    | { status: "success"; data: T | null }
  )
>;

type APIProps<T> = Prettify<{ tag?: string } & T>;

type Day =
  | "Mandag"
  | "Tirsdag"
  | "Onsdag"
  | "Torsdag"
  | "Fredag"
  | "Lørdag"
  | "Søndag";
