import Image from "next/image";

type Props = { assignment: FullAssignment };

export function ClassAndTeacher({ assignment }: Props) {
  return (
    <div className="flex flex-col gap-y-1">
      <div className="flex gap-x-1">
        <p className="font-bold">Klasse:</p>
        <p className="text-muted-foreground">
          {[assignment.subject, assignment.class].join(", ")}
        </p>
      </div>
      <button className="flex w-max items-center gap-x-2 rounded-md py-2 pl-1 pr-3 transition-colors hover:bg-accent focus:bg-accent">
        <Image
          src={assignment.teacher.imgSrc}
          width={48}
          height={48}
          alt="img"
          className="obj aspect-square rounded-full object-cover"
        />
        <p className="text-xl font-medium">{assignment.teacher.name}</p>
      </button>
    </div>
  );
}
