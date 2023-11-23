import { getPageState } from "../../page-state";
import { UploadButton } from "./UploadButton";

export async function UploadAssignmentSkeleton() {
  const pageState = getPageState();
  const assignment = await pageState.cachedAssignment;

  if (assignment === null) return null;

  return (
    <>
      <UploadButton assignmentId={assignment.assignmentId} />
    </>
  );
}
