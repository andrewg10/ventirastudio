"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

const SERVICES = [
  {
    number: "01",
    title: ["Agenți AI", "la comandă"],
    desc: "Construim agenți AI complet personalizați pentru procesele tale specifice. Integrare cu sistemele existente. Fără compromisuri.",
    cta: "Discutăm proiectul",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
        <rect x="4" y="8" width="24" height="24" rx="4" stroke="var(--gold)" strokeWidth="1" />
        <path d="M28 16l8-4v16l-8-4" stroke="var(--gold)" strokeWidth="1" strokeLinejoin="round" />
        <circle cx="16" cy="20" r="4" stroke="var(--gold)" strokeWidth="1" />
      </svg>
    ),
  },
  {
    number: "02",
    title: ["Consultanță", "strategică"],
    desc: "Identificăm procesele care se pot automatiza și construim o foaie de drum clară. Fiecare sesiune se termină cu un plan concret și ROI estimat.",
    cta: "Rezervă sesiunea",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
        <path d="M8 32V16l12-8 12 8v16" stroke="var(--gold)" strokeWidth="1" strokeLinejoin="round" />
        <rect x="14" y="22" width="12" height="10" stroke="var(--gold)" strokeWidth="1" />
        <circle cx="20" cy="12" r="3" stroke="var(--gold)" strokeWidth="1" />
      </svg>
    ),
  },
  {
    number: "03",
    title: ["Automatizare", "end-to-end"],
    desc: "De la WhatsApp la CRM, de la email la calendar — conectăm toate uneltele tale într-un flux automat, fără nicio intervenție manuală.",
    cta: "Vezi cum funcționează",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
        <rect x="6" y="6" width="12" height="12" rx="2" stroke="var(--gold)" strokeWidth="1" />
        <rect x="22" y="6" width="12" height="12" rx="2" stroke="var(--gold)" strokeWidth="1" />
        <rect x="6" y="22" width="12" height="12" rx="2" stroke="var(--gold)" strokeWidth="1" />
        <rect x="22" y="22" width="12" height="12" rx="2" stroke="var(--gold)" strokeWidth="1" />
        <path d="M18 12h4M12 18v4M28 18v4M18 28h4" stroke="var(--gold)" strokeWidth="1" strokeLinecap="round" />
      </svg>
    ),
  },
];

function SectionDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-6 reveal" style={{ padding: "0 96px", marginBottom: "80px" }}>
      <span
        className="font-mono text-[10px] tracking-[0.35em] uppercase text-[var(--gold)] whitespace-nowrap"
        style={{ fontFamily: "var(--font-geist-mono, monospace)" }}
      >
        {label}
      </span>
      <div
        className="flex-1 h-px"
        style={{ background: "linear-gradient(to right, var(--border), transparent)" }}
      />
    </div>
  );
}

export { SectionDivider };

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    const reveals = sectionRef.current?.querySelectorAll(".reveal");
    reveals?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" ref={sectionRef} style={{ padding: "120px 96px" }}>
      {/* Header */}
      <div className="max-w-2xl mb-24 reveal">
        <span
          className="block font-mono text-[10px] tracking-[0.4em] uppercase text-[var(--gold)] mb-8"
          style={{ fontFamily: "var(--font-geist-mono, monospace)" }}
        >
          Ce construim
        </span>
        <h2
          style={{
            fontSize: "clamp(40px, 5vw, 64px)",
            fontWeight: 300,
            lineHeight: 1.1,
            fontFamily: "var(--font-cormorant, serif)",
            color: "var(--cream)",
          }}
        >
          Soluții AI care{" "}
          <em style={{ fontStyle: "italic", color: "var(--gold)" }}>funcționează</em>
          <br />
          în română.
        </h2>
      </div>

      {/* Grid */}
      <div
        className="grid grid-cols-1 md:grid-cols-3"
        style={{ border: "1px solid var(--border)", gap: "1px", background: "var(--border)" }}
      >
        {SERVICES.map((s, i) => (
          <div
            key={s.number}
            className="group relative overflow-hidden reveal"
            style={{
              background: "var(--bg)",
              padding: "56px 48px",
              transitionDelay: `${i * 100}ms`,
            }}
          >
            {/* Hover glow bg */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{ background: "var(--gold-glow)" }}
            />
            {/* Gold top-border reveal */}
            <div
              className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-all duration-500 scale-x-50 group-hover:scale-x-100 origin-left pointer-events-none"
              style={{ background: "linear-gradient(to right, transparent, var(--gold), transparent)" }}
            />

            <span
              className="block font-mono text-[11px] tracking-[0.2em] text-[var(--gold)] mb-10 relative z-10"
              style={{ opacity: 0.6, fontFamily: "var(--font-geist-mono, monospace)" }}
            >
              {s.number}
            </span>
            <div className="mb-8 relative z-10">{s.icon}</div>
            <h3
              className="mb-5 relative z-10"
              style={{
                fontSize: "28px",
                fontWeight: 300,
                lineHeight: 1.2,
                fontFamily: "var(--font-cormorant, serif)",
                color: "var(--cream)",
              }}
            >
              {s.title[0]}
              <br />
              <em style={{ fontStyle: "italic", color: "var(--gold)" }}>{s.title[1]}</em>
            </h3>
            <p
              className="font-mono text-[12px] leading-[1.8] text-[var(--cream-dim)] tracking-[0.01em] mb-10 relative z-10"
              style={{ fontFamily: "var(--font-geist-mono, monospace)" }}
            >
              {s.desc}
            </p>
            <Link
              href="#contact"
              className="font-mono text-[11px] tracking-[0.2em] uppercase text-[var(--gold)] flex items-center gap-2.5 group/link relative z-10 hover:gap-4 transition-all duration-300"
              style={{ fontFamily: "var(--font-geist-mono, monospace)" }}
            >
              {s.cta}
              <span className="group-hover/link:translate-x-1 transition-transform duration-300">→</span>
            </Link>
          </div>
        ))}
      </div>

      <style jsx>{`
        .reveal {
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.9s cubic-bezier(0.23,1,0.32,1), transform 0.9s cubic-bezier(0.23,1,0.32,1);
        }
        .reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }
        @media (max-width: 768px) {
          section { padding: 80px 32px !important; }
        }
      `}</style>
    </section>
  );
}
