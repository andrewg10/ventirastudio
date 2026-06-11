"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

// GA4 Measurement ID — set NEXT_PUBLIC_GA_ID in env; GA config is skipped when missing
const GA_ID  = process.env.NEXT_PUBLIC_GA_ID ?? "";
const ADS_ID = process.env.NEXT_PUBLIC_ADS_ID ?? "AW-17916020292";

type ConsentValue = "granted" | "denied";

interface ConsentState {
  analytics:   ConsentValue;
  advertising: ConsentValue;
}

function pushConsent(state: ConsentState) {
  if (typeof window === "undefined") return;
  const w = window as any;
  if (!w.gtag) return;
  w.gtag("consent", "update", {
    analytics_storage:      state.analytics,
    ad_storage:             state.advertising,
    ad_user_data:           state.advertising,
    ad_personalization:     state.advertising,
  });
}

function loadScripts() {
  if (typeof window === "undefined") return;
  if ((window as any).__trackingLoaded) return;
  (window as any).__trackingLoaded = true;

  // Google Ads + GA4 — single gtag.js load handles both
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${ADS_ID}`;
  document.head.appendChild(script);

  script.onload = () => {
    const w = window as any;
    w.dataLayer = w.dataLayer || [];
    w.gtag = function () { w.dataLayer.push(arguments); };
    w.gtag("js", new Date());
    w.gtag("config", ADS_ID);
    // Only configure GA4 when a real measurement ID is provided
    if (GA_ID && GA_ID.startsWith("G-")) w.gtag("config", GA_ID);
  };
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("cookie_consent");

    if (saved) {
      const parsed: ConsentState = JSON.parse(saved);
      // Re-apply stored consent and load scripts if previously accepted
      pushConsent(parsed);
      if (parsed.analytics === "granted" || parsed.advertising === "granted") {
        loadScripts();
      }
      return; // Don't show banner again
    }

    // No decision yet — show banner after short delay
    const timer = setTimeout(() => setVisible(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  function accept() {
    const state: ConsentState = { analytics: "granted", advertising: "granted" };
    localStorage.setItem("cookie_consent", JSON.stringify(state));
    pushConsent(state);
    loadScripts();
    setVisible(false);
  }

  function decline() {
    const state: ConsentState = { analytics: "denied", advertising: "denied" };
    localStorage.setItem("cookie_consent", JSON.stringify(state));
    pushConsent(state);
    // Don't load tracking scripts
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Consimțământ cookie-uri"
      style={{
        position: "fixed",
        bottom: "24px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 1000,
        width: "min(680px, calc(100vw - 48px))",
        background: "#0e0d0b",
        border: "1px solid var(--border)",
        borderRadius: "4px",
        padding: "20px 24px",
        display: "flex",
        alignItems: "center",
        gap: "20px",
        flexWrap: "wrap",
        boxShadow: "0 16px 48px rgba(0,0,0,0.6), 0 0 0 1px rgba(201,169,110,0.06)",
        animation: "cookieSlideUp 0.4s cubic-bezier(0.23,1,0.32,1)",
      }}
    >
      {/* Top gold accent */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "1px",
        background: "linear-gradient(to right, transparent, var(--gold), transparent)",
      }} />

      {/* Text */}
      <p style={{
        flex: 1,
        fontFamily: "var(--font-geist-mono, monospace)",
        fontSize: "11px",
        lineHeight: 1.7,
        color: "var(--cream-dim)",
        margin: 0,
        minWidth: "200px",
      }}>
        Folosim cookie-uri pentru analiză și publicitate.{" "}
        <Link
          href="/politica-de-confidentialitate"
          style={{
            color: "var(--gold)",
            textDecoration: "none",
            borderBottom: "1px solid rgba(201,169,110,0.3)",
          }}
        >
          Politica de confidențialitate
        </Link>
        .
      </p>

      {/* Buttons */}
      <div style={{ display: "flex", gap: "10px", flexShrink: 0 }}>
        <button
          onClick={decline}
          style={{
            fontFamily: "var(--font-geist-mono, monospace)",
            fontSize: "10px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            background: "transparent",
            border: "1px solid var(--border)",
            borderRadius: "2px",
            color: "var(--cream-dim)",
            padding: "8px 18px",
            cursor: "pointer",
            transition: "border-color 0.2s, color 0.2s",
            whiteSpace: "nowrap",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(240,230,211,0.3)";
            (e.currentTarget as HTMLElement).style.color = "var(--cream)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
            (e.currentTarget as HTMLElement).style.color = "var(--cream-dim)";
          }}
        >
          Refuz
        </button>

        <button
          onClick={accept}
          style={{
            fontFamily: "var(--font-geist-mono, monospace)",
            fontSize: "10px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            background: "var(--gold)",
            border: "none",
            borderRadius: "2px",
            color: "var(--bg)",
            padding: "8px 20px",
            cursor: "pointer",
            transition: "opacity 0.2s",
            whiteSpace: "nowrap",
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.85")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
        >
          Accept
        </button>
      </div>

      <style>{`
        @keyframes cookieSlideUp {
          from { opacity: 0; transform: translateX(-50%) translateY(16px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>
    </div>
  );
}
