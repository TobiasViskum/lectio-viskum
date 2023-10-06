import { getSchools } from "@/lib/scrapeFunctions";
import { NextResponse } from "next/server";

export async function GET() {
  const schools = await getSchools();
  return NextResponse.json(schools);
}
