import { getLastAuthenticatedCookie } from "@/api-functions/getLastAuthenticatedCookie";
import { getAuthenticatedPage } from "@/api-functions/getPage";
import { standardFetchOptions } from "@/api-functions/standardFetchOptions";
import { getTimeInMs } from "@/util/getTimeInMs";

export async function getClassInformation(classId: string) {
  const tag = `${classId}-class`;
  const foundCache = global.longTermCache.get(tag);

  if (foundCache && new Date().getTime() < foundCache.expires) {
    return foundCache.data;
  }

  const href = `subnav/members.aspx?holdelementid=${classId}&showteachers=1&showstudents=1&reporttype=withpics`;
  const res = await getAuthenticatedPage({
    specificPage: href,
  });

  let classInformation: ClassInformation = {
    teachers: [],
    students: [],
  };

  if (res === "Not authenticated") return null;
  if (res === "Forbidden access") return null;
  if (res === "Invalid school") return null;
  if (res === null) return res;

  const fetchCookie = res.fetchCookie;
  const $ = res.$;

  const $trs = $("#s_m_Content_Content_laerereleverpanel_alm_gv > tbody > tr");

  for (let i = 0; i < $trs.length; i++) {
    let student: Student = {
      imgSrc: "",
      imgUrl: "",
      name: "",
      studentClass: "",
      studentId: "",
    };
    let teacher: Teacher = {
      imgSrc: "",
      imgUrl: "",
      initials: "",
      name: "",
      teacherId: "",
    };

    const tr = $trs[i];
    const $tr = $(tr);
    const $children = $tr.children();
    const $imageHolder = $children.eq(0);
    const $userRecognitionHolder = $children.eq(2);

    let isTeacher = false;

    let foundId = $imageHolder.attr("data-lectiocontextcard");

    if (foundId) {
      if (foundId.includes("T")) {
        isTeacher = true;
      }
      foundId = foundId.replace(/[a-z]+/i, "");
      if (isTeacher) {
        teacher.teacherId = foundId;
      } else {
        student.studentId = foundId;
      }

      const tag = `${foundId}-user`;
      const foundCache = global.longTermCache.get(tag);

      if (foundCache && new Date().getTime() < foundCache.expires) {
        if (isTeacher) {
          classInformation.teachers.push(foundCache.data);
        } else {
          classInformation.students.push(foundCache.data);
        }

        continue;
      }

      let imgUrl = $imageHolder.find("img").attr("src") || "";

      if (isTeacher) {
        teacher.imgUrl = imgUrl;
      } else {
        student.imgUrl = imgUrl;
      }

      const userRecognition = $userRecognitionHolder.find("span").text().trim();
      if (isTeacher) {
        teacher.initials = userRecognition;
      } else {
        const splitUserRecognition = userRecognition.split(" ");
        splitUserRecognition.pop();
        student.studentClass = splitUserRecognition.join(" ");
      }

      const firstName = $children.eq(3).find("span > a").text().trim();
      const lastName = $children.eq(4).find("span").text().trim();
      const name = [firstName, lastName].join(" ");
      if (isTeacher) {
        teacher.name = name;
      } else {
        student.name = name;
      }

      if (isTeacher) {
        classInformation.teachers.push(teacher);
      } else {
        classInformation.students.push(student);
      }
    }
  }

  let teacherPromises: (Promise<string | null> | string)[] = [];
  let studentPromises: (Promise<string | null> | string)[] = [];

  for (let i = 0; i < classInformation.teachers.length; i++) {
    const teacher = classInformation.teachers[i];

    const tag = `${teacher.teacherId}-user`;
    const foundCache = global.longTermCache.get(tag);
    if (foundCache && new Date().getTime() < foundCache.expires) {
      teacherPromises.push(foundCache.data.imgSrc);

      continue;
    }

    const imgHref = ["https://lectio.dk", teacher.imgUrl, "&fullsize=1"].join(
      "",
    );

    const promise = fetchCookie(imgHref, {
      method: "GET",
      headers: { Cookie: getLastAuthenticatedCookie() },
      ...standardFetchOptions,
    })
      .then(async (res) => {
        try {
          const arrayBuffer = await res.arrayBuffer();
          const contentType = res.headers.get("content-type");
          const base64 = Buffer.from(arrayBuffer).toString("base64");
          const fullSrc = `data:${contentType};base64,${base64}`;

          return fullSrc;
        } catch {
          return null;
        }
      })
      .catch((err) => {
        return null;
      });
    teacherPromises.push(promise);
  }

  for (let i = 0; i < classInformation.students.length; i++) {
    const student = classInformation.students[i];

    const tag = `${student.studentId}-user`;
    const foundCache = global.longTermCache.get(tag);
    if (foundCache && new Date().getTime() < foundCache.expires) {
      studentPromises.push(foundCache.data.imgSrc);
      continue;
    }

    let imgHref = student.imgUrl;
    if (!imgHref.includes("https://lectio.dk")) {
      imgHref = ["https://lectio.dk", imgHref].join("");
    }
    if (
      !imgHref.includes("/img/defaultfoto_small") &&
      !imgHref.includes("fullsize=1")
    ) {
      imgHref = [imgHref, "&fullsize=1"].join("");
    } else {
      imgHref = imgHref.replace("defaultfoto_small", "defaultfoto_large");
    }

    const promise = fetchCookie(imgHref, {
      method: "GET",
      headers: { Cookie: getLastAuthenticatedCookie() },
      ...standardFetchOptions,
    })
      .then(async (res) => {
        try {
          const arrayBuffer = await res.arrayBuffer();
          const contentType = res.headers.get("content-type");
          const base64 = Buffer.from(arrayBuffer).toString("base64");
          const fullSrc = `data:${contentType};base64,${base64}`;

          return fullSrc;
        } catch {
          return null;
        }
      })
      .catch((err) => {
        return null;
      });
    studentPromises.push(promise);
  }

  const [teacherImageSources, studentImageSources] = await Promise.all([
    await Promise.all(teacherPromises),
    await Promise.all(studentPromises),
  ]);

  for (let i = 0; i < teacherImageSources.length; i++) {
    const imageSource = teacherImageSources[i];
    if (imageSource !== null) {
      classInformation.teachers[i].imgSrc = imageSource;
      const teacherId = classInformation.teachers[i].teacherId;
      const tag = `${teacherId}-user`;
      const foundCache = global.longTermCache.get(tag);
      if (
        foundCache === undefined ||
        new Date().getTime() > foundCache.expires
      ) {
        global.longTermCache.set(tag, {
          data: classInformation.teachers[i],
          expires: new Date().getTime() + getTimeInMs({ days: 1 }),
        });
      }
    }
  }
  for (let i = 0; i < studentImageSources.length; i++) {
    const imageSource = studentImageSources[i];
    if (imageSource !== null) {
      classInformation.students[i].imgSrc = imageSource;
      const studentId = classInformation.students[i].studentId;
      const tag = `${studentId}-user`;
      const foundCache = global.longTermCache.get(tag);

      if (
        foundCache === undefined ||
        new Date().getTime() > foundCache.expires
      ) {
        global.longTermCache.set(tag, {
          data: classInformation.students[i],
          expires: new Date().getTime() + getTimeInMs({ days: 1 }),
        });
      }
    }
  }

  global.longTermCache.set(tag, {
    data: classInformation,
    expires: new Date().getTime() + getTimeInMs({ days: 1 }),
  });

  return classInformation;
}
