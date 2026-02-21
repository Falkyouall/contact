const windowMs = 15 * 60 * 1000; // 15 minutes
const maxRequests = 5;
const requests = new Map<string, number[]>();

// Clean up old entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [ip, timestamps] of requests) {
    const valid = timestamps.filter((t) => now - t < windowMs);
    if (valid.length === 0) {
      requests.delete(ip);
    } else {
      requests.set(ip, valid);
    }
  }
}, 5 * 60 * 1000).unref();

export function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const timestamps = requests.get(ip) ?? [];
  const valid = timestamps.filter((t) => now - t < windowMs);

  if (valid.length >= maxRequests) {
    requests.set(ip, valid);
    return false;
  }

  valid.push(now);
  requests.set(ip, valid);
  return true;
}
