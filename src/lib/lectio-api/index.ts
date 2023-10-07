"server-only";

const baseUrl = "https://dev07.reactprojects.mywire.org";

type DefaultObject = { [key: string]: string };
type APIResponse<T> = { message: string } & ({ status: "error" } | { status: "success"; data: T | null });
type StandardProps = {
  username: string;
  password: string;
  schoolCode: string;
};

async function makeRequest<T>(path: string, params?: DefaultObject): Promise<T | null> {
  let result: APIResponse<T> | null = null;
  try {
    const res = await fetch([baseUrl, path, "?"].join("") + new URLSearchParams(params));
    result = (await res.json()) as APIResponse<T>;
  } catch {
    result = { status: "error", message: "Error when requesting endpoint" };
  }
  if (result.status === "error") {
    return null;
  }
  return result.data as T;
}

async function getSchool(props: { schoolCode: string }) {
  const result = await makeRequest<School>("/get-school/by-school-code", props);
  return result;
}

async function getSchools() {
  const result = await makeRequest<School[]>("/get-school/all");

  return result;
}

const lectioAPI = {
  getSchool: getSchool,
  getAllSchools: getSchools,
};

export { lectioAPI };
