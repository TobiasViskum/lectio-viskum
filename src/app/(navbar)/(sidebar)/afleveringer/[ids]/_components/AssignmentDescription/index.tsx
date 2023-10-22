type Props = { assignmentPromise: Promise<FullAssignment | null> };

export async function AssignmentDescription({ assignmentPromise }: Props) {
  const assignment = await assignmentPromise;

  if (assignment === null) return <p>Error</p>;

  function urlifyNote(text: string) {
    const linkTw = "text-blue-400 font-medium";

    const urlRegex = /(https?:\/\/[^\s<]+)/g;

    return text.replace(urlRegex, function (url: string) {
      let title = url;
      const domainRegex =
        /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/im;
      const match = url.match(domainRegex);

      if (match) {
        title = match[1];
      }

      return `<a class="${linkTw}" href=${url} target="_blank" >${title}</a>`;
    });
  }

  if (assignment.description.length === 0) return null;
  if (assignment.description.length === 1 && assignment.description[0] === "")
    return null;

  return (
    <div className="flex max-w-3xl flex-col gap-y-1">
      <p className="font-medium">Opgavebeskrivelse:</p>
      <p
        className="text-sm text-muted-foreground"
        dangerouslySetInnerHTML={{
          __html: urlifyNote(assignment.description.join("<br/>")),
        }}
      ></p>
    </div>
  );
}
