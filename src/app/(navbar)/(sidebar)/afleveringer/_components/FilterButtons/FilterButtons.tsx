import { Buttons } from "./Buttons";

type Props = {
  assignmentsPromise: Promise<Assignment[] | null>;
};

export async function FilterButtons({ assignmentsPromise }: Props) {
  const assignments = await assignmentsPromise;

  return (
    <>
      <Buttons strAssignments={JSON.stringify(assignments)} />
    </>
  );
}
