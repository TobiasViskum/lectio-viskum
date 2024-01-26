import { getLastAuthenticatedCookie } from "@/api-functions/getLastAuthenticatedCookie";
import { urlify } from "@/util/urlify";

export async function getHomework(
  $parent: cheerio.Cheerio,
  $: cheerio.Root,
  homework: string[],
) {
  const $sibling = $parent.next();

  if ($sibling.length === 0) return; //We have went through all elements
  if (
    $sibling.find("h1:first-child").length === 0 &&
    $sibling.find("h1:nth-child(2)").length === 1
  )
    return; //We have switched between result type

  const id = $sibling.attr("id");

  if (id && id.includes("ACH")) {
    const $article = $sibling.children().first();

    const res = await setDescription($article, $);
    homework.push(res);
    await getHomework($sibling, $, homework);
  } else if ($sibling.hasClass("ls-hr-solid")) {
    await getHomework($sibling, $, homework);
  }
}
export async function getHomeworkAndOtherAndPresentation($: cheerio.Root) {
  type ResultHolder = {
    homework: string[];
    other: string[];
    presentation: string[];
  };

  let resultHolder: ResultHolder = {
    homework: [],
    other: [],
    presentation: [],
  };

  const sectionHeadings = $("h1.ls-paper-section-heading");

  for (let i = 0; i < sectionHeadings.length; i++) {
    let homework: string[] = [];

    const elem = sectionHeadings[i];
    const $elem = $(elem);
    const $parent = $elem.parent();
    const resultType = $elem.text();

    if (resultType === "Lektier" || resultType === "Øvrigt indhold") {
      await getHomework($parent, $, homework);
    } else {
      const $sibling = $parent.next();
      if ($sibling.length !== 0) {
        const $presentationsHolder = $sibling
          .children()
          .eq(1)
          .children()
          .eq(1)
          .find("section");

        for (let j = 0; j < $presentationsHolder.length; j++) {
          const section = $presentationsHolder[j];
          const $section = $(section);

          homework.push(await setDescription($section, $));
        }
      }
    }

    if (resultType === "Lektier") {
      resultHolder.homework = homework;
    } else if (resultType === "Øvrigt indhold") {
      resultHolder.other = homework;
    } else if (resultType === "Præsentation") {
      resultHolder.presentation = homework;
    }
  }

  return resultHolder;
}

async function setDescription($article: cheerio.Cheerio, $: cheerio.Root) {
  const tw = "@md:text-2xs";

  const styleMap: { [key: string]: string } = {
    h1: "text-lg md:text-xl py-2 break-all",
    h2: "text-lg md:text-xl py-2 break-all",
    h3: "",
    h4: "",
    h5: "",
    h6: "",
    p: "text-foreground",
    a: "text-link hover:underline cursor-pointer text-left",
    ul: "pl-12 list-disc",
    ol: "pl-12 list-decimal",
    table: "text-xs",
    tbody: "text-xs rounded-md overflow-x-hidden",
    tr: "text-xs first:border-t border-b",
    td: "text-xs py-2 md:px-2 first:border-l border-r",
    iframe: "w-full",
  };

  const $elements = $article.find("*");

  for (let i = 0; i < $elements.length; i++) {
    const elem = $elements[i];
    const $elem = $(elem);

    if (elem.type === "tag") {
      let color = "";

      if (elem.name === "img") {
        const newHtml = $elem.attr("data-embed-xhtml");
        if (newHtml) {
          const $temp = $(newHtml);
          const width = Number($temp.attr("width"));
          const height = Number($temp.attr("height"));
          const aspectRatio = (width || 1) / (height || 0);

          $elem.replaceWith(
            `<style>
              .videoClass {
                aspect-ratio: ${aspectRatio} / 1;
                width: 100%;
                height: 100%;
                max-width: 500px;
              }
            </style>` +
              newHtml
                .replace("autoplay=1", "")
                .replace(/class=\".*\"/, `class="videoClass"`),
          );

          continue;
        }
      }
      if (elem.name === "a") {
        $elem.attr("target", "_blank");
      }

      const attrs = $elem.attr();

      for (let attr in attrs) {
        if (attr === "style") {
          let colorMatch = $elem.attr(attr)!.match(/color:( )?(.*)(;)?/i);

          if (colorMatch) {
            color = colorMatch[2];
          }
        }

        if (attr === "href") {
          const href = $elem.attr(attr)!;
          if (href.includes("/lectio/")) {
            $elem.replaceWith(
              `<button data-lectio-href="${href}" class="${
                styleMap["a"]
              }">${$elem.text().trim()}</button>`,
            );
          }
          continue;
        }
        if (attr === "width") continue;
        if (attr === "height") continue;
        if (attr === "target") continue;
        if (attr === "src") {
          const src = $elem.attr(attr)!;
          if (src.includes("/lectio/")) {
            const base64String = await fetch("https://www.lectio.dk" + src, {
              method: "GET",
              headers: { Cookie: getLastAuthenticatedCookie() },
            })
              .then(async (res) => {
                const arrayBuffer = await res.arrayBuffer();
                const contentType = res.headers.get("content-type");

                const base64 = Buffer.from(arrayBuffer).toString("base64");
                const fullSrc = `data:${contentType};base64,${base64}`;

                return fullSrc;
              })
              .catch(() => null);
            if (base64String) {
              $elem.attr(attr, base64String);
            }
          }

          continue;
        }

        $elem.removeAttr(attr);
      }
      if (color !== "" && color !== "black") {
        $elem.attr("style", `color:${color}`);
      }

      if ($elem.text().trim().length === 0) {
        $elem.remove();
      }

      $elem.attr("class", styleMap[elem.name]);
    }
  }

  return urlify($article.html() || "");
}
