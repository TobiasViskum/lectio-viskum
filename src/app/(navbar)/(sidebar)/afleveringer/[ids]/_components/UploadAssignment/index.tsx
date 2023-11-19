import { getPageState } from "../../page-state";
import { UploadButton } from "./UploadButton";

type Props = {
  inSidebar?: boolean;
};

export async function UploadAssignment({ inSidebar = false }: Props) {
  const pageState = getPageState();

  let assignment = await pageState.assignment;
  if (assignment === null) {
    assignment = await pageState.cachedAssignment;
  }
  if (assignment === null) {
    return null;
  }

  if (assignment.finished) return null;

  return (
    <>
      <UploadButton
        assignmentId={assignment.assignmentId}
        inSidebar={inSidebar}
      />
    </>
  );
}
