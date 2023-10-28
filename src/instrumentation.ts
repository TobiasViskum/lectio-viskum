export function register() {
  const cache: Map<string, { data: any; expires: number }> = new Map();
  global.cache = cache;
}
