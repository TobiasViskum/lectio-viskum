type Props = { assignment: FullAssignment };

export function AssignmentDescription({ assignment }: Props) {
  function urlifyNote(text: string) {
    const linkTw = "text-blue-400 font-medium";

    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const siteRegex = /https?:\/\/(.*)\//;

    return text.replace(urlRegex, function (url: string) {
      let title = url;
      const siteMatch = text.match(siteRegex);
      if (siteMatch) {
        title = siteMatch[1];
      }

      return `<a class="${linkTw}" href=${url}>${title}</a>`;
    });
  }

  if (assignment.description.length === 0) return null;
  if (assignment.description.length === 1 && assignment.description[0] === "")
    return null;

  return (
    <div className="flex flex-col gap-y-1">
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
