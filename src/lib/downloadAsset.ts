import { getAxiosInstance } from "./getAxiosInstance";
import { getLectioCookies } from "./auth/getLectioCookies";

export async function downloadAsset(href: string, name: string) {
  const { client } = getAxiosInstance();

  const lectioCookies = getLectioCookies();
  await client
    .get(href, {
      responseType: "blob",
    })
    .then((res) => {
      const url = URL.createObjectURL(res.data);
      const link = document.createElement("a");
      link.href = url;
      link.target = "_blank";
      link.download = name; // The file name
      link.click(); // This will download the file
    })
    .catch((err) => {
      return null;
    });
}
