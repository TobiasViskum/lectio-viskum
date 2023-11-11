"use server";

import { lectioAPI } from "@/lib/lectio-api";
export async function getAllSchools() {
  const schools = await lectioAPI.getAllSchools();

  return schools;
}
