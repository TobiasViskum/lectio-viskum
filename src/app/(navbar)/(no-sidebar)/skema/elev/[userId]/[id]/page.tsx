type Props = {
  params: {
    id: string;
  };
};

export default function LessonPage({ params }: Props) {
  return <h1>{params.id}</h1>;
}
