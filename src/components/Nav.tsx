"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import BookingButton from "./BookingButton";

const LINKS = [
  { label: "Servicii",          href: "/#services" },
  { label: "Cum funcționează",  href: "/#how-it-works" },
  { label: "Produse",           href: "/produse" },
  { label: "Blog",              href: "/blog" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: scrolled ? "18px 48px" : "28px 48px",
          background: scrolled ? "rgba(8,8,8,0.88)" : "transparent",
          backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
          borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
          transition: "padding 0.4s, background 0.4s, border-color 0.4s",
        }}
      >
        {/* Logo */}
        <Link href="/" style={{
          fontFamily: "var(--font-geist-mono, monospace)",
          fontSize: "13px", letterSpacing: "0.25em",
          textTransform: "uppercase", color: "var(--gold)",
          textDecoration: "none", flexShrink: 0,
        }}>
          Ventira Studio
        </Link>

        {/* Desktop links */}
        <ul style={{
          display: "flex", gap: "36px", listStyle: "none",
          margin: 0, padding: 0,
        }} className="nav-desktop">
          {LINKS.map((link) => (
            <li key={link.href}>
              <Link href={link.href} style={{
                fontFamily: "var(--font-geist-mono, monospace)",
                fontSize: "11px", letterSpacing: "0.2em",
                textTransform: "uppercase", color: "var(--cream-dim)",
                textDecoration: "none", position: "relative",
                transition: "color 0.3s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = "var(--cream)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = "var(--cream-dim)";
              }}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="nav-desktop">
          <BookingButton
            label="Rezervă apel"
            variant="outline"
            style={{ fontSize: "11px", padding: "10px 24px" }}
          />
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen((o) => !o)}
          className="nav-mobile"
          style={{
            background: "transparent", border: "none",
            cursor: "pointer", padding: "8px",
            flexDirection: "column", gap: "5px",
          }}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {[0, 1, 2].map((i) => (
            <span key={i} style={{
              display: "block", width: "22px", height: "1px",
              background: "var(--gold)",
              transition: "all 0.3s",
              transform: menuOpen
                ? i === 0 ? "translateY(6px) rotate(45deg)"
                : i === 2 ? "translateY(-6px) rotate(-45deg)"
                : "scaleX(0)"
                : "none",
            }} />
          ))}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            position: "fixed", inset: 0, zIndex: 90,
            background: "rgba(8,8,8,0.97)",
            backdropFilter: "blur(20px)",
            flexDirection: "column",
            justifyContent: "center", alignItems: "center",
            gap: "40px",
            animation: "fadeIn 0.2s ease",
          }}
          className="nav-mobile"
        >
          {LINKS.map((link) => (
            <Link key={link.href} href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: "var(--font-cormorant, serif)",
                fontSize: "36px", fontWeight: 300,
                color: "var(--cream)", textDecoration: "none",
                transition: "color 0.3s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--cream)")}
            >
              {link.label}
            </Link>
          ))}
          <BookingButton label="Rezervă apel" variant="primary" style={{ marginTop: "16px" }} />
        </div>
      )}

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .nav-desktop { display: flex; }
        .nav-mobile  { display: none !important; }
        @media (max-width: 768px) {
          nav { padding: 18px 24px !important; }
          .nav-desktop { display: none !important; }
          .nav-mobile  { display: flex !important; }
        }
      `}</style>
    </>
  );
}
