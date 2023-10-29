import "server-only";
import { getSchool } from "./getSchool";
import { getAllSchools } from "./getAllSchools";
import { getIsAuthenticated } from "./getIsAuthenticated";
import { getStudentById } from "./getStudentById";
import { getScheduleByCredentials } from "./getScheduleByCredentials";
import { getAllAssignments } from "./getAllAssignments";
import { getAssignmentByHref } from "./getAssignmentById";
import { getLessonById } from "./getLesson";

const lectioAPI = {
  getSchool: getSchool,
  getAllSchools: getAllSchools,
  getIsAuthenticated: getIsAuthenticated,
  getStudent: {
    byId: getStudentById,
  },
  getSchedule: {
    byCredentials: getScheduleByCredentials,
  },
  getAssignment: {
    all: getAllAssignments,
    byHref: getAssignmentByHref,
  },
  getLessonById: getLessonById,
};

export { lectioAPI };
