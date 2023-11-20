import "server-only";
import { getAuthenticatedPage } from "@/api-functions/getPage";
import { setInformationProps } from "./setInformationProps";
import { setAdditionalProps } from "./setAdditionalProps";
import { setSubmitProps } from "./setSubmitProps";
import { getTimeInMs } from "@/util/getTimeInMs";
import { getLectioProps } from "@/lib/auth/getLectioProps";
import { getRedisClient } from "@/lib/get-redis-client";
import { getAssignmentTag } from "@/api-functions/getTags";
import { setGroupInformation } from "./setGroupInformation";

type Props = { assignmentId: string };

type Titles =
  | "title"
  | "documents"
  | "note"
  | "class"
  | "gradeSystem"
  | "teacher"
  | "studentTime"
  | "dueTo"
  | "inTeachingDescription";

export const titleMap: { [key: string]: Titles } = {
  "Opgavetitel:": "title",
  "Opgavebeskrivelse:": "documents",
  "Opgavenote:": "note",
  "Hold:": "class",
  "Karakterskala:": "gradeSystem",
  "Ansvarlig:": "teacher",
  "Elevtid:": "studentTime",
  "Afleveringsfrist:": "dueTo",
  "I undervisningsbeskrivelse:": "inTeachingDescription",
};

export async function getAssignment({ assignmentId }: Props) {
  const userId = getLectioProps().userId;
  const client = await getRedisClient();
  const tag = getAssignmentTag(userId, assignmentId);
  if (client) {
    const foundCache = (await client.json.get(
      tag,
    )) as RedisCache<FullAssignment>;

    if (foundCache && new Date().getTime() < foundCache.expires) {
      // await client.quit();
      // return foundCache.data;
    }
  }

  const href = `ElevAflevering.aspx?elevid=${userId}&exerciseid=${assignmentId}`;
  const res = await getAuthenticatedPage({
    specificPage: href,
  });

  if (
    res === null ||
    res === "Not authenticated" ||
    res === "Forbidden access" ||
    res === "Invalid school"
  ) {
    if (client) {
      await client.quit();
    }
    return res;
  }

  const $ = res.$;

  let assignment: FullAssignment = {
    title: "",
    documents: [],
    description: [],
    subject: "",
    class: "",
    gradeSystem: "",
    teacher: { name: "", initials: "", teacherId: "", imgSrc: "", imgUrl: "" },
    students: [],
    studentTime: 0,
    groupMembersToAdd: [],
    dueTo: new Date(1970),
    inTeachingDescription: false,
    awaiter: "",
    status: "",
    absence: "",
    finished: false,
    grade: "",
    gradeNote: "",
    studentNote: "",
    submits: [],
    assignmentId: assignmentId,
  };

  await setInformationProps($, assignment);
  await setAdditionalProps($, assignment);
  await setSubmitProps($, assignment);
  await setGroupInformation($, assignment);

  assignment.submits = assignment.submits.reverse();

  if (client) {
    await client.json.set(tag, "$", {
      data: assignment,
      expires: new Date().getTime() + getTimeInMs({ minutes: 1 }),
    });
    await client.quit();
  }

  return assignment;
}
