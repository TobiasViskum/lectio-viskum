type Props = {
  schoolPromise?: Promise<School | null>;
  name?: string;
};

export async function Title({ name, schoolPromise }: Props) {
  const titleTw = "sm:text-4xl text-3xl leading-snug font-semibold flex flex-col [text-wrap:balance] text-center";

  if (name) {
    return (
      <>
        <h1 className={titleTw}>{name}</h1>
      </>
    );
  } else if (schoolPromise) {
    const school = await schoolPromise;
    if (school === null) return <>Error</>;
    return (
      <>
        <h1 className={titleTw}>{school.name}</h1>
      </>
    );
  }
}
