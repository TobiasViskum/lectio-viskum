var cache: CacheMap = new Map();
global.cache = cache;

var longTermCache: CacheMap = new Map();
global.longTermCache = longTermCache;

var userSessions: CacheMap<{ lectioCookies: string; schoolCode: string }> =
  new Map();
global.userSessions = userSessions;
