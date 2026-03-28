"use client";

import { useEffect, useRef } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  calLink?: string;
}

export default function CalModal({ isOpen, onClose, calLink }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);

  const link = calLink
    || process.env.NEXT_PUBLIC_CAL_LINK
    || "andreigemanaru/consultanta";

  // Build Cal.com URL with dark embed params
  const calUrl = `https://cal.eu/${link}?embed=true&theme=dark&hideEventTypeDetails=false&layout=month_view`;

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
      style={{
        position: "fixed", inset: 0, zIndex: 500,
        background: "rgba(8,8,8,0.95)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "24px",
        animation: "calFadeIn 0.25s ease",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "960px",
          height: "min(90vh, 700px)",
          background: "#0a0908",
          border: "1px solid var(--border)",
          borderRadius: "8px",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          animation: "calSlideUp 0.3s cubic-bezier(0.23,1,0.32,1)",
          boxShadow: "0 40px 120px rgba(0,0,0,0.8), 0 0 0 1px rgba(201,169,110,0.08)",
        }}
      >
        {/* Header */}
        <div style={{
          padding: "20px 28px",
          borderBottom: "1px solid var(--border)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          flexShrink: 0,
          background: "#0e0d0b",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{
              width: "32px", height: "32px", borderRadius: "50%",
              background: "linear-gradient(135deg, var(--gold), rgba(201,169,110,0.4))",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}>
              <span style={{ fontSize: "13px", color: "#080808", fontWeight: 600 }}>V</span>
            </div>
            <div>
              <p style={{
                fontFamily: "var(--font-geist-mono, monospace)",
                fontSize: "9px", letterSpacing: "0.35em",
                textTransform: "uppercase", color: "var(--gold)",
                marginBottom: "2px",
              }}>
                Ventira Studio
              </p>
              <p style={{
                fontFamily: "var(--font-cormorant, serif)",
                fontSize: "18px", fontWeight: 300, color: "var(--cream)",
                lineHeight: 1,
              }}>
                Rezervă apel gratuit — 30 min
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: "transparent",
              border: "1px solid var(--border)", borderRadius: "2px",
              color: "var(--cream-dim)",
              fontFamily: "var(--font-geist-mono, monospace)",
              fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase",
              padding: "7px 14px", cursor: "pointer",
              transition: "border-color 0.2s, color 0.2s",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--gold)";
              (e.currentTarget as HTMLElement).style.color = "var(--cream)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
              (e.currentTarget as HTMLElement).style.color = "var(--cream-dim)";
            }}
          >
            Închide ✕
          </button>
        </div>

        {/* Cal.com iframe — simplest, most reliable approach */}
        <iframe
          src={calUrl}
          style={{
            flex: 1,
            width: "100%",
            border: "none",
            background: "#0a0908",
            colorScheme: "dark",
          }}
          title="Rezervă apel Ventira Studio"
          loading="lazy"
        />
      </div>

      <style>{`
        @keyframes calFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes calSlideUp {
          from { opacity: 0; transform: translateY(28px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }
      `}</style>
    </div>
  );
}
