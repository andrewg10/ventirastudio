"use client";

import { useState } from "react";
import CalModal from "./CalModal";

interface BookingButtonProps {
  label?: string;
  variant?: "primary" | "ghost" | "outline";
  className?: string;
  style?: React.CSSProperties;
}

export default function BookingButton({
  label = "Rezervă apel gratuit",
  variant = "primary",
  className = "",
  style = {},
}: BookingButtonProps) {
  const [open, setOpen] = useState(false);
  const calLink = process.env.NEXT_PUBLIC_CAL_LINK ?? "andreigemanaru/consultanta";

  const base: React.CSSProperties = {
    fontFamily: "var(--font-geist-mono, monospace)",
    fontSize: "12px",
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    border: "none",
    borderRadius: "2px",
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    transition: "all 0.3s",
  };

  const variants: Record<string, React.CSSProperties> = {
    primary: { background: "var(--gold)", color: "var(--bg)", padding: "16px 40px" },
    ghost:   { background: "transparent", color: "var(--cream-dim)", padding: "16px 0", border: "none" },
    outline: { background: "transparent", color: "var(--gold)", padding: "10px 24px", border: "1px solid var(--border)" },
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={className}
        style={{ ...base, ...variants[variant], ...style }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLElement;
          if (variant === "primary") el.style.opacity = "0.85";
          if (variant === "outline") {
            el.style.borderColor = "var(--gold)";
            el.style.color = "var(--cream)";
            el.style.background = "var(--gold-dim)";
          }
          if (variant === "ghost") el.style.color = "var(--cream)";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLElement;
          if (variant === "primary") el.style.opacity = "1";
          if (variant === "outline") {
            el.style.borderColor = "var(--border)";
            el.style.color = "var(--gold)";
            el.style.background = "transparent";
          }
          if (variant === "ghost") el.style.color = "var(--cream-dim)";
        }}
      >
        {label}
      </button>

      <CalModal
        isOpen={open}
        onClose={() => setOpen(false)}
        calLink={calLink}
      />
    </>
  );
}
