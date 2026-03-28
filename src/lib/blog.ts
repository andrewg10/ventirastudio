import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;           // ISO string e.g. "2025-06-10"
  category: string;       // e.g. "Automatizare", "AI", "Business"
  readingTime: string;    // e.g. "4 min"
  featured?: boolean;
  content: string;        // raw MDX content (used on detail page)
}

export interface BlogPostMeta extends Omit<BlogPost, "content"> {}

/** Read all posts, sorted newest first */
export function getAllPosts(): BlogPostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));

  const posts = files.map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf-8");
    const { data, content } = matter(raw);
    const rt = readingTime(content);

    return {
      slug,
      title: data.title ?? "Fără titlu",
      description: data.description ?? "",
      date: data.date ?? new Date().toISOString().split("T")[0],
      category: data.category ?? "General",
      readingTime: `${Math.ceil(rt.minutes)} min`,
      featured: data.featured ?? false,
    } satisfies BlogPostMeta;
  });

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

/** Read a single post by slug, including raw content */
export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const rt = readingTime(content);

  return {
    slug,
    title: data.title ?? "Fără titlu",
    description: data.description ?? "",
    date: data.date ?? new Date().toISOString().split("T")[0],
    category: data.category ?? "General",
    readingTime: `${Math.ceil(rt.minutes)} min`,
    featured: data.featured ?? false,
    content,
  };
}

/** Format date to Romanian locale string */
export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("ro-RO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
