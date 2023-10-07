import { RetryButton } from "../RetryButton";
import { SearchableList } from "./SearchableList";
import { lectioAPI } from "@/lib/lectio-api";

export async function SchoolList() {
  const schools = await lectioAPI.getAllSchools();

  return (
    <>
      <div className={schools === null ? "block" : "hidden"}>
        <p className="pt-4 font-medium  text-red-400 text-sm">An error happened</p>
        <RetryButton />
      </div>
      <div className={schools === null ? "hidden" : "block"}>
        <SearchableList strSchools={JSON.stringify(schools)} />
      </div>
    </>
  );
}
