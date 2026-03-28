"use client";

import { useEffect, useRef, useState } from "react";

// Each step reveals one more message in the WhatsApp mockup
const STEPS = [
  {
    step: "01",
    title: "Clientul scrie pe WhatsApp",
    desc: "Agentul tău AI este disponibil 24/7. Niciun angajat nu trebuie să fie prezent.",
    messages: [
      { from: "client", text: "Bună ziua! Aș vrea să rezerv o ședință de masaj pentru mâine." },
    ],
  },
  {
    step: "02",
    title: "AI-ul înțelege și răspunde",
    desc: "Procesează limbajul natural în română, identifică intenția și răspunde instant.",
    messages: [
      { from: "client", text: "Bună ziua! Aș vrea să rezerv o ședință de masaj pentru mâine." },
      { from: "agent", text: "Bună ziua! Cu plăcere. Ce oră vă convine mâine? Avem disponibil: 10:00, 14:00 sau 17:00." },
    ],
  },
  {
    step: "03",
    title: "Rezervarea e confirmată",
    desc: "Sincronizare automată cu Google Calendar și confirmare prin email.",
    messages: [
      { from: "client", text: "Bună ziua! Aș vrea să rezerv o ședință de masaj pentru mâine." },
      { from: "agent", text: "Bună ziua! Cu plăcere. Ce oră vă convine mâine? Avem disponibil: 10:00, 14:00 sau 17:00." },
      { from: "client", text: "La 14:00 ar fi perfect, mulțumesc!" },
      { from: "agent", text: "✓ Rezervare confirmată — Joi, 14:00. Veți primi o confirmare pe email. Ne vedem atunci!" },
    ],
  },
  {
    step: "04",
    title: "Reminder automat",
    desc: "Cu 24h înainte, clientul primește un reminder. Zero no-show-uri, zero efort din partea ta.",
    messages: [
      { from: "client", text: "Bună ziua! Aș vrea să rezerv o ședință de masaj pentru mâine." },
      { from: "agent", text: "Bună ziua! Cu plăcere. Ce oră vă convine mâine? Avem disponibil: 10:00, 14:00 sau 17:00." },
      { from: "client", text: "La 14:00 ar fi perfect, mulțumesc!" },
      { from: "agent", text: "✓ Rezervare confirmată — Joi, 14:00. Veți primi o confirmare pe email. Ne vedem atunci!" },
      { from: "agent", text: "⏰ Reminder: mâine aveți rezervare la 14:00. Vă așteptăm! Răspundeți ANULARE dacă doriți să modificați." },
    ],
  },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [visibleMessages, setVisibleMessages] = useState<number>(1);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = sectionRef.current.offsetHeight;
      const windowHeight = window.innerHeight;

      // How far we've scrolled into the sticky section (0 → 1)
      const scrolled = Math.max(0, -rect.top);
      const total = sectionHeight - windowHeight;
      const progress = Math.min(1, scrolled / total);

      // Map progress to step index
      const stepIndex = Math.min(STEPS.length - 1, Math.floor(progress * STEPS.length));
      setActiveStep(stepIndex);
      setVisibleMessages(STEPS[stepIndex].messages.length);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const currentStep = STEPS[activeStep];

  return (
    <section id="how-it-works">
      {/* Section label */}
      <div className="flex items-center gap-6" style={{ padding: "0 96px", marginBottom: "0" }}>
        <span
          className="font-mono text-[10px] tracking-[0.35em] uppercase text-[var(--gold)] whitespace-nowrap"
          style={{ fontFamily: "var(--font-geist-mono, monospace)" }}
        >
          Cum funcționează
        </span>
        <div
          className="flex-1 h-px"
          style={{ background: "linear-gradient(to right, var(--border), transparent)" }}
        />
      </div>

      {/* Scroll container — 400vh gives space for 4 steps */}
      <div
        ref={sectionRef}
        style={{ height: "400vh", position: "relative" }}
      >
        <div
          ref={stickyRef}
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            display: "flex",
            alignItems: "center",
            padding: "0 96px",
            overflow: "hidden",
          }}
        >
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
            {/* LEFT — step info */}
            <div>
              {/* Step counter */}
              <span
                className="block font-mono text-[11px] tracking-[0.3em] uppercase mb-6 transition-all duration-500"
                style={{
                  color: "var(--gold)",
                  opacity: 0.7,
                  fontFamily: "var(--font-geist-mono, monospace)",
                }}
              >
                {currentStep.step} / {STEPS.length.toString().padStart(2, "0")}
              </span>

              {/* Title */}
              <h2
                key={`title-${activeStep}`}
                className="mb-6"
                style={{
                  fontSize: "clamp(36px, 4vw, 56px)",
                  fontWeight: 300,
                  lineHeight: 1.15,
                  fontFamily: "var(--font-cormorant, serif)",
                  color: "var(--cream)",
                  animation: "stepIn 0.6s cubic-bezier(0.23,1,0.32,1) both",
                }}
              >
                {currentStep.title}
              </h2>

              {/* Description */}
              <p
                key={`desc-${activeStep}`}
                className="font-mono text-[13px] leading-[1.8] text-[var(--cream-dim)] tracking-[0.01em] mb-12 max-w-md"
                style={{
                  fontFamily: "var(--font-geist-mono, monospace)",
                  animation: "stepIn 0.6s 0.1s cubic-bezier(0.23,1,0.32,1) both",
                }}
              >
                {currentStep.desc}
              </p>

              {/* Step dots */}
              <div className="flex gap-3">
                {STEPS.map((_, i) => (
                  <div
                    key={i}
                    style={{
                      width: i === activeStep ? "32px" : "8px",
                      height: "2px",
                      background: i === activeStep ? "var(--gold)" : "var(--border)",
                      borderRadius: "1px",
                      transition: "all 0.4s cubic-bezier(0.23,1,0.32,1)",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* RIGHT — WhatsApp mockup */}
            <div className="flex justify-center md:justify-end">
              <div
                style={{
                  width: "360px",
                  background: "#111",
                  border: "1px solid var(--border)",
                  borderRadius: "16px",
                  overflow: "hidden",
                  boxShadow: "0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(201,169,110,0.08)",
                }}
              >
                {/* WhatsApp header */}
                <div
                  style={{
                    background: "#1a1a1a",
                    padding: "16px 20px",
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                  }}
                >
                  {/* Avatar */}
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, var(--gold), rgba(201,169,110,0.4))",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <span style={{ fontSize: "14px", color: "#080808", fontWeight: 600 }}>V</span>
                  </div>
                  <div>
                    <p style={{ fontSize: "14px", color: "var(--cream)", fontWeight: 500, lineHeight: 1.3 }}>
                      AI Receptionist
                    </p>
                    <p
                      style={{
                        fontSize: "11px",
                        color: "#6fcf8e",
                        fontFamily: "var(--font-geist-mono, monospace)",
                        letterSpacing: "0.05em",
                      }}
                    >
                      ● online
                    </p>
                  </div>
                </div>

                {/* Messages area */}
                <div
                  style={{
                    padding: "20px 16px",
                    minHeight: "320px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    background: "#0d1117",
                  }}
                >
                  {currentStep.messages.map((msg, i) => {
                    const isClient = msg.from === "client";
                    const isNew = i === currentStep.messages.length - 1 && i > 0;
                    const isConfirm = msg.text.startsWith("✓");
                    const isReminder = msg.text.startsWith("⏰");

                    return (
                      <div
                        key={`${activeStep}-${i}`}
                        style={{
                          display: "flex",
                          justifyContent: isClient ? "flex-end" : "flex-start",
                          animation: isNew ? "msgIn 0.4s cubic-bezier(0.34,1.56,0.64,1) both" : "none",
                        }}
                      >
                        <div
                          style={{
                            maxWidth: "75%",
                            padding: "10px 14px",
                            borderRadius: isClient ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                            fontSize: "13px",
                            lineHeight: 1.5,
                            color: isClient ? "#fff" : "var(--cream)",
                            background: isClient
                              ? "rgba(201,169,110,0.25)"
                              : isConfirm
                              ? "rgba(111,207,142,0.15)"
                              : isReminder
                              ? "rgba(201,169,110,0.1)"
                              : "rgba(255,255,255,0.07)",
                            border: isConfirm
                              ? "1px solid rgba(111,207,142,0.3)"
                              : isReminder
                              ? "1px solid rgba(201,169,110,0.2)"
                              : "1px solid rgba(255,255,255,0.06)",
                            fontFamily: "-apple-system, 'SF Pro Text', sans-serif",
                          }}
                        >
                          {msg.text}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Input bar */}
                <div
                  style={{
                    background: "#1a1a1a",
                    padding: "12px 16px",
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                    display: "flex",
                    gap: "10px",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      flex: 1,
                      background: "rgba(255,255,255,0.05)",
                      borderRadius: "20px",
                      padding: "8px 14px",
                      fontSize: "13px",
                      color: "rgba(240,230,211,0.25)",
                      fontFamily: "-apple-system, sans-serif",
                    }}
                  >
                    Scrieți un mesaj...
                  </div>
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      background: "var(--gold)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M2 8l10-5-4 5 4 5-10-5z" fill="#080808" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes stepIn {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes msgIn {
          from { opacity: 0; transform: scale(0.85) translateY(8px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @media (max-width: 768px) {
          div[style*="position: sticky"] { padding: 0 32px !important; }
          div[style*="width: 360px"] { width: 300px !important; }
        }
      `}</style>
    </section>
  );
}
