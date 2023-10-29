import { getTimeInMs } from "./util/getTimeInMs";

export function register() {
  const cache: Map<string, { data: any; expires: number }> = new Map();
  global.cache = cache;

  setInterval(
    () => {
      for (const [key, value] of global.cache) {
        if (new Date().getTime() > value.expires) {
          global.cache.delete(key);
        }
      }
    },
    getTimeInMs({ minutes: 5 }),
  );
}
