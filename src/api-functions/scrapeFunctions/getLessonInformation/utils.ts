import { getLastAuthenticatedCookie } from "@/api-functions/getLastAuthenticatedCookie";
import { urlify } from "@/util/urlify";

export async function getHomework(
  $parent: cheerio.Cheerio,
  $: cheerio.Root,
  homework: LessonHomework[],
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
    let currHomework: LessonHomework = [];

    const $article = $sibling.children().first();

    await setDescription($article, currHomework, $);

    homework.push(currHomework);
    await getHomework($sibling, $, homework);
  } else if ($sibling.hasClass("ls-hr-solid")) {
    await getHomework($sibling, $, homework);
  }
}
export async function getHomeworkAndOtherAndPresentation($: cheerio.Root) {
  type ResultHolder = {
    homework: LessonHomework[];
    other: LessonHomework[];
    presentation: LessonHomework[];
  };

  let resultHolder: ResultHolder = {
    homework: [],
    other: [],
    presentation: [],
  };

  const sectionHeadings = $("h1.ls-paper-section-heading");

  for (let i = 0; i < sectionHeadings.length; i++) {
    let homework: LessonHomework[] = [];

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

          let currHomework: LessonHomework = [];
          await setDescription($section, currHomework, $);
          homework.push(currHomework);
        }
      }
    }

    removeEmptyFields(homework);
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

function getDescriptionVideoOrImage($elem: cheerio.Cheerio, $: cheerio.Root) {
  const src = $elem.attr("src");
  const imgHeight = Number($elem.attr("height"));
  const imgWidth = Number($elem.attr("width"));

  const iframe = $elem.attr("data-embed-xhtml");
  let isVideo = iframe !== undefined;

  if (src) {
    let fullSrc = src;
    if (!isVideo && !isNaN(imgHeight) && !isNaN(imgWidth)) {
      return { img: fullSrc, width: imgWidth, height: imgHeight };
    } else if (isVideo) {
      const $iframe = $(iframe);
      const videoHref = $iframe.attr("src") || "";
      const videoHeight = Number($iframe.attr("height"));
      const videoWidth = Number($iframe.attr("width"));

      if (!isNaN(videoHeight) && !isNaN(videoWidth)) {
        return {
          thumbnail: fullSrc,
          videoHref: videoHref.split("?")[0],

          aspectRatio: `1 / ${videoHeight / videoWidth}`,
        } as LessonVideo;
      }
    }
  }
}
async function setDescription(
  $article: cheerio.Cheerio,
  currHomework: LessonHomework,
  $: cheerio.Root,
  listNumber: number = 0,
) {
  const tw = "@md:text-2xs";

  const styleMap: { [key: string]: string } = {
    h1: "text-lg py-2",
    h2: "text-lg py-2",
    h3: "",
    h4: "",
    h5: "",
    h6: "",
    p: "text-foreground",
    a: "text-blue-400 hover:underline cursor-pointer",
    ul: "pl-12 list-disc",
    ol: "pl-12 list-decimal",
    table: "text-xs @container",
    tbody: "text-xs rounded-md overflow-x-hidden",
    tr: "text-xs @sm:text-2xs first:border-t border-b",
    td: "text-xs @sm:text-2xs py-2 md:px-2 first:border-l border-r",
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
        $elem.attr("target", "_top");
        // const href = $elem.attr("href");
        // if (href && href.includes("/lectio/")) {
        //   $elem.attr("href", "https://www.muksiv.dk" + href);
        // }
      }

      const attrs = $elem.attr();

      for (let attr in attrs) {
        if (attr === "style") {
          let colorMatch = $elem.attr(attr)!.match(/color:( )?(.*)(;)?/i);

          if (colorMatch) {
            color = colorMatch[2];
          }
        }

        if (attr === "href") continue;
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

      $elem.attr("class", styleMap[elem.name]);
    }
  }
  //@ts-ignore
  currHomework.push({ content: $article.html() });

  return;
  // const $elements = $article.find("*");
  // $elements.find("br").replaceWith("\n");

  // let isAddingToUl = false;
  // let style = "";
  // let isOnSameLine = false;

  // for (let i = 0; i < $elements.length; i++) {
  //   const elem = $elements[i];
  //   const $elem = $(elem);
  //   const newStyle = $elem.attr("style");
  //   if (newStyle && newStyle !== "") {
  //     style = newStyle;
  //   }

  //   let text = ($elem.text() || "").trim();
  //   let isBold = $elem.find("strong").length >= 1;
  //   let isItalic = $elem.find("em").length >= 1;
  //   let href = $elem.attr("href") || "";
  //   let color = "";
  //   let colorMatch = style.match(/color:( )?(.*)(;)?/i);
  //   if (colorMatch) {
  //     color = colorMatch[2];
  //   }

  //   if ($elem.html() === "&nbsp;") continue;

  //   if (
  //     $elem.parents("ol").length > listNumber ||
  //     $elem.parents("ul").length > listNumber
  //   ) {
  //     continue;
  //   } else if (elem.type === "tag") {
  //     if (elem.name !== "span") {
  //       isOnSameLine = false;
  //     }
  //     if (elem.name === "h1" || elem.name === "h2" || elem.name === "h3") {
  //       const $a = $elem.find("a");

  //       if ($a.length === 0) {
  //         currHomework.push({
  //           isTitle: true,
  //           // isBold: isBold,
  //           text: $elem.html() || "",
  //           href: href,
  //           // isItalic: isItalic,
  //           color: color,
  //         });
  //       } else if ($a.length === 1) {
  //         href = $a.attr("href") || "";
  //         isBold = $a.find("strong").length >= 1;
  //         isItalic = $a.find("em").length >= 1;
  //         text = ($a.html() || "").trim();
  //         if (isBold || isItalic) {
  //           currHomework.push({
  //             html: $elem.html() || "",
  //           });
  //         } else {
  //           currHomework.push({
  //             isTitle: true,
  //             // isBold: isBold,
  //             text: text,
  //             href: href,
  //             // isItalic: isItalic,
  //             color: color,
  //           });
  //         }
  //       } else if ($a.length > 1) {
  //         for (let j = 0; j < $a.length; j++) {
  //           const _a = $a[j];
  //           const $_a = $(_a);
  //           const href = $_a.attr("href") || "";
  //           const target = $_a.attr("target") || "";
  //           const attrs = $_a.attr();

  //           for (let attr in attrs) {
  //             $_a.removeAttr(attr);
  //           }
  //           $_a.attr("href", href);
  //           $_a.attr("target", target);
  //           $_a.attr("class", "text-blue-400 font-medium hover:underline");
  //         }
  //         currHomework.push({ html: $elem.html() || "" });
  //       }
  //     } else if (elem.name === "ul" || elem.name === "ol") {
  //       let listContent: LessonHomework = [];

  //       const children = $elem.children();
  //       for (let j = 0; j < children.length; j++) {
  //         const e = children[j];
  //         const $e = $(e);

  //         if ($e.find("li").html() === null && $e.find("*").length === 0) {
  //           listContent.push({
  //             text: ($e.html() || "").trim(),
  //             href: "",
  //             isTitle: false,
  //             // isBold: false,
  //             // isItalic: false,
  //             color: color,
  //           });
  //         }
  //       }

  //       isAddingToUl = true;
  //       const $newElem = $elem.find(">");

  //       setDescription($newElem, listContent, $, listNumber + 1);
  //       currHomework.push({ listContent: listContent, listType: elem.name });

  //       listContent = [];
  //     } else if (elem.name === "span") {
  //       const $newElem = $elem.find("span");

  //       if ($newElem.length === 0) {
  //         if (isOnSameLine) {
  //           //@ts-ignore
  //           currHomework[currHomework.length - 1].text += $elem.html() || "";
  //           //@ts-ignore
  //           currHomework[currHomework.length - 1].color = color;
  //         } else {
  //           // currHomework.push({
  //           //   text: ($elem.html() || "").trim(),
  //           //   href: "",
  //           //   isTitle: false,
  //           //   color: color,
  //           //   // isBold: $elem.find("strong").length >= 1,
  //           //   // isItalic: $elem.find("em").length >= 1,
  //           // });
  //         }

  //         isOnSameLine = true;
  //       }
  //     } else if (elem.name === "p") {
  //       const $a = $elem.find("a");
  //       if ($a.length >= 1) {
  //         href = $a.attr("href") || "";
  //         isBold = $a.find("strong").length >= 1;
  //         isItalic = $a.find("em").length >= 1;
  //         text = ($a.html() || "").trim();
  //       }

  //       const splitText = text.split("\n");

  //       if (splitText.length > 1) {
  //         let content: LessonText[] = [];
  //         for (let j = 0; j < splitText.length; j++) {
  //           content.push({
  //             href: href,
  //             // isBold: isBold,
  //             isTitle: false,
  //             text: splitText[j],
  //             // isItalic: isItalic,
  //             color: color,
  //           });
  //         }
  //         currHomework.push({ listContent: content, listType: "" });
  //       } else {
  //         currHomework.push({
  //           href: href,
  //           // isBold: isBold,
  //           isTitle: false,
  //           text: text,
  //           // isItalic: isItalic,
  //           color: color,
  //         });
  //       }
  //     } else if (elem.name === "img") {
  //       const res = getDescriptionVideoOrImage($elem, $);
  //       if (res) {
  //         currHomework.push(res);
  //       }
  //     } else if (elem.name === "table") {
  //       let table: LessonTable = { tableContent: [] };
  //       const $_tr = $elem.find("tbody > tr");
  //       for (let j = 0; j < $_tr.length; j++) {
  //         let rowContent = [];
  //         const tr = $_tr[j];
  //         const $tr = $(tr);
  //         const $_td = $tr.find("td");
  //         for (let l = 0; l < $_td.length; l++) {
  //           const td = $_td[l];
  //           const $td = $(td);
  //           const href = $td.find("a").attr("href") || "";
  //           const isBold = $td.find("strong").length >= 1;
  //           const isItalic = $td.find("em").length >= 1;
  //           const isTitle =
  //             $td.find("h1").length >= 1 || $td.find("h2").length >= 1;

  //           rowContent.push({
  //             // isBold: isBold,
  //             href: href,
  //             isTitle: isTitle,
  //             text: ($td.html() || "").trim(),
  //             // isItalic: isItalic,
  //             color: color,
  //           });
  //         }

  //         table.tableContent.push(rowContent);
  //       }
  //       currHomework.push(table);
  //     }
  //   }
  // }
}
function removeEmptyFields(homeworks: LessonHomework[]) {
  for (let i = 0; i < homeworks.length; i++) {
    const homework = homeworks[i];

    let removeIndex = true;

    for (let j = 0; j < homework.length; j++) {
      const content = homework[j];
      let removeContent = true;

      if ("isTitle" in content) {
        if (content.text !== "") {
          removeIndex = false;
          removeContent = false;
          continue;
        }
      } else {
        removeIndex = false;
        removeContent = false;
        continue;
      }
      if (removeContent) {
        //Remove object in homework array, because it's empty
      }
    }

    if (removeIndex) {
      homeworks.splice(i, 1);
    }
  }
}
