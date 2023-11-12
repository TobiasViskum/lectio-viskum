import { createClient } from "redis";

export async function getRedisClient() {
  try {
    const client = createClient({
      url: "redis://192.168.2.20:6379",
    });

    client.on("error", (err) => console.log("Redis Client Error", err));

    await client.connect();

    return client;
  } catch {
    return undefined;
  }
}
