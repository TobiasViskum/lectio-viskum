export function getSubjectTheme($: cheerio.Root) {
  const $theme = $('a[title="Tilknyttet forløb"]');
  const name = $theme.text();
  const href = $theme.attr("href");
  let themeId = "";
  if (href) {
    const themeIdMatch = href.match(/phaseid=([0-9]+)/);
    if (themeIdMatch) {
      themeId = themeIdMatch[1];
    }
  }

  if (name !== "" && href) {
    return { theme: name.trim(), themeId: themeId };
  } else {
    return { theme: "", themeId: "" };
  }
}
