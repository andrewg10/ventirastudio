import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";

const BASE = "https://ventirastudio.ro";

// Static pages with their priorities and change frequencies
const STATIC_PAGES: MetadataRoute.Sitemap = [
  {
    url: BASE,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 1.0,
  },
  {
    url: `${BASE}/produse`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.9,
  },
  {
    url: `${BASE}/blog`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  },
  {
    url: `${BASE}/contact`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    url: `${BASE}/politica-de-confidentialitate`,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 0.2,
  },
  {
    url: `${BASE}/termeni-si-conditii`,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 0.2,
  },
];

export default function sitemap(): MetadataRoute.Sitemap {
  // Dynamically include all blog posts
  const posts = getAllPosts();
  const blogEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: post.featured ? 0.8 : 0.7,
  }));

  return [...STATIC_PAGES, ...blogEntries];
}
