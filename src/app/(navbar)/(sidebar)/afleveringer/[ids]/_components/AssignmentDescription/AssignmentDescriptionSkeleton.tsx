import { getLectioProps } from "@/lib/auth/getLectioProps";
import { NoDataSkeleton } from "./NoDataSkeleton";
import { getRedisClient } from "@/lib/get-redis-client";
import { getAssignmentTag } from "@/api-functions/getTags";
import { urlify } from "@/util/urlify";
import { getCachedAssignment } from "@/cache-functions/getCachedAssignment";

type Props = {
  assignmentId: string;
};

export async function AssignmentDescriptionSkeleton({ assignmentId }: Props) {
  let assignment = await getCachedAssignment(assignmentId);

  if (assignment === null) {
    return null;
  }

  return (
    <div className="flex max-w-3xl flex-col gap-y-1">
      <p className="font-medium">Opgavebeskrivelse:</p>
      <p
        className="text-sm text-muted-foreground"
        dangerouslySetInnerHTML={{
          __html: urlify(assignment.description.join("<br/>")),
        }}
      ></p>
    </div>
  );
}
