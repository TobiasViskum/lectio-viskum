import { headers } from "next/headers";
import "server-only";

export function getServerUrl() {
  const headerStore = headers();
  const serverUrl = headerStore.get("x-url");
  return serverUrl;
}
