import { Teacher } from "@/components/global/Teacher";

type Props = {
  assignment: FullAssignment;
};

export function Content({ assignment }: Props) {
  return (
    <div className="flex flex-col gap-y-1 md:hidden">
      <div className="flex gap-x-1">
        <p className="font-bold">Klasse:</p>
        <p className="text-muted-foreground">
          {[assignment.subject, assignment.class].join(", ")}
        </p>
      </div>
      <div className="w-max">
        <Teacher teacher={assignment.teacher} />
      </div>
    </div>
  );
}
