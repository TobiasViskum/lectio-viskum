import { getCachedAssignment } from "@/cache-functions/getCachedAssignment";
import { lectioAPI } from "@/lib/lectio-api";
import { AssignmentTitleSkeleton } from "./AssignmentTitleSkeleton";

type Props = { assignmentId: string; title: string | undefined };
export async function AssignmentTitle({ assignmentId, title }: Props) {
  let assignment = await lectioAPI.getAssignment.byId({
    assignmentId: assignmentId,
  });

  if (assignment === null) {
    assignment === (await getCachedAssignment(assignmentId));
  }
  if (assignment === null) {
    return <AssignmentTitleSkeleton title={title} />;
  }

  return <h1 className="text-2xl font-bold md:text-3xl">{assignment.title}</h1>;
}
