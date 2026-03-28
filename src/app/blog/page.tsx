import Nav from "@/components/Nav";
import FooterCta from "@/components/FooterCta";
import ScrollProgress from "@/components/ScrollProgress";
import Link from "next/link";
import { getAllPosts, formatDate } from "@/lib/blog";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — Ventira Studio",
  description: "Articole despre automatizare AI, studii de caz reale și ghiduri practice pentru antreprenori din România.",
};

export default function BlogPage() {
  const posts = getAllPosts();
  const featured = posts.find((p) => p.featured) ?? posts[0];
  const rest = posts.filter((p) => p.slug !== featured?.slug);

  return (
    <>
      <ScrollProgress />
      <Nav />
      <main style={{ paddingTop: "140px", minHeight: "100vh" }}>
        <div className="page-layout">
          <div style={{ marginBottom: "80px" }}>
            <span className="section-label">Blog</span>
            <h1 className="page-title">
              Idei despre{" "}
              <em style={{ fontStyle: "italic", color: "var(--gold)" }}>automatizare.</em>
            </h1>
          </div>

          {featured && (
            <Link href={`/blog/${featured.slug}`} style={{ textDecoration: "none" }} className="featured-link group block mb-1">
              <article className="featured-card">
                <div className="featured-top-border" />
                <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
                  <span className="category-badge">{featured.category}</span>
                  <span className="meta-text">Featured</span>
                </div>
                <h2 className="featured-title">{featured.title}</h2>
                <p className="featured-desc">{featured.description}</p>
                <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
                  <span className="meta-text">{formatDate(featured.date)}</span>
                  <span className="meta-text">{featured.readingTime} lectură</span>
                  <span className="read-link">Citește →</span>
                </div>
              </article>
            </Link>
          )}

          {rest.length > 0 && (
            <div style={{ borderTop: "1px solid var(--border)", paddingTop: "48px", marginTop: "48px", marginBottom: "0" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "24px", marginBottom: "0" }}>
                <span className="section-label" style={{ marginBottom: 0 }}>Toate articolele</span>
                <div style={{ flex: 1, height: "1px", background: "linear-gradient(to right, var(--border), transparent)" }} />
              </div>
            </div>
          )}

          <div className="posts-grid">
            {rest.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} style={{ textDecoration: "none" }} className="group">
                <article className="post-card">
                  <div className="card-top-border" />
                  <span className="category-small">{post.category}</span>
                  <h2 className="post-card-title">{post.title}</h2>
                  <p className="post-card-desc">{post.description}</p>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <span className="meta-text">{formatDate(post.date)}</span>
                    <span className="meta-text">· {post.readingTime}</span>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {posts.length === 0 && (
            <div style={{ textAlign: "center", padding: "80px 0" }}>
              <p className="meta-text">Articolele sunt în pregătire. Revino curând.</p>
            </div>
          )}
        </div>
      </main>
      <FooterCta />
    </>
  );
}
