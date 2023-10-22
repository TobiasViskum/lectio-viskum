type Props = { assignmentPromise: Promise<FullAssignment | null> };
export async function AssignmentTitle({ assignmentPromise }: Props) {
  const assignment = await assignmentPromise;

  if (assignment === null) return <p>Error</p>;

  return <h1 className="text-2xl font-bold md:text-3xl">{assignment.title}</h1>;
}
