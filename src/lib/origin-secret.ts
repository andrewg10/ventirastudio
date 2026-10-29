/**
 * Shared secret between Cloudflare and the Railway origin.
 * Cloudflare adds `x-origin-secret` via a Transform Rule; requests that hit Railway directly
 * (bypassing Cloudflare) lack it. Only then is `cf-connecting-ip` trustworthy.
 * The secret itself lives only in the ORIGIN_SECRET env var — never commit it (public repo).
 */
export const ORIGIN_SECRET_HEADER = "x-origin-secret";

export function getOriginSecret(): string {
  return process.env.ORIGIN_SECRET?.trim() || "";
}

/** Constant-time compare (does not short-circuit on the first differing char). */
export function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export function hasValidOriginSecret(headers: Headers): boolean {
  const secret = getOriginSecret();
  if (!secret) return false;
  return safeEqual(headers.get(ORIGIN_SECRET_HEADER) ?? "", secret);
}

let warnedNoOriginSecret = false;

/**
 * Client IP for rate limiting.
 * With ORIGIN_SECRET: cf-connecting-ip only when the secret header matches, else rightmost XFF.
 * Without it: cf-connecting-ip (unverified), then rightmost XFF (appended by Railway's edge).
 * The leftmost XFF entry is client-controlled and is never used.
 */
export function getClientIp(headers: Headers): string {
  const rightmostXff = headers.get("x-forwarded-for")?.split(",").pop()?.trim();
  if (getOriginSecret()) {
    if (hasValidOriginSecret(headers)) return headers.get("cf-connecting-ip")?.trim() || rightmostXff || "unknown";
    return rightmostXff || "unknown";
  }
  if (!warnedNoOriginSecret && process.env.NODE_ENV === "production") {
    warnedNoOriginSecret = true;
    console.warn("[security] ORIGIN_SECRET not set — cf-connecting-ip is trusted without proof the request came via Cloudflare.");
  }
  return headers.get("cf-connecting-ip")?.trim() || rightmostXff || "unknown";
}
