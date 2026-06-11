import Nav from "@/components/Nav";
import FooterCta from "@/components/FooterCta";
import ScrollProgress from "@/components/ScrollProgress";
import Link from "next/link";
import Image from "next/image";
import { getAllPosts, formatDate } from "@/lib/blog";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — Ventira Studio",
  description: "Articole despre automatizare AI, studii de caz reale și ghiduri practice pentru antreprenori din România.",
  alternates: { canonical: "/blog" },
};

function getCoverImage(category: string): string {
  const map: Record<string, string> = {
    "Studiu de caz": "/blog-studiu-de-caz.jpg",
    "Automatizare":  "/blog-automatizare.jpg",
    "AI":            "/blog-ai.jpg",
    "Business":      "/blog-business.jpg",
  };
  return map[category] ?? "/blog-default.jpg";
}

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

          {/* Header */}
          <div style={{ marginBottom: "80px" }}>
            <span className="section-label">Blog</span>
            <h1 className="page-title">
              Idei despre{" "}
              <em style={{ fontStyle: "italic", color: "var(--gold)" }}>automatizare.</em>
            </h1>
          </div>

          {/* Featured post */}
          {featured && (
            <Link href={`/blog/${featured.slug}`} style={{ textDecoration: "none" }} className="featured-link group block mb-1">
              <article className="featured-card">
                <div className="featured-top-border" />

                {/* Cover image */}
                <div style={{
                  position: "relative", width: "100%", height: "280px",
                  marginBottom: "36px", borderRadius: "2px", overflow: "hidden",
                }}>
                  <Image
                    src={getCoverImage(featured.category)}
                    alt={featured.title}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 768px) 100vw, 80vw"
                    priority
                  />
                  {/* Overlay */}
                  <div style={{
                    position: "absolute", inset: 0,
                    background: "linear-gradient(to top, rgba(8,8,8,0.7) 0%, transparent 60%)",
                  }} />
                  {/* Category badge */}
                  <div style={{
                    position: "absolute", bottom: "20px", left: "20px",
                    display: "flex", gap: "12px", alignItems: "center",
                  }}>
                    <span className="category-badge">{featured.category}</span>
                    <span className="meta-text" style={{ color: "rgba(240,230,211,0.6)" }}>Featured</span>
                  </div>
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

          {/* All posts divider */}
          {rest.length > 0 && (
            <div style={{ borderTop: "1px solid var(--border)", paddingTop: "48px", marginTop: "48px", display: "flex", alignItems: "center", gap: "24px" }}>
              <span className="section-label" style={{ marginBottom: 0 }}>Toate articolele</span>
              <div style={{ flex: 1, height: "1px", background: "linear-gradient(to right, var(--border), transparent)" }} />
            </div>
          )}

          {/* Posts grid */}
          <div className="posts-grid">
            {rest.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} style={{ textDecoration: "none" }} className="group">
                <article className="post-card">
                  <div className="card-top-border" />

                  {/* Cover image */}
                  <div style={{
                    position: "relative", width: "100%", height: "180px",
                    marginBottom: "24px", borderRadius: "2px", overflow: "hidden",
                  }}>
                    <Image
                      src={getCoverImage(post.category)}
                      alt={post.title}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div style={{
                      position: "absolute", inset: 0,
                      background: "linear-gradient(to top, rgba(8,8,8,0.5) 0%, transparent 70%)",
                    }} />
                  </div>

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
