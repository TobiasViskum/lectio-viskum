export function getHomework(
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

    setDescription($article, currHomework, $);

    homework.push(currHomework);
    getHomework($sibling, $, homework);
  } else if ($sibling.hasClass("ls-hr-solid")) {
    getHomework($sibling, $, homework);
  }
}
export function getHomeworkAndOtherAndPresentation($: cheerio.Root) {
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
      getHomework($parent, $, homework);
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
          setDescription($section, currHomework, $);
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
function setDescription(
  $article: cheerio.Cheerio,
  currHomework: LessonHomework,
  $: cheerio.Root,
  listNumber: number = 0,
) {
  const $elements = $article.find("*");
  $elements.find("br").replaceWith("\n");

  let isAddingToUl = false;

  for (let i = 0; i < $elements.length; i++) {
    const elem = $elements[i];
    const $elem = $(elem);
    let text = $elem.text().trim();
    let isBold = $elem.find("strong").length >= 1;
    let href = $elem.attr("href") || "";

    if (
      $elem.parents("ol").length > listNumber ||
      $elem.parents("ul").length > listNumber
    ) {
      continue;
    } else if (elem.type === "tag") {
      if (elem.name === "h1" || elem.name === "h2" || elem.name === "h3") {
        const $a = $elem.find("a");
        if ($a.length >= 1) {
          href = $a.attr("href") || "";
          isBold = $a.find("strong").length >= 1;
          text = $a.text().trim();
        }
        currHomework.push({
          isTitle: true,
          isBold: isBold,
          text: text,
          href: href,
        });
      } else if (elem.name === "ul" || elem.name === "ol") {
        let listContent: LessonHomework = [];

        const children = $elem.children();
        for (let j = 0; j < children.length; j++) {
          const e = children[j];
          const $e = $(e);

          if ($e.find("li").html() === null && $e.find("*").length === 0) {
            listContent.push({
              text: $e.text(),
              href: "",
              isTitle: false,
              isBold: false,
            });
          }
        }

        $elem.find(">").each((i_2, e) => {});

        isAddingToUl = true;
        const $newElem = $elem.find(">");

        setDescription($newElem, listContent, $, listNumber + 1);
        currHomework.push({ listContent: listContent, listType: elem.name });

        listContent = [];
      } else if (elem.name === "span") {
        const $newElem = $elem.find(">");

        if ($newElem.length === 0) {
          currHomework.push({
            text: $elem.text(),
            href: "",
            isTitle: false,
            isBold: false,
          });
        } else {
          setDescription($newElem, currHomework, $);
        }
      } else if (elem.name === "p") {
        const $a = $elem.find("a");
        if ($a.length >= 1) {
          href = $a.attr("href") || "";
          isBold = $a.find("strong").length >= 1;
          text = $a.text().trim();
        }

        const splitText = text.split("\n");

        if (splitText.length > 1) {
          let content: LessonText[] = [];
          for (let j = 0; j < splitText.length; j++) {
            content.push({
              href: href,
              isBold: isBold,
              isTitle: false,
              text: splitText[j],
            });
          }
          currHomework.push({ listContent: content, listType: "" });
        } else {
          currHomework.push({
            href: href,
            isBold: isBold,
            isTitle: false,
            text: text,
          });
        }
      } else if (elem.name === "img") {
        const res = getDescriptionVideoOrImage($elem, $);
        if (res) {
          currHomework.push(res);
        }
      } else if (elem.name === "table") {
        let table: LessonTable = { tableContent: [] };
        const $_tr = $elem.find("tbody > tr");
        for (let j = 0; j < $_tr.length; j++) {
          let rowContent = [];
          const tr = $_tr[j];
          const $tr = $(tr);
          const $_td = $tr.find("td");
          for (let l = 0; l < $_td.length; l++) {
            const td = $_td[l];
            const $td = $(td);
            const href = $td.find("a").attr("href") || "";
            const isBold = $td.find("strong").length >= 1;
            const isTitle =
              $td.find("h1").length >= 1 || $td.find("h2").length >= 1;

            rowContent.push({
              isBold: isBold,
              href: href,
              isTitle: isTitle,
              text: $td.text().trim(),
            });
          }

          table.tableContent.push(rowContent);
        }
        currHomework.push(table);
      }
    }
  }
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
