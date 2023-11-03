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

    // setTitle($article, currHomework, $);
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
    presentation: LessonHomework[][];
  };

  let resultHolder: ResultHolder = {
    homework: [],
    other: [],
    presentation: [],
  };

  const sectionHeadings = $("h1.ls-paper-section-heading");

  for (let i = 0; i < sectionHeadings.length; i++) {
    let homework: LessonHomework[] = [];
    let presentation: LessonHomework[][] = [];

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
          .children();

        // setPresentation($presentationsHolder, presentation, $);
      }
    }
    if (resultType === "Lektier") {
      resultHolder.homework = homework;
    } else if (resultType === "Øvrigt indhold") {
      resultHolder.other = homework;
    } else if (resultType === "Præsentation") {
      resultHolder.presentation = presentation;
    }
  }

  return resultHolder;
}

function getText(text: string) {
  if (text.length === 1) return "\n";
  text = text.trim();
  text = text.replaceAll("&nbsp;", "\n");
  text = text.replaceAll("<br>", "\n");

  return text;
}
// function trimLineBreaks(currHomework: LessonHomework) {
//   let hasChanged = false;
//   if (currHomework.description[0] === "\n") {
//     hasChanged = true;
//     currHomework.description.shift();
//   }
//   if (currHomework.description[currHomework.description.length - 1] === "\n") {
//     hasChanged = true;
//     currHomework.description.pop();
//   }
//   if (hasChanged) {
//     trimLineBreaks(currHomework);
//   }
// }

// function setTitle(
//   $article: cheerio.Cheerio,
//   currHomework: LessonHomework,
//   $: cheerio.Root,
// ) {
//   const $elements = $article.find(">");
//   for (let i = 0; i < $elements.length; i++) {
//     const elem = $elements[i];
//     const $elem = $(elem);
//     if (elem.type === "tag") {
//       if (elem.name === "h1") {
//         currHomework.title.push({
//           text: $elem.text(),
//           href: "",
//           isBold: false,
//         });
//       } else if (elem.name === "ul" || elem.name === "ol") {
//       }
//     }
//   }

// const $title = $article.children().first();
// let title = $title.text().trim();

// currHomework.title = title;
// const href = $title.children().first().attr("href");

// if (href) {
//   currHomework.titleHref = href;
// }
// }
function getDescriptionVideoOrImage($elem: cheerio.Cheerio, $: cheerio.Root) {
  const src = $elem.attr("src");
  const imgHeight = Number($elem.attr("height"));
  const imgWidth = Number($elem.attr("width"));

  const iframe = $elem.attr("data-embed-xhtml");
  let isVideo = iframe !== undefined;

  if (src) {
    let fullSrc = src;
    if (!isVideo && !isNaN(imgHeight) && !isNaN(imgWidth)) {
      return { img: fullSrc, aspectRatio: `1 / ${imgHeight / imgWidth}` };
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
      if (elem.name === "h1" || elem.name === "h2") {
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
        isAddingToUl = true;
        const $newElem = $elem.find(">");

        let listContent: LessonHomework = [];
        let d = listNumber + 1;
        setDescription($newElem, listContent, $, d);
        currHomework.push({ listContent: listContent, listType: elem.name });

        listContent = [];
      } else if (elem.name === "p") {
        const splitText = text.split("\n");
        if (splitText.length > 1) {
          let content: LessonText[] = [];
          for (let j = 0; j < splitText.length; j++) {
            content.push({
              href: href,
              isBold: isBold,
              isTitle: false,
              text: text,
            });
          }
          currHomework.push(content);
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
      }
    }
  }

  // trimLineBreaks(currHomework);
}
// function setPresentation(
//   $presentationsHolder: cheerio.Cheerio,
//   presentation: LessonHomework[][],
//   $: cheerio.Root,
// ) {
//   $presentationsHolder.each((index, elem) => {
//     let currIndex = 0;
//     presentation.push([{ title: [], description: [] }]);

//     const $elem = $(elem);
//     const $elements = $elem.find("*");
//     let isAddingToUl = false;
//     let tempUl: string[] = [];

//     try {
//       for (let i = 0; i < $elements.length; i++) {
//         const elem = $elements[i];
//         const $elem = $(elem);
//         const text = getText($elem.html() as string);

//         if (elem.type === "tag") {
//           if (elem.name === "h1" || elem.name === "h2") {
//             if (presentation[index][currIndex].title !== "") {
//               currIndex += 1;
//               presentation[index].push({
//                 titleHref: "",
//                 title: "",
//                 description: [],
//               });
//             }
//             if (text.length > 1) {
//               presentation[index][currIndex].title = text;
//             }
//           }

//           if (elem.name === "ul") {
//             isAddingToUl = true;
//           } else if (elem.name === "li") {
//             tempUl.push(text);
//           } else {
//             if (tempUl.length !== 0) {
//               presentation[index][currIndex].description.push(tempUl);
//               tempUl = [];
//             }
//             isAddingToUl = false;
//           }
//           if (elem.name === "p") {
//             presentation[index][currIndex].description.push(text);
//           } else if (elem.name === "img") {
//             const res = getDescriptionVideoOrImage($elem, $);
//             if (res) {
//               presentation[index][currIndex].description.push(res);
//             }
//           }
//         }
//       }

//       trimLineBreaks(presentation[index][currIndex]);
//     } catch (err) {
//       console.log(err);
//     }
//   });

//   /*
//       This just removes the empty objects and arrays

//       For some reason array.filter() doesn't work when
//       it's an array in an array, so that's why the piece
//       of code is as big as it is
//     */
//   presentation.forEach((homeworkArr) => {
//     let indexesToRemove: number[] = [];
//     homeworkArr.forEach((obj, index) => {
//       if (obj.title === "" && obj.description.length === 0) {
//         indexesToRemove.push(index);
//       }
//     });
//     indexesToRemove.forEach((indexToRemove) => {
//       homeworkArr.splice(indexToRemove, 1);
//     });
//   });
//   let indexesToRemove: number[] = [];
//   presentation.forEach((homeworkArr, index) => {
//     if (homeworkArr.length === 0) {
//       indexesToRemove.push(index);
//     }
//   });
//   indexesToRemove.forEach((indexToRemove) => {
//     presentation.splice(indexToRemove, 1);
//   });
// }
