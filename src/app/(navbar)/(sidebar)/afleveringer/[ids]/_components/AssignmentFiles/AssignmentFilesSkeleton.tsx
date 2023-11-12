import { DocumentButton } from "@/components/global/DocumentButton";
import { getLectioProps } from "@/lib/auth/getLectioProps";
import { getRedisClient } from "@/lib/get-redis-client";
import { getAssignmentTag } from "@/lib/lectio-api/getTags";

type Props = {
  assignmentId: string;
};

export async function AssignmentFilesSkeleton({ assignmentId }: Props) {
  let assignment: FullAssignment | null = null;

  const userId = getLectioProps().userId;
  const client = await getRedisClient();
  const tag = getAssignmentTag(userId, assignmentId);
  if (client) {
    const foundCache = (await client.json.get(
      tag,
    )) as RedisCache<FullAssignment>;
    if (foundCache) {
      assignment = foundCache.data;
    }
    await client.quit();
  }

  if (assignment === null) return null;

  return (
    <div>
      <p className="font-medium">Vedhæftede filer:</p>
      <ul className="flex flex-col gap-y-2">
        {assignment.documents.map((item, index) => {
          const key = `${item.href}-${item.name}`;
          return (
            <li key={key} className="flex ">
              <DocumentButton
                className="text-sm"
                strDocument={JSON.stringify(item)}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
