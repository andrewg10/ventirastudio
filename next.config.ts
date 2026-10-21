import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

// Security headers (Ventira checklist T2/S23).
// CSP runs in Report-Only first — switch to "Content-Security-Policy" after a week with no
// violations in the browser console (Google Ads / GTM / cal.eu are the hosts most likely to need tweaks).
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.googleadservices.com https://googleads.g.doubleclick.net https://www.google.com https://www.google.ro",
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self' data:",
  "img-src 'self' data: https:",
  "connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://*.google.com https://*.google.ro https://*.googletagmanager.com https://*.doubleclick.net",
  "frame-src https://cal.eu https://*.cal.eu https://www.googletagmanager.com https://td.doubleclick.net",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "base-uri 'self'",
  "object-src 'none'",
].join("; ");

const SECURITY_HEADERS = [
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
  { key: "Content-Security-Policy-Report-Only", value: CSP },
];

const nextConfig: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: SECURITY_HEADERS }];
  },
  async redirects() {
    return [
      {
        // non-www -> www: one canonical host, don't split SEO signals
        source: "/:path*",
        has: [{ type: "host", value: "ventirastudio.ro" }],
        destination: "https://www.ventirastudio.ro/:path*",
        permanent: true,
      },
    ];
  },
  // Allow .mdx as page extensions
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  images: {
    remotePatterns: [],
  },
};

export default withMDX(nextConfig);
