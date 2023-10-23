export type ReturnType<T> =
  | Prettify<{
      status: "error";
      message: string;
    }>
  | Prettify<{
      status: "success";
      message: string;
      data: T | null;
    }>;
