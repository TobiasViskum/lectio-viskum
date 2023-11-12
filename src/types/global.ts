var shortTermCache: CacheMap = new Map();
global.shortTermCache = shortTermCache;

var longTermCache: CacheMap = new Map();
global.longTermCache = longTermCache;

var userSessions: CacheMap<{ lectioCookies: string; schoolCode: string }> =
  new Map();
global.userSessions = userSessions;
