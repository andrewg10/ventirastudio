import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

const nextConfig: NextConfig = {
  output: "standalone",
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
