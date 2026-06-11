"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

const PRODUCTS = [
  {
    status: "live",
    name: "AI Receptionist",
    tagline: "Preia rezervări 24/7 pe WhatsApp.\nSincronizare Google Calendar automată.",
    href: "#contact",
  },
  {
    status: "soon",
    name: "AI Contabil",
    tagline: "Procesează documente ANAF.\nRapoarte automate pentru contabili.",
    href: null,
  },
  {
    status: "soon",
    name: "AI HR",
    tagline: "Onboarding automat, fișe de post,\ncomunicare internă fără efort.",
    href: null,
  },
  {
    status: "soon",
    name: "Agent Custom",
    tagline: "Construit specific pentru\nindustria și procesele tale.",
    href: "#contact",
  },
];

export default function Products() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.1 }
    );
    ref.current?.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div id="products" ref={ref}>
      {/* Divider */}
      <div className="flex items-center gap-6 reveal prod-pad" style={{ padding: "0 96px", marginBottom: "0" }}>
        <span
          className="font-mono text-[10px] tracking-[0.35em] uppercase text-[var(--gold)] whitespace-nowrap"
          style={{ fontFamily: "var(--font-geist-mono, monospace)" }}
        >
          Produse
        </span>
        <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, var(--border), transparent)" }} />
      </div>

      {/* Products strip */}
      <div
        className="flex flex-col md:flex-row"
        style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", marginTop: "0" }}
      >
        {PRODUCTS.map((p, i) => {
          const isLive = p.status === "live";
          const Inner = (
            <div
              className="group flex-1 relative overflow-hidden reveal"
              style={{
                padding: "48px 40px",
                borderRight: i < PRODUCTS.length - 1 ? "1px solid var(--border)" : "none",
                cursor: p.href ? "pointer" : "default",
                transitionDelay: `${i * 80}ms`,
              }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ background: "var(--gold-glow)" }}
              />
              {/* Status */}
              <div
                className="flex items-center gap-2 mb-5 font-mono text-[9px] tracking-[0.35em] uppercase"
                style={{ fontFamily: "var(--font-geist-mono, monospace)" }}
              >
                <span
                  className={isLive ? "animate-pulse-dot" : ""}
                  style={{
                    width: "5px",
                    height: "5px",
                    borderRadius: "50%",
                    background: isLive ? "#6fcf8e" : "var(--cream-dim)",
                    display: "inline-block",
                  }}
                />
                <span style={{ color: isLive ? "#6fcf8e" : "var(--cream-dim)" }}>
                  {isLive ? "Live acum" : "În curând"}
                </span>
              </div>

              <h3
                className="mb-3 relative z-10"
                style={{
                  fontSize: "22px",
                  fontWeight: 300,
                  fontFamily: "var(--font-cormorant, serif)",
                  color: "var(--cream)",
                }}
              >
                {p.name}
              </h3>
              <p
                className="font-mono text-[11px] leading-[1.7] text-[var(--cream-dim)] relative z-10"
                style={{
                  fontFamily: "var(--font-geist-mono, monospace)",
                  whiteSpace: "pre-line",
                }}
              >
                {p.tagline}
              </p>

              {/* Arrow only if linked */}
              {p.href && (
                <span
                  className="block font-mono text-[10px] text-[var(--gold)] mt-4 tracking-[0.2em] uppercase group-hover:translate-x-1 transition-transform duration-300 relative z-10"
                  style={{ fontFamily: "var(--font-geist-mono, monospace)" }}
                >
                  → {isLive ? "Află mai mult" : "Notifică-mă"}
                </span>
              )}
            </div>
          );

          return p.href ? (
            <Link key={p.name} href={p.href} className="flex-1 no-underline">
              {Inner}
            </Link>
          ) : (
            <div key={p.name} className="flex-1">
              {Inner}
            </div>
          );
        })}
      </div>

      <style jsx>{`
        .reveal {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.8s cubic-bezier(0.23,1,0.32,1), transform 0.8s cubic-bezier(0.23,1,0.32,1);
        }
        .reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }
        @media (max-width: 768px) {
          .prod-pad { padding: 0 32px !important; }
          div[class*="flex-col"] > * { border-right: none !important; border-bottom: 1px solid var(--border) !important; }
          div[class*="flex-col"] > *:last-child { border-bottom: none !important; }
        }
      `}</style>
    </div>
  );
}
