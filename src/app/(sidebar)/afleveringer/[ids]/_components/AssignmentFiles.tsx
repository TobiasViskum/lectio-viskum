"use client";

import { getLectioCookies } from "@/lib/auth/getLectioCookies";

type Props = { strAssignment: string };

export function AssignmentFiles({ strAssignment }: Props) {
  const assignment: FullAssignment = JSON.parse(strAssignment);

  if (assignment.documents.length === 0) return null;

  async function handleFetch(href: string, name: string) {
    const lectioCookies = getLectioCookies();
    let neededHref = href.split("lectio.dk")[1];

    const res = await fetch(neededHref, {
      method: "GET",
      headers: {
        // "Access-Control-Allow-Origin": "*",
        // "Access-Control-Allow-Headers": "Content-Type,Authorization",
        // "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,OPTIONS",
        // "Access-Control-Allow-Credentials": "true",
        Cookie: lectioCookies,
      },
    })
      .then(async (response) => {
        console.log(await response.text());

        return response.blob();
      })
      .then((blob) => {
        console.log(blob);

        // Create an object URL for the blob
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = name; // The file name
        link.click(); // This will download the file
        // link.remove();
      })
      .catch((error) => console.error(error));

    return res;
  }

  return (
    <div>
      <p>Vedhæftede filer:</p>
      <div>
        {assignment.documents.map((item, index) => {
          const key = `${item.href}-${item.name}`;
          return (
            <div key={key}>
              <button
                onClick={() => handleFetch(item.href, item.name)}
                className="text-sm text-muted-foreground "
              >
                {item.name}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/*

fetch('https://example.com/largefile')
  .then(response => {
    const total = +response.headers.get('Content-Length');
    let loaded = 0;

    const reader = response.body.getReader();
    return new ReadableStream({
      start(controller) {
        function push() {
          reader.read().then(({done, value}) => {
            if (done) {
              controller.close();
              return;
            }
            loaded += value.length;
            console.log(`Progress: ${Math.round((loaded / total) * 100)}%`);
            controller.enqueue(value);
            push();
          })
        }
        push();
      }
    });
  })
  .then(stream => {
    // process the stream
  });

*/
