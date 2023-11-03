import { getTimeInMs } from "./util/getTimeInMs";

export function register() {
  const cache: CacheMap = new Map();
  global.cache = cache;

  const longTermCache: CacheMap = new Map();
  global.longTermCache = longTermCache;

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

  setInterval(
    () => {
      for (const [key, value] of global.longTermCache) {
        if (new Date().getTime() > value.expires) {
          global.cache.delete(key);
        }
      }
    },
    getTimeInMs({ hours: 6 }),
  );
}
