/**
 * In-memory rate limiter for Server Actions and API Routes.
 * 
 * Tracks request counts per identifier (IP address) within a sliding time window.
 * Automatically cleans up expired entries to prevent memory leaks.
 * 
 * Usage:
 *   const limiter = createRateLimiter({ maxRequests: 5, windowMs: 60_000 });
 *   const result = limiter.check(identifier);
 *   if (!result.allowed) return { success: false, error: "Terlalu banyak permintaan..." };
 */

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

interface RateLimiterOptions {
  /** Maximum number of requests allowed within the window */
  maxRequests: number;
  /** Time window in milliseconds */
  windowMs: number;
}

interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: number;
}

export function createRateLimiter({ maxRequests, windowMs }: RateLimiterOptions) {
  const store = new Map<string, RateLimitEntry>();

  // Cleanup expired entries every 60 seconds to prevent memory leaks
  const cleanupInterval = setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of store) {
      if (now > entry.resetAt) {
        store.delete(key);
      }
    }
  }, 60_000);

  // Allow garbage collection of the interval in serverless environments
  if (cleanupInterval.unref) {
    cleanupInterval.unref();
  }

  return {
    check(identifier: string): RateLimitResult {
      const now = Date.now();
      const entry = store.get(identifier);

      // No existing entry or window expired — create fresh entry
      if (!entry || now > entry.resetAt) {
        store.set(identifier, { count: 1, resetAt: now + windowMs });
        return { allowed: true, remaining: maxRequests - 1, resetAt: now + windowMs };
      }

      // Within window — increment and check
      entry.count += 1;

      if (entry.count > maxRequests) {
        return { allowed: false, remaining: 0, resetAt: entry.resetAt };
      }

      return { allowed: true, remaining: maxRequests - entry.count, resetAt: entry.resetAt };
    },
  };
}

// ─── Pre-configured limiters for different use cases ────────────────────────

/** Public forms: max 5 submissions per minute per IP */
export const formLimiter = createRateLimiter({ maxRequests: 5, windowMs: 60_000 });

/** View count: max 10 views per minute per IP (per property) */
export const viewLimiter = createRateLimiter({ maxRequests: 10, windowMs: 60_000 });
