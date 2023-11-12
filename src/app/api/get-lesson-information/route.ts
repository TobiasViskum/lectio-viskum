import { lectioAPI } from "@/lib/lectio-api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const lessonId = searchParams.get("lessonId");
  const userId = searchParams.get("userId");
  const year = searchParams.get("year");

  if (lessonId && userId && year) {
    const lesson = await lectioAPI.getLessonById({
      lessonId: lessonId,
      userId: userId,
      year: year,
    });

    return NextResponse.json(lesson);
  }
  return NextResponse.json(null);
}
