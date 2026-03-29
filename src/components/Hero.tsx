"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import BookingButton from "./BookingButton";

export default function Hero() {
  const lines = [useRef<HTMLSpanElement>(null), useRef<HTMLSpanElement>(null), useRef<HTMLSpanElement>(null)];

  useEffect(() => {
    const delays = [400, 560, 720];
    lines.forEach((ref, i) => {
      if (!ref.current) return;
      setTimeout(() => {
        ref.current!.style.opacity = "1";
        ref.current!.style.transform = "translateY(0)";
      }, delays[i]);
    });
  }, []);

  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        alignItems: "center",
        padding: "0 96px",
        position: "relative",
        overflow: "hidden",
        gap: "64px",
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

      {/* LEFT — Text */}
      <div style={{ position: "relative", zIndex: 2 }}>
        <p style={{
          fontFamily: "var(--font-geist-mono, monospace)",
          fontSize: "11px", letterSpacing: "0.35em",
          textTransform: "uppercase", color: "var(--gold)",
          marginBottom: "40px",
          animation: "fadeUp 0.8s 0.2s cubic-bezier(0.23,1,0.32,1) both",
        }}>
          Ventira Studio — Agenție AI București
        </p>

        <h1 style={{
          fontSize: "clamp(48px, 6vw, 96px)",
          fontWeight: 300, lineHeight: 0.95,
          letterSpacing: "-0.01em",
          fontFamily: "var(--font-cormorant, serif)",
          color: "var(--cream)",
          marginBottom: "48px",
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
                  display: "block", opacity: 0,
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

        <p style={{
          fontFamily: "var(--font-geist-mono, monospace)",
          fontSize: "13px", lineHeight: 1.8,
          color: "var(--cream-dim)", maxWidth: "440px",
          marginBottom: "56px", letterSpacing: "0.02em",
          animation: "fadeUp 0.8s 0.9s cubic-bezier(0.23,1,0.32,1) both",
        }}>
          Construim agenți AI care lucrează non-stop — rezervări,
          contabilitate, suport. Tu te concentrezi pe creștere.
        </p>

        <div style={{
          display: "flex", gap: "24px", alignItems: "center",
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
            <span style={{ height: "1px", width: "32px", background: "currentColor", display: "inline-block" }} />
            Descoperă serviciile
          </Link>
        </div>
      </div>

      {/* RIGHT — Logo cu animații */}
      <div style={{
        position: "relative", zIndex: 2,
        display: "flex", alignItems: "center", justifyContent: "center",
        animation: "fadeUp 0.8s 0.6s cubic-bezier(0.23,1,0.32,1) both",
      }}>
        {/* Outer glow */}
        <div style={{
          position: "absolute",
          width: "420px", height: "420px",
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(201,169,110,0.08) 0%, transparent 70%)",
          animation: "logoPulse 4s ease-in-out infinite",
        }} />
        {/* Rotating ring */}
        <div style={{
          position: "absolute",
          width: "340px", height: "340px",
          borderRadius: "50%",
          border: "1px solid rgba(201,169,110,0.1)",
          animation: "logoRing 12s linear infinite",
        }} />
        {/* Static inner ring */}
        <div style={{
          position: "absolute",
          width: "280px", height: "280px",
          borderRadius: "50%",
          border: "1px solid rgba(201,169,110,0.06)",
        }} />

        {/* Logo */}
        <Image
          src="/ventira-logo-hero.png"
          alt="Ventira Studio"
          width={260}
          height={260}
          priority
          style={{
            position: "relative", zIndex: 2,
            filter: "drop-shadow(0 0 48px rgba(201,169,110,0.2))",
            animation: "logoFloat 6s ease-in-out infinite",
          }}
        />
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
        @keyframes logoPulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50%       { transform: scale(1.06); opacity: 0.7; }
        }
        @keyframes logoFloat {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-14px); }
        }
        @keyframes logoRing {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @media (max-width: 900px) {
          section {
            grid-template-columns: 1fr !important;
            padding: 120px 32px 60px !important;
            gap: 48px !important;
          }
        }
      `}</style>
    </section>
  );
}
