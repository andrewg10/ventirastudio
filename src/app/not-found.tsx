import Nav from "@/components/Nav";
import ScrollProgress from "@/components/ScrollProgress";
import BookingButton from "@/components/BookingButton";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — Pagina nu a fost găsită | Ventira Studio",
  robots: { index: false, follow: false },
};

const QUICK_LINKS = [
  { label: "Servicii", href: "/#services" },
  { label: "Produse", href: "/produse" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function NotFound() {
  return (
    <>
      <ScrollProgress />
      <Nav />
      <main className="not-found-main">
        {/* Gold glow */}
        <div className="not-found-glow" />

        {/* Large background 404 */}
        <div className="not-found-bg-num" aria-hidden>404</div>

        {/* Content */}
        <div className="not-found-content">
          <span className="section-label">Eroare 404</span>

          <h1 className="not-found-title">
            Pagina nu<br />
            <em style={{ fontStyle: "italic", color: "var(--gold)" }}>există.</em>
          </h1>

          <p className="not-found-desc">
            Pagina pe care o cauți a fost mutată sau nu a existat niciodată.
            Îți sugerăm să te întorci acasă sau să ne contactezi direct.
          </p>

          {/* Actions */}
          <div className="not-found-actions">
            <Link href="/" className="not-found-home-btn">
              ← Înapoi acasă
            </Link>
            <BookingButton
              label="Rezervă apel"
              variant="outline"
              style={{ fontSize: "12px", padding: "15px 32px" }}
            />
          </div>

          {/* Quick links */}
          <div className="not-found-links">
            {QUICK_LINKS.map((l) => (
              <Link key={l.href} href={l.href} className="not-found-link">
                {l.label} →
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
