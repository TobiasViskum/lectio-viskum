import { DocumentButton } from "@/components/global/DocumentButton";
import { getLectioProps } from "@/lib/auth/getLectioProps";
import { lectioAPI } from "@/lib/lectio-api";
import { cn } from "@/lib/utils";
import { capitalizeFirstLetter } from "@/util/capitalizeFirstLetter";
import { load } from "cheerio";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment } from "react";
import { TextPart } from "./_components/RenderHomework/Parts/TextPart";
import { RenderHomework } from "./_components/RenderHomework";

type Props = {
  params: {
    id: string;
  };
};

export default async function LessonPage({ params }: Props) {
  const lectioProps = getLectioProps();
  const lesson = await lectioAPI.getLessonById({
    lessonId: params.id,
    lectioCookies: lectioProps.lectioCookies,
    schoolCode: lectioProps.schoolCode,
    userId: lectioProps.userId,
    year: "2023",
  });

  if (lesson === null) {
    return <p>An error happened</p>;
  }

  // console.log(lesson.other);

  const formattedStartTime = new Intl.DateTimeFormat("da-dk", {
    weekday: "long",
    day: "numeric",
    month: "numeric",
  }).format(lesson.time.startDate);
  const formattedEndTime = new Intl.DateTimeFormat("da-dk", {
    dateStyle: "full",
  }).format(lesson.time.endDate);

  return (
    <div className="flex max-w-4xl flex-col gap-y-2">
      <p className="text-muted-foreground">
        {capitalizeFirstLetter(formattedStartTime.replaceAll(".", "/"))}
      </p>
      <p className="text-muted-foreground">
        {capitalizeFirstLetter(formattedEndTime)}
      </p>
      <p>Fag: {lesson.subjects}</p>
      <div>
        <p className="pb-1 pt-4 text-sm text-muted-foreground">NOTE:</p>
        <p>{lesson.note}</p>
      </div>

      <div>
        <p className="pb-1 pt-4 text-sm text-muted-foreground">LEKTIER:</p>
        <div className="flex flex-col gap-y-4">
          {lesson.homework.map((homework, _index) => {
            return (
              <div key={_index} className="flex flex-col gap-y-4 border-b pb-4">
                <RenderHomework homework={homework} key={_index} />
              </div>
            );
          })}

          {/* {lesson.homework.map((homework, index) => {
            return (
              <div key={index} className="py-2">
                {homework.title.map((title) => {
                  return (
                    <p key={title.text} className="py-8 text-xl">
                      {title.text}
                    </p>
                  );
                })}
                <div
                  className={cn(
                    "pb-1 text-xl",
                    homework.titleHref ? "text-blue-400 underline" : "",
                  )}
                >
                  {homework.titleHref ? (
                    <>
                      {homework.title.includes("/lectio/") ? (
                        <DocumentButton
                          strDocument={JSON.stringify({
                            name: homework.title,
                            href: homework.titleHref,
                          })}
                        />
                      ) : (
                        <Link href={homework.titleHref} target="_blank">
                          {homework.title}
                        </Link>
                      )}
                    </>
                  ) : (
                    <p>{homework.title}</p>
                  )}
                </div>
                {homework.description.map((item, index) => {
                  return (
                    <div key={item.toString()}>
                      {typeof item === "string" ? (
                        <p className="text-sm">{item}</p>
                      ) : Array.isArray(item) ? (
                        item.map((str) => {
                          return (
                            <p key={str} className="text-sm">
                              {str}
                            </p>
                          );
                        })
                      ) : "img" in item ? (
                        <Image
                          width={item.width}
                          height={item.height}
                          src={item.img}
                          alt="img"
                        />
                      ) : "videoHref" in item ? (
                        <iframe
                          width="420"
                          height="250"
                          src={item.videoHref}
                        ></iframe>
                      ) : (
                        ""
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })} */}
        </div>
      </div>
      <div>
        <p className="pb-1 pt-4 text-sm text-muted-foreground">
          ØVRIGT INDHOLD:
        </p>
        <div className="flex flex-col gap-y-4">
          {lesson.other.map((homework, _index) => {
            return (
              <div key={_index} className="flex flex-col gap-y-4 border-b pb-4">
                <RenderHomework homework={homework} key={_index} />
              </div>
            );
          })}
          {/* {lesson.other.map((homework) => {
            return (
              <div key={homework.title[0].text} className="py-2">
                <div
                  className={cn(
                    "pb-1 text-xl",
                    homework.titleHref ? "text-blue-400 underline" : "",
                  )}
                >
                  {homework.titleHref ? (
                    <DocumentButton
                      strDocument={JSON.stringify({
                        name: homework.title,
                        href: homework.titleHref,
                      })}
                    />
                  ) : (
                    <p>{homework.title[0].text}</p>
                  )}
                </div>
                {homework.description.map((item, index) => {
                  return (
                    <div key={item.toString()}>
                      {typeof item === "string" ? (
                        <p className="text-sm">{item}</p>
                      ) : Array.isArray(item) ? (
                        item.map((str) => {
                          return (
                            <p key={str} className="text-sm">
                              {str}
                            </p>
                          );
                        })
                      ) : "img" in item ? (
                        <Image src={item.img} alt="img" />
                      ) : "videoHref" in item ? (
                        <iframe
                          width="420"
                          height="250"
                          src={item.videoHref}
                        ></iframe>
                      ) : (
                        ""
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })} */}
        </div>
      </div>
    </div>
  );
}
