import { RetryButton } from "../RetryButton";
import { SearchableList } from "./SearchableList";
import { lectioAPI } from "@/lib/lectio-api";

export async function SchoolList() {
  const schools = await lectioAPI.getAllSchools();

  if (schools === null) {
    return (
      <div>
        <p className="pt-4 font-medium  text-red-400 text-sm">An error happened</p>
        <RetryButton />
      </div>
    );
  }

  return (
    <>
      <div>
        <SearchableList strSchools={JSON.stringify(schools)} />
      </div>
    </>
  );
}
