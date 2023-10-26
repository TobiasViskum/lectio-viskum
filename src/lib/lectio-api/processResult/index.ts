import { ReturnType } from "../types/types";

type LectioResult =
  | "No data"
  | "Invalid school"
  | "Forbidden access"
  | "Not authenticated"
  | null
  | { [key: string]: any }
  | { [key: string]: any }[];

export function processResult<T>(lectioResult: LectioResult) {
  if (lectioResult === "No data") {
    return {
      status: "success",
      message: "There was no data",
      data: [],
    } as Prettify<ReturnType<T>>;
  } else if (lectioResult === "Forbidden access") {
    return {
      status: "error",
      message:
        "There was too many requests to Lectio, so Lectio has blocked this user for a few minutes",
    } as Prettify<ReturnType<T>>;
  } else if (lectioResult === "Not authenticated") {
    return {
      status: "error",
      message: "User not authenticated",
    } as Prettify<ReturnType<T>>;
  } else if (lectioResult === "Invalid school") {
    return {
      status: "error",
      message: "School doesn't exist",
    } as Prettify<ReturnType<T>>;
  } else if (lectioResult === null) {
    return {
      status: "error",
      message: "An error happened when trying to get data.",
    } as Prettify<ReturnType<T>>;
  } else {
    return {
      status: "success",
      message: "Successfully retrieved data",
      data: lectioResult,
    } as Prettify<ReturnType<T>>;
  }
}
