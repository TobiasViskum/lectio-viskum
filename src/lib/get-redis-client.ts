import { createClient } from "redis";

export async function getRedisClient() {
  try {
    const client = createClient({
      url: "redis://192.168.2.20:6379",
    });

    client.on("error", (err) => {
      throw new Error();
    });

    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        reject();
      }, 200);
    });
    const clientConnectPromise = client.connect();

    const newClient = await Promise.race([promise, clientConnectPromise])
      .then((r) => {
        return r;
      })
      .catch((e) => {
        return undefined;
      });

    if (newClient === undefined) return undefined;

    return client;
  } catch {
    return undefined;
  }
}
