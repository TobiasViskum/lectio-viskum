type FormResponse = { status: "idle" | "loading" | "success" | "error"; message: string };

type APIResponse<T> = { message: string } & ({ status: "error" } | { status: "success"; data: T | null });

type APIProps<T> = { tag?: string } & T;
