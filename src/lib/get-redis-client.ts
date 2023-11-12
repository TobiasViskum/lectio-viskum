import { createClient } from "redis";

export async function getRedisClient() {
  const client = createClient({
    url: "redis://192.168.2.20:6379",
  });

  client.on("error", (err) => console.log("Redis Client Error", err));

  await client.connect();

  return client;
}
