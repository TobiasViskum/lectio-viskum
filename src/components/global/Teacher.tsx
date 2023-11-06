import Image from "next/image";

export function Teacher({ teacher }: { teacher: Teacher }) {
  return (
    <button className="flex w-max items-center gap-x-2 rounded-lg py-2 pl-1 pr-3 transition-colors hover:bg-accent">
      <Image
        src={teacher.imgSrc}
        width={48}
        height={48}
        alt="img"
        className="obj aspect-square rounded-full object-cover"
      />
      <div className="flex flex-col text-start">
        <p className="text-lg font-medium">{teacher.name}</p>
        <p className="text-sm text-muted-foreground">{teacher.initials}</p>
      </div>
    </button>
  );
}
