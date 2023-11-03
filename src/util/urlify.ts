export function urlifyNote(text: string) {
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
