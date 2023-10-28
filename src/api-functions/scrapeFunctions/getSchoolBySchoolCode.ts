import { getAllSchools } from ".";

type Props = { schoolCode: string };

export async function getSchoolBySchoolCode({ schoolCode }: Props) {
  const schools = await getAllSchools();
  if (schools === "No data") return "No data";
  if (schools === null) return null;

  const school = schools.find((obj) => obj.schoolCode === schoolCode);

  if (school === undefined) return null;

  return school;
}
