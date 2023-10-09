type StandardProps = {
  username: string;
  password: string;
  schoolCode: string;
};

type School = {
  schoolCode: string;
  name: string;
};

type LectioAuth = {
  isAuthenticated: boolean;
};

type Student = {
  name: string;
  studentClass: string;
  imgSrc: string;
};
