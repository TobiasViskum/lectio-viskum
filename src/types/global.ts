var cache: Map<string, { data: any; expires: number }> = new Map();
global.cache = cache;
