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
  // Allow .mdx as page extensions
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  images: {
    remotePatterns: [],
  },
};

export default withMDX(nextConfig);
