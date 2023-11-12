import { getHomework } from "@/api-functions/scrapeFunctions/getHomework";

export default async function HomeworkPage() {
  const d = await getHomework();

  return <h1>Lektier</h1>;
}
