import Nav from "@/components/Nav";
import ScrollProgress from "@/components/ScrollProgress";
import Link from "next/link";
import { getPostBySlug, getAllPosts, formatDate } from "@/lib/blog";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "404 — Ventira Studio" };
  return {
    title: `${post.title} — Ventira Studio Blog`,
    description: post.description,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const { compileMDX } = await import("next-mdx-remote/rsc");
  const { content } = await compileMDX({
    source: post.content,
    options: { parseFrontmatter: false },
  });

  return (
    <>
      <ScrollProgress />
      <Nav />
      <main style={{ paddingTop: "140px", minHeight: "100vh" }}>
        <article className="article-layout">
          <Link href="/blog" className="back-link">
            ← Înapoi la blog
          </Link>

          <div className="meta-row">
            <span className="category-badge">{post.category}</span>
            <span className="meta-text">{formatDate(post.date)}</span>
            <span className="meta-text">· {post.readingTime} lectură</span>
          </div>

          <h1 className="post-title">{post.title}</h1>

          <p className="post-description">{post.description}</p>

          <div className="prose-ventira">{content}</div>

          <div className="post-footer">
            <p className="footer-text">
              Vrei să implementezi ceva similar pentru afacerea ta?
            </p>
            <Link href="/contact" className="footer-cta">
              Rezervă apel gratuit →
            </Link>
          </div>
        </article>
      </main>
    </>
  );
}
