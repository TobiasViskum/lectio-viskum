import { getSchools } from "@/lib/scrapeFunctions";
import { RetryButton } from "../RetryButton";
import { Separator } from "@/components/ui/separator";
import { SearchableList } from "./SearchableList";

export async function SchoolList() {
  const schools = await getSchools();

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
