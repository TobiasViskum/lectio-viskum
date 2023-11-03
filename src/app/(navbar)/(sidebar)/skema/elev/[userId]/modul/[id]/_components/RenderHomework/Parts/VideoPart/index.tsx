export function VideoPart({ content }: { content: LessonVideo }) {
  return (
    <iframe
      style={{ aspectRatio: content.aspectRatio }}
      src={content.videoHref}
      className="max-w-lg"
    ></iframe>
  );
}
