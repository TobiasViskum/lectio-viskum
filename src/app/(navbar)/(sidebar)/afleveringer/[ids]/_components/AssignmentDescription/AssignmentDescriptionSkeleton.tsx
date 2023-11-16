import { urlify } from "@/util/urlify";
import { getPageState } from "../../page-state";

export async function AssignmentDescriptionSkeleton() {
  const pageState = getPageState();

  const cachedAssignment = await pageState.cachedAssignment;

  if (cachedAssignment === null) {
    return null;
  }

  return (
    <div className="flex max-w-3xl flex-col gap-y-1">
      <p className="font-medium">Opgavebeskrivelse:</p>
      <p
        className="text-sm text-muted-foreground"
        dangerouslySetInnerHTML={{
          __html: urlify(cachedAssignment.description.join("<br/>")),
        }}
      ></p>
    </div>
  );
}
