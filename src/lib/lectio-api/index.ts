import "server-only";
import { getSchool } from "./getSchool";
import { getAllSchools } from "./getAllSchools";
import { getIsAuthenticated } from "./getIsAuthenticated";
import { getStudentById } from "./getStudentById";
import { getScheduleByStudentId } from "./getScheduleByStudentId";
import { getAllAssignments } from "./getAllAssignments";
import { getAssignmentByHref } from "./getAssignmentById";
import { getLessonById } from "./getLesson";
import { getTeacherById } from "@/api-functions/scrapeFunctions";
import { getTeacherByInitials } from "@/api-functions/scrapeFunctions/getTeacherByInitials";
import { getNewestMessages } from "./getNewestMessages";
import { getSentMessages } from "./getSentMessages";
import { getFavoriteMessages } from "./getFavoriteMessages";

const lectioAPI = {
  getSchool: getSchool,
  getAllSchools: getAllSchools,
  getIsAuthenticated: getIsAuthenticated,
  getStudent: {
    byId: getStudentById,
  },
  getSchedule: {
    byStudentId: getScheduleByStudentId,
  },
  getAssignment: {
    all: getAllAssignments,
    byId: getAssignmentByHref,
  },
  getLessonById: getLessonById,
  // getTeacher: {
  //   byId: getTeacherById,
  //   byInitials: getTeacherByInitials,
  // },
  getMessage: {
    newest: getNewestMessages,
    sent: getSentMessages,
    favorites: getFavoriteMessages,
    // byId: getMessageById
  },
};

export { lectioAPI };
