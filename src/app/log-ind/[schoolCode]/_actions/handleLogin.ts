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
    const data = z
      .object({
        username: z.string(),
        password: z.string(),
        schoolCode: z.string(),
      })
      .parse(props);

    const res = await lectioAPI.getIsAuthenticated(data);
    const expireDate = new Date();
    expireDate.setFullYear(expireDate.getFullYear() + 3);

    if (res) {
      global.userSessions.set(res.studentId, {
        data: {
          lectioCookies: res.lectioCookies,
          schoolCode: props.schoolCode,
        },
        expires: expireDate.getTime(),
      });
    }

    return res;
  } catch {
    return null;
  }
}
