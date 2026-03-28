"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

interface Cta { label: string; href: string; external: boolean; }
interface Product {
  id: string; status: string; number: string; name: string;
  tagline: string; description: string; features: string[];
  cta: Cta; cta2: Cta | null; tag: string;
}

const PRODUCTS: Product[] = [
  {
    id: "ai-receptionist",
    status: "live",
    number: "01",
    name: "AI Receptionist",
    tagline: "Agentul tău de rezervări, disponibil 24/7 pe WhatsApp.",
    description:
      "Un agent AI complet antrenat în română care preia rezervări, gestionează anulări și trimite remindere automate — fără niciun angajat implicat. Se integrează cu Google Calendar și trimite confirmări prin email.",
    features: [
      "Rezervări prin WhatsApp în limbă română",
      "Sincronizare Google Calendar în timp real",
      "Remindere automate cu 24h înainte",
      "Gestionare anulări și modificări",
      "Dashboard complet cu statistici",
      "Multi-tenant — funcționează pentru orice afacere",
    ],
    cta: { label: "Rezervă apel gratuit", href: "/contact", external: false },
    cta2: null,
    tag: "SaaS",
  },
  {
    id: "ai-contabil",
    status: "soon",
    number: "02",
    name: "AI Contabil",
    tagline: "Procesare automată ANAF pentru contabili și antreprenori.",
    description:
      "Încarcă documente ANAF și primești în secunde un raport Excel structurat, gata de analiză. Construit special pentru piața românească, cu înțelegere deplină a formularelor fiscale locale.",
    features: [
      "Procesare PDF-uri ANAF prin AI",
      "Export Excel structurat automat",
      "Analiză pe ani fiscali",
      "Grupare debit/credit pe activitate",
      "Dashboard admin pentru contabili",
      "Sistem de credite & billing integrat",
    ],
    cta: { label: "Notifică-mă la lansare", href: "#contact", external: false },
    cta2: null,
    tag: "SaaS",
  },
  {
    id: "ai-hr",
    status: "soon",
    number: "03",
    name: "AI HR",
    tagline: "Automatizare completă a proceselor de resurse umane.",
    description:
      "De la onboarding la evaluări, de la fișe de post la comunicare internă — un agent AI care gestionează fluxurile HR fără efort manual, respectând legislația muncii din România.",
    features: [
      "Onboarding automat pentru angajați noi",
      "Generare fișe de post cu AI",
      "Comunicare internă automatizată",
      "Programare concedii & pontaj",
      "Evaluări periodice automatizate",
      "Conformitate cu legislația română",
    ],
    cta: { label: "Notifică-mă la lansare", href: "#contact", external: false },
    cta2: null,
    tag: "SaaS",
  },
  {
    id: "custom-agent",
    status: "available",
    number: "04",
    name: "Agent Custom",
    tagline: "Construit de la zero pentru industria și procesele tale.",
    description:
      "Nu orice afacere se potrivește într-un produs standard. Construim agenți AI complet personalizați — de la logica de business la integrările specifice — adaptați exact nevoilor tale.",
    features: [
      "Analiză completă a proceselor existente",
      "Arhitectură custom de la zero",
      "Integrare cu orice API sau sistem",
      "Antrenament pe datele tale specifice",
      "Suport și iterații continue",
      "SLA garantat post-lansare",
    ],
    cta: { label: "Discutăm proiectul", href: "#contact", external: false },
    cta2: null,
    tag: "Custom",
  },
];

const STATUS_CONFIG = {
  live:      { label: "Live acum",   color: "#6fcf8e", pulse: true  },
  soon:      { label: "În curând",   color: "var(--cream-dim)", pulse: false },
  available: { label: "Disponibil",  color: "var(--gold)",      pulse: false },
};

export default function ProductsPageContent() {
  const ref = useRef<HTMLDivElement>(null);
  const [activeProduct, setActiveProduct] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        }),
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    ref.current?.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ paddingTop: "140px" }}>
      {/* Page header */}
      <div style={{ padding: "0 96px", marginBottom: "96px" }}>
        <Link
          href="/"
          className="reveal inline-flex items-center gap-3 font-mono text-[11px] tracking-[0.2em] uppercase text-[var(--cream-dim)] hover:text-[var(--cream)] transition-colors duration-300 mb-12"
          style={{ fontFamily: "var(--font-geist-mono, monospace)" }}
        >
          <span>←</span> Înapoi
        </Link>

        <div className="reveal" style={{ maxWidth: "700px" }}>
          <span
            className="block font-mono text-[10px] tracking-[0.4em] uppercase text-[var(--gold)] mb-8"
            style={{ fontFamily: "var(--font-geist-mono, monospace)" }}
          >
            Produse Ventira
          </span>
          <h1
            style={{
              fontSize: "clamp(48px, 6vw, 80px)",
              fontWeight: 300,
              lineHeight: 1.0,
              fontFamily: "var(--font-cormorant, serif)",
              color: "var(--cream)",
              marginBottom: "24px",
            }}
          >
            Agenți AI gata de{" "}
            <em style={{ fontStyle: "italic", color: "var(--gold)" }}>folosit.</em>
          </h1>
          <p
            className="font-mono text-[13px] leading-[1.8] text-[var(--cream-dim)]"
            style={{ fontFamily: "var(--font-geist-mono, monospace)", maxWidth: "520px" }}
          >
            Produse construite specific pentru piața românească. Fiecare agent este antrenat în română și integrat cu uneltele pe care le folosești deja.
          </p>
        </div>
      </div>

      {/* Products list */}
      <div style={{ padding: "0 96px", marginBottom: "120px" }}>
        <div className="flex flex-col gap-1" style={{ borderTop: "1px solid var(--border)" }}>
          {PRODUCTS.map((product, i) => {
            const statusCfg = STATUS_CONFIG[product.status as keyof typeof STATUS_CONFIG];
            const isOpen = activeProduct === product.id;

            return (
              <div
                key={product.id}
                className="reveal"
                style={{
                  borderBottom: "1px solid var(--border)",
                  transitionDelay: `${i * 80}ms`,
                }}
              >
                {/* Product row header */}
                <button
                  onClick={() => setActiveProduct(isOpen ? null : product.id)}
                  className="w-full text-left group"
                  style={{
                    padding: "40px 0",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    display: "grid",
                    gridTemplateColumns: "80px 1fr auto auto",
                    alignItems: "center",
                    gap: "32px",
                  }}
                >
                  {/* Number */}
                  <span
                    className="font-mono text-[11px] tracking-[0.2em] text-[var(--gold)]"
                    style={{ opacity: 0.5, fontFamily: "var(--font-geist-mono, monospace)" }}
                  >
                    {product.number}
                  </span>

                  {/* Name + tagline */}
                  <div>
                    <div className="flex items-center gap-4 mb-2">
                      <h2
                        className="group-hover:text-[var(--gold)] transition-colors duration-300"
                        style={{
                          fontSize: "clamp(24px, 3vw, 36px)",
                          fontWeight: 300,
                          fontFamily: "var(--font-cormorant, serif)",
                          color: "var(--cream)",
                          lineHeight: 1.1,
                        }}
                      >
                        {product.name}
                      </h2>
                      <span
                        className="font-mono text-[9px] tracking-[0.3em] uppercase px-3 py-1 rounded-[2px]"
                        style={{
                          fontFamily: "var(--font-geist-mono, monospace)",
                          border: "1px solid var(--border)",
                          color: "var(--cream-dim)",
                        }}
                      >
                        {product.tag}
                      </span>
                    </div>
                    <p
                      className="font-mono text-[12px] text-[var(--cream-dim)]"
                      style={{ fontFamily: "var(--font-geist-mono, monospace)" }}
                    >
                      {product.tagline}
                    </p>
                  </div>

                  {/* Status */}
                  <div className="flex items-center gap-2 hidden md:flex">
                    <span
                      className={statusCfg.pulse ? "animate-pulse-dot" : ""}
                      style={{
                        width: "5px",
                        height: "5px",
                        borderRadius: "50%",
                        background: statusCfg.color,
                        display: "inline-block",
                        flexShrink: 0,
                      }}
                    />
                    <span
                      className="font-mono text-[9px] tracking-[0.3em] uppercase"
                      style={{ color: statusCfg.color, fontFamily: "var(--font-geist-mono, monospace)" }}
                    >
                      {statusCfg.label}
                    </span>
                  </div>

                  {/* Expand arrow */}
                  <span
                    style={{
                      fontSize: "18px",
                      color: "var(--gold)",
                      transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                      transition: "transform 0.3s cubic-bezier(0.23,1,0.32,1)",
                      display: "inline-block",
                    }}
                  >
                    +
                  </span>
                </button>

                {/* Expanded content */}
                <div
                  style={{
                    maxHeight: isOpen ? "600px" : "0",
                    overflow: "hidden",
                    transition: "max-height 0.5s cubic-bezier(0.23,1,0.32,1)",
                  }}
                >
                  <div
                    style={{
                      paddingBottom: "48px",
                      paddingLeft: "112px",
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "48px",
                      alignItems: "start",
                    }}
                  >
                    {/* Description */}
                    <div>
                      <p
                        className="font-mono text-[13px] leading-[1.8] text-[var(--cream-dim)] mb-8"
                        style={{ fontFamily: "var(--font-geist-mono, monospace)" }}
                      >
                        {product.description}
                      </p>
                      <div className="flex gap-4 flex-wrap">
                        <Link
                          href={product.cta.href}
                          target={product.cta.external ? "_blank" : undefined}
                          className="font-mono text-[11px] tracking-[0.2em] uppercase bg-[var(--gold)] text-[var(--bg)] px-8 py-3 rounded-[2px] hover:opacity-85 transition-opacity duration-300"
                          style={{ fontFamily: "var(--font-geist-mono, monospace)" }}
                        >
                          {product.cta.label}
                        </Link>
                        {product.cta2 && (
                          <Link
                            href={product.cta2.href}
                            className="font-mono text-[11px] tracking-[0.2em] uppercase text-[var(--cream-dim)] border border-[var(--border)] px-8 py-3 rounded-[2px] hover:border-[var(--gold)] hover:text-[var(--cream)] transition-all duration-300"
                            style={{ fontFamily: "var(--font-geist-mono, monospace)" }}
                          >
                            {product.cta2.label}
                          </Link>
                        )}
                      </div>
                    </div>

                    {/* Features list */}
                    <div>
                      <span
                        className="block font-mono text-[9px] tracking-[0.4em] uppercase text-[var(--gold)] mb-6"
                        style={{ fontFamily: "var(--font-geist-mono, monospace)", opacity: 0.7 }}
                      >
                        Funcționalități
                      </span>
                      <ul className="flex flex-col gap-3">
                        {product.features.map((feature, fi) => (
                          <li
                            key={fi}
                            className="flex items-start gap-3 font-mono text-[12px] text-[var(--cream-dim)]"
                            style={{ fontFamily: "var(--font-geist-mono, monospace)" }}
                          >
                            <span style={{ color: "var(--gold)", marginTop: "2px", flexShrink: 0 }}>—</span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
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
          div[style*="padding: 0 96px"] { padding: 0 32px !important; }
          div[style*="paddingLeft: 112px"] {
            padding-left: 0 !important;
            grid-template-columns: 1fr !important;
          }
          button[style*="gridTemplateColumns"] {
            grid-template-columns: 48px 1fr auto !important;
            gap: 16px !important;
          }
        }
      `}</style>
    </div>
  );
}
