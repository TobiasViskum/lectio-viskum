"use client";

import { downloadAsset } from "@/lib/downloadAsset";
import { Dot } from "lucide-react";

type Props = { strAssignment: string };

export function AssignmentFiles({ strAssignment }: Props) {
  const assignment: FullAssignment = JSON.parse(strAssignment);

  if (assignment.documents.length === 0) return null;

  async function handleFetch(href: string, name: string) {
    console.log(name);

    await downloadAsset(href, name);
  }

  return (
    <div>
      <p>Vedhæftede filer:</p>
      <ul className="flex flex-col gap-y-2">
        {assignment.documents.map((item, index) => {
          const key = `${item.href}-${item.name}`;
          return (
            <li key={key} className="flex">
              <Dot />
              <button
                onClick={() => handleFetch(item.href, item.name)}
                className="text-sm text-blue-400 underline"
              >
                {item.name}
              </button>
            </li>
          );
        })}
      </ul>
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
