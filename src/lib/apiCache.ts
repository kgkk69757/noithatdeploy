// API Cache để giảm số lượng requests
const cache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

export async function cachedFetch(url: string, options?: RequestInit) {
  const cacheKey = `${url}_${JSON.stringify(options)}`;
  const cached = cache.get(cacheKey);
  
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }
  
  const response = await fetch(url, options);
  const data = await response.json();
  
  cache.set(cacheKey, {
    data,
    timestamp: Date.now()
  });
  
  return data;
}