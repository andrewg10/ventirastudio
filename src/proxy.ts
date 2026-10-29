import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { getOriginSecret, hasValidOriginSecret } from "@/lib/origin-secret";

/**
 * Origin lock for the API: with ORIGIN_SECRET set, /api/* requests without the matching
 * `x-origin-secret` header (added by Cloudflare) get 403.
 * Scoped to /api/* on purpose: Railway's healthcheck (railway.toml → path "/") hits the container
 * directly without the header — locking "/" would fail every deploy.
 */
export function proxy(request: NextRequest) {
  if (!getOriginSecret()) return NextResponse.next();
  if (hasValidOriginSecret(request.headers)) return NextResponse.next();
  return NextResponse.json({ error: "Forbidden" }, { status: 403 });
}

export const config = {
  matcher: "/api/:path*",
};
