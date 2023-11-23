import Image from "next/image";

export function ImagePart({ content }: { content: LessonImage }) {
  return (
    <Image
      width={content.width}
      height={content.height}
      src={content.img}
      alt="img"
    />
  );
}
