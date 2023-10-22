import { Submit } from "./Submit";

type Props = { assignment: FullAssignment };

export function AssignmentSubmits({ assignment }: Props) {
  return (
    <div className="flex flex-col gap-y-4">
      <p className="font-medium">Indlæg:</p>

      {assignment.submits.map((submit) => {
        const key = JSON.stringify(submit.time);
        return <Submit key={key} submit={submit} />;
      })}
    </div>
  );
}
