"use server";
import { lectioAPI } from "@/lib/lectio-api";
import z from "zod";

type Props = {
  username: FormDataEntryValue | null;
  password: FormDataEntryValue | null;
  schoolCode: string;
};

export async function handleLogin(props: Props) {
  try {
    const data = z.object({ username: z.string(), password: z.string(), schoolCode: z.string() }).parse(props);

    const isAuthenticated = await lectioAPI.getIsAuthenticated(data, true);

    return isAuthenticated;
  } catch {
    return { status: "error", message: "Invalid parameters" } as APIResponse<LectioAuth>;
  }
}
