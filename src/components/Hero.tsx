"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import BookingButton from "./BookingButton";

export default function Hero() {
  const lines = [useRef<HTMLSpanElement>(null), useRef<HTMLSpanElement>(null), useRef<HTMLSpanElement>(null)];

  useEffect(() => {
    const delays = [400, 560, 720];
    lines.forEach((ref, i) => {
      if (!ref.current) return;
      const el = ref.current;
      setTimeout(() => {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }, delays[i]);
    });
  }, []);

  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "flex-start",
        padding: "0 96px", position: "relative", overflow: "hidden",
      }}
    >
      {/* Gold radial glow */}
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%, -55%)",
        width: "900px", height: "600px",
        background: "radial-gradient(ellipse at center, rgba(201,169,110,0.07) 0%, transparent 65%)",
        pointerEvents: "none", zIndex: 0,
      }} />

      {/* Eyebrow */}
      <p style={{
        fontFamily: "var(--font-geist-mono, monospace)",
        fontSize: "11px", letterSpacing: "0.35em",
        textTransform: "uppercase", color: "var(--gold)",
        marginBottom: "40px", position: "relative", zIndex: 2,
        animation: "fadeUp 0.8s 0.2s cubic-bezier(0.23,1,0.32,1) both",
      }}>
        Ventira Studio — Agenție AI București
      </p>

      {/* Headline */}
      <h1 style={{
        fontSize: "clamp(64px, 9vw, 120px)",
        fontWeight: 300, lineHeight: 0.95,
        letterSpacing: "-0.01em",
        fontFamily: "var(--font-cormorant, serif)",
        color: "var(--cream)",
        marginBottom: "48px", position: "relative", zIndex: 2,
      }}>
        {[
          { text: "Automatizare", italic: false },
          { text: "inteligentă",  italic: true  },
          { text: "pentru afaceri.", italic: false },
        ].map(({ text, italic }, i) => (
          <span key={i} style={{ display: "block", overflow: "hidden" }}>
            <span
              ref={lines[i]}
              style={{
                display: "block",
                opacity: 0,
                transform: "translateY(100%)",
                transition: `opacity 0.9s ${i * 150}ms cubic-bezier(0.23,1,0.32,1), transform 0.9s ${i * 150}ms cubic-bezier(0.23,1,0.32,1)`,
                color: italic ? "var(--gold)" : "var(--cream)",
                fontStyle: italic ? "italic" : "normal",
              }}
            >
              {text}
            </span>
          </span>
        ))}
      </h1>

      {/* Sub */}
      <p style={{
        fontFamily: "var(--font-geist-mono, monospace)",
        fontSize: "13px", lineHeight: 1.8,
        color: "var(--cream-dim)", maxWidth: "480px",
        marginBottom: "56px", letterSpacing: "0.02em",
        position: "relative", zIndex: 2,
        animation: "fadeUp 0.8s 0.9s cubic-bezier(0.23,1,0.32,1) both",
      }}>
        Construim agenți AI care lucrează non-stop — rezervări, contabilitate, suport.
        Tu te concentrezi pe creștere.
      </p>

      {/* Actions */}
      <div style={{
        display: "flex", gap: "24px", alignItems: "center",
        position: "relative", zIndex: 2,
        animation: "fadeUp 0.8s 1.1s cubic-bezier(0.23,1,0.32,1) both",
      }}>
        <BookingButton label="Rezervă apel gratuit" variant="primary" />
        <Link
          href="#services"
          style={{
            fontFamily: "var(--font-geist-mono, monospace)",
            fontSize: "12px", letterSpacing: "0.2em",
            textTransform: "uppercase", color: "var(--cream-dim)",
            textDecoration: "none", display: "flex",
            alignItems: "center", gap: "12px",
            transition: "color 0.3s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--cream)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--cream-dim)")}
        >
          <span style={{
            height: "1px", width: "32px",
            background: "currentColor", display: "inline-block",
            transition: "width 0.3s",
          }} />
          Descoperă serviciile
        </Link>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: "absolute", bottom: "48px", left: "96px",
        display: "flex", alignItems: "center", gap: "16px", zIndex: 2,
        animation: "fadeUp 0.8s 1.5s cubic-bezier(0.23,1,0.32,1) both",
      }}>
        <div style={{
          width: "1px", height: "64px",
          background: "linear-gradient(to bottom, rgba(201,169,110,0.5), transparent)",
          animation: "scrollPulse 2s 2s ease-in-out infinite",
        }} />
        <span style={{
          fontFamily: "var(--font-geist-mono, monospace)",
          fontSize: "10px", letterSpacing: "0.3em",
          textTransform: "uppercase", color: "rgba(240,230,211,0.3)",
        }}>
          Scroll
        </span>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.5; transform: scaleY(1); }
          50%       { opacity: 1;   transform: scaleY(0.6); }
        }
        @media (max-width: 768px) {
          section { padding: 0 32px !important; }
          section > div[style*="bottom: 48px"] { left: 32px !important; }
        }
      `}</style>
    </section>
  );
}
