"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import BookingButton from "./BookingButton";
import ContactForm from "./ContactForm";

export default function FooterCta() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.06 }
    );
    ref.current?.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="contact" ref={ref} style={{ position: "relative", overflow: "hidden" }}>

      {/* ── CONTACT SECTION ─────────────────────────── */}
      <div style={{ padding: "120px 96px 100px", borderTop: "1px solid var(--border)" }}>
        {/* Top vertical accent */}
        <div style={{
          position: "absolute", top: 0, left: "50%",
          transform: "translateX(-50%)",
          width: "1px", height: "80px",
          background: "linear-gradient(to bottom, transparent, var(--border))",
        }} />

        {/* Gold glow */}
        <div style={{
          position: "absolute", top: "30%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: "800px", height: "500px",
          background: "radial-gradient(ellipse, rgba(201,169,110,0.05) 0%, transparent 65%)",
          pointerEvents: "none",
        }} />

        {/* Header */}
        <div className="reveal" style={{ textAlign: "center", marginBottom: "80px" }}>
          <span style={{
            display: "block",
            fontFamily: "var(--font-geist-mono, monospace)",
            fontSize: "10px", letterSpacing: "0.4em",
            textTransform: "uppercase", color: "var(--gold)",
            marginBottom: "32px",
          }}>
            Hai să lucrăm împreună
          </span>
          <h2 style={{
            fontFamily: "var(--font-cormorant, serif)",
            fontSize: "clamp(44px, 6vw, 88px)",
            fontWeight: 300, lineHeight: 1.05,
            color: "var(--cream)", marginBottom: "24px",
          }}>
            Afacerea ta merită<br />
            să lucreze{" "}
            <em style={{ fontStyle: "italic", color: "var(--gold)" }}>pentru tine.</em>
          </h2>
          <p style={{
            fontFamily: "var(--font-geist-mono, monospace)",
            fontSize: "13px", lineHeight: 1.8,
            color: "var(--cream-dim)", maxWidth: "480px",
            margin: "0 auto",
          }}>
            Completează formularul sau rezervă direct un apel de 30 de minute — gratuit, fără pitch agresiv.
          </p>
        </div>

        {/* Two-column: form + side */}
        <div className="contact-footer-grid reveal" style={{ transitionDelay: "0.1s" }}>
          {/* LEFT — Contact form */}
          <div>
            <span style={{
              display: "block",
              fontFamily: "var(--font-geist-mono, monospace)",
              fontSize: "9px", letterSpacing: "0.4em",
              textTransform: "uppercase", color: "var(--gold)",
              opacity: 0.7, marginBottom: "32px",
            }}>
              Trimite-ne un mesaj
            </span>
            <ContactForm />
          </div>

          {/* RIGHT — Quick booking + info */}
          <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
            {/* Cal booking card */}
            <div style={{
              border: "1px solid var(--border)",
              borderRadius: "4px",
              padding: "40px 36px",
              background: "rgba(201,169,110,0.04)",
              position: "relative", overflow: "hidden",
            }}>
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: "1px",
                background: "linear-gradient(to right, transparent, var(--gold), transparent)",
              }} />
              <span style={{
                display: "block",
                fontFamily: "var(--font-geist-mono, monospace)",
                fontSize: "9px", letterSpacing: "0.4em",
                textTransform: "uppercase", color: "var(--gold)",
                opacity: 0.8, marginBottom: "16px",
              }}>
                Sau rezervă direct
              </span>
              <p style={{
                fontFamily: "var(--font-cormorant, serif)",
                fontSize: "26px", fontWeight: 300,
                color: "var(--cream)", lineHeight: 1.2,
                marginBottom: "12px",
              }}>
                Apel gratuit 30 min
              </p>
              <p style={{
                fontFamily: "var(--font-geist-mono, monospace)",
                fontSize: "12px", lineHeight: 1.7,
                color: "var(--cream-dim)", marginBottom: "28px",
              }}>
                Alegem împreună ora potrivită. Fără formulare, fără așteptare.
              </p>
              <BookingButton
                label="Alege ora →"
                variant="primary"
                style={{ padding: "14px 32px", fontSize: "11px" }}
              />
            </div>

            {/* What to expect */}
            <div style={{
              border: "1px solid var(--border)",
              borderRadius: "4px", padding: "36px 32px",
            }}>
              <span style={{
                display: "block",
                fontFamily: "var(--font-geist-mono, monospace)",
                fontSize: "9px", letterSpacing: "0.4em",
                textTransform: "uppercase", color: "var(--gold)",
                opacity: 0.7, marginBottom: "20px",
              }}>
                La ce să te aștepți
              </span>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "14px" }}>
                {[
                  "Răspuns în maxim 24h în zilele lucrătoare.",
                  "Apel de 30 min pentru a înțelege contextul.",
                  "Propunere concretă cu timeline și costuri.",
                  "Implementare în 5-7 zile dacă mergem mai departe.",
                ].map((text, i) => (
                  <li key={i} style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
                    <span style={{
                      fontFamily: "var(--font-geist-mono, monospace)",
                      fontSize: "10px", color: "var(--gold)",
                      opacity: 0.5, flexShrink: 0, marginTop: "1px",
                      letterSpacing: "0.1em",
                    }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span style={{
                      fontFamily: "var(--font-geist-mono, monospace)",
                      fontSize: "12px", lineHeight: 1.7,
                      color: "var(--cream-dim)",
                    }}>
                      {text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Direct email */}
            <div style={{
              border: "1px solid var(--border)",
              borderRadius: "4px", padding: "24px 32px",
              display: "flex", alignItems: "center", justifyContent: "space-between",
            }}>
              <span style={{
                fontFamily: "var(--font-geist-mono, monospace)",
                fontSize: "11px", color: "var(--cream-dim)",
              }}>
                contact@ventirastudio.ro
              </span>
              <a
                href="mailto:contact@ventirastudio.ro"
                style={{
                  fontFamily: "var(--font-geist-mono, monospace)",
                  fontSize: "10px", letterSpacing: "0.2em",
                  textTransform: "uppercase", color: "var(--gold)",
                  textDecoration: "none",
                }}
              >
                Scrie →
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── FOOTER BAR ──────────────────────────────── */}
      <div style={{
        padding: "32px 96px",
        borderTop: "1px solid var(--border)",
        display: "flex", flexWrap: "wrap",
        justifyContent: "space-between", alignItems: "center",
        gap: "20px",
      }}>
        <Link href="/" style={{
          fontFamily: "var(--font-geist-mono, monospace)",
          fontSize: "12px", letterSpacing: "0.25em",
          textTransform: "uppercase", color: "var(--gold)",
          textDecoration: "none",
        }}>
          Ventira Studio
        </Link>

        <nav style={{ display: "flex", flexWrap: "wrap", gap: "32px" }}>
          {[
            { label: "Servicii", href: "/#services" },
            { label: "Cum funcționează", href: "/#how-it-works" },
            { label: "Produse", href: "/produse" },
            { label: "Blog", href: "/blog" },
            { label: "Contact", href: "/contact" },
          ].map((l) => (
            <Link key={l.href} href={l.href} style={{
              fontFamily: "var(--font-geist-mono, monospace)",
              fontSize: "10px", letterSpacing: "0.2em",
              textTransform: "uppercase", color: "var(--cream-dim)",
              textDecoration: "none", transition: "color 0.3s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--cream)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--cream-dim)")}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <span style={{
          fontFamily: "var(--font-geist-mono, monospace)",
          fontSize: "10px", letterSpacing: "0.1em",
          color: "rgba(240,230,211,0.2)",
        }}>
          © 2025 Ventira Studio
        </span>
      </div>

      <style jsx>{`
        .reveal {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.9s cubic-bezier(0.23,1,0.32,1), transform 0.9s cubic-bezier(0.23,1,0.32,1);
        }
        .reveal.visible { opacity: 1; transform: translateY(0); }
        .contact-footer-grid {
          display: grid;
          grid-template-columns: 1fr 400px;
          gap: 80px;
          align-items: start;
        }
        @media (max-width: 1100px) {
          .contact-footer-grid { grid-template-columns: 1fr; gap: 48px; }
        }
        @media (max-width: 768px) {
          section > div { padding: 80px 32px !important; }
          section > div:last-child { padding: 24px 32px !important; }
        }
      `}</style>
    </section>
  );
}
