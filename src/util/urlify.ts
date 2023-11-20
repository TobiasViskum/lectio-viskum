export function urlify(text: string) {
  const linkTw = "text-link font-medium hover:underline";

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
