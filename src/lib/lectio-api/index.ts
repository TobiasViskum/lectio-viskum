import "server-only";
import { getSchool } from "./getSchool";
import { getAllSchools } from "./getAllSchools";
import { getIsAuthenticated } from "./getIsAuthenticated";
import { getStudentByCredentials } from "./getStudentByCredentials";
import { getScheduleByCredentials } from "./getScheduleByCredentials";
import { getAllAssignments } from "./getAllAssignments";
import { getAssignmentByHref } from "./getAssignmentById";

const lectioAPI = {
  getSchool: getSchool,
  getAllSchools: getAllSchools,
  getIsAuthenticated: getIsAuthenticated,
  getStudent: {
    byCredentials: getStudentByCredentials,
  },
  getSchedule: {
    byCredentials: getScheduleByCredentials,
  },
  getAssignment: {
    all: getAllAssignments,
    byHref: getAssignmentByHref,
  },
};

export { lectioAPI };
