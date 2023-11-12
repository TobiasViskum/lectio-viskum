import { getTimeInMs } from "./util/getTimeInMs";

export async function register() {
  const shortTermCache: CacheMap = new Map();
  global.shortTermCache = shortTermCache;

  const longTermCache: CacheMap = new Map();
  global.longTermCache = longTermCache;

  const userSessions: CacheMap<{ lectioCookies: string; schoolCode: string }> =
    new Map();
  global.userSessions = userSessions;

  setInterval(
    () => {
      for (const [key, value] of global.shortTermCache) {
        if (new Date().getTime() > value.expires) {
          global.shortTermCache.delete(key);
        }
      }
    },
    getTimeInMs({ minutes: 5 }),
  );

  setInterval(
    () => {
      for (const [key, value] of global.longTermCache) {
        if (new Date().getTime() > value.expires) {
          global.shortTermCache.delete(key);
        }
      }
    },
    getTimeInMs({ hours: 6 }),
  );

  setInterval(
    () => {
      for (const [key, value] of global.userSessions) {
        console.log(`Refreshed session for user ${key}`);
        const lectioCookies = value.data.lectioCookies;
        const schoolCode = value.data.schoolCode;
        fetch(`https://www.lectio.dk/lectio/${schoolCode}/forside.aspx`, {
          method: "GET",
          headers: { Cookie: lectioCookies },
        });
      }
    },
    getTimeInMs({ minutes: 5 }),
  );
}
