"use client";

import { useEffect, useRef, useState } from "react";

const TESTIMONIALS = [
  {
    quote:
      "Am pierdut ore întregi în fiecare săptămână cu programările. De când am AI Receptionist, clienții se programează singuri — inclusiv duminica la miezul nopții. Nu-mi vine să cred că am așteptat atât.",
    name: "Andreea M.",
    role: "Proprietar salon de înfrumusețare, București",
    rating: 5,
    initial: "A",
  },
  {
    quote:
      "Eram sceptic că un AI poate vorbi natural în română cu clienții mei. Prima săptămână m-a convins complet. Rata de no-show a scăzut dramatic, iar eu nu mai răspund la telefon în timpul antrenamentelor.",
    name: "Bogdan T.",
    role: "Antrenor personal & co-fondator sală fitness, Cluj",
    rating: 5,
    initial: "B",
  },
  {
    quote:
      "Ventira a înțeles exact ce aveam nevoie fără să fie nevoie să explic de trei ori. Implementarea a durat mai puțin decât mă așteptam și totul funcționează perfect cu Google Calendar.",
    name: "Raluca D.",
    role: "Cabinet stomatologic, Timișoara",
    rating: 5,
    initial: "R",
  },
  {
    quote:
      "Ca antreprenor cu mai multe afaceri, nu aveam timp să gestionez rezervările pentru fiecare. Acum toate rulează automat. Este genul de investiție care se amortizează în prima lună.",
    name: "Mihai P.",
    role: "Antreprenor, 3 locații sportive, Iași",
    rating: 5,
    initial: "M",
  },
  {
    quote:
      "Nu m-aș fi gândit vreodată că o soluție AI poate fi atât de accesibilă pentru o afacere mică. Setup-ul a fost simplu, suportul excelent, iar clienții nu știu că vorbesc cu un agent — și asta e cel mai bun compliment.",
    name: "Elena V.",
    role: "Studio yoga, București",
    rating: 5,
    initial: "E",
  },
  {
    quote:
      "Am testat câteva soluții înainte. Niciuna nu înțelegea româna ca lumea. Ventira e prima care funcționează cu adevărat — răspunsurile sună natural, nu traduse din engleză.",
    name: "Cristian O.",
    role: "Cabinet kinetoterapie, Brașov",
    rating: 5,
    initial: "C",
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div style={{ display: "flex", gap: "3px", marginBottom: "24px" }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            d="M7 1l1.5 3.5L12 5l-2.5 2.5.5 3.5L7 9.5 4 11l.5-3.5L2 5l3.5-.5L7 1z"
            fill={i < count ? "var(--gold)" : "rgba(201,169,110,0.2)"}
          />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef(0);
  const dragDelta = useRef(0);
  const total = TESTIMONIALS.length;

  // Scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.08 }
    );
    ref.current?.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Auto-advance every 5s
  useEffect(() => {
    const id = setInterval(() => {
      if (!dragging) setActive((a) => (a + 1) % total);
    }, 5000);
    return () => clearInterval(id);
  }, [dragging, total]);

  function goTo(i: number) {
    setActive(((i % total) + total) % total);
  }

  // Drag / swipe
  function onPointerDown(e: React.PointerEvent) {
    setDragging(true);
    dragStart.current = e.clientX;
    dragDelta.current = 0;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }
  function onPointerMove(e: React.PointerEvent) {
    if (!dragging) return;
    dragDelta.current = e.clientX - dragStart.current;
  }
  function onPointerUp() {
    if (!dragging) return;
    setDragging(false);
    if (dragDelta.current < -60) goTo(active + 1);
    else if (dragDelta.current > 60) goTo(active - 1);
    dragDelta.current = 0;
  }

  return (
    <section ref={ref} id="testimoniale" style={{ padding: "120px 0", overflow: "hidden" }}>
      {/* Section divider */}
      <div className="reveal t-pad" style={{
        display: "flex", alignItems: "center", gap: "24px",
        padding: "0 96px", marginBottom: "80px",
      }}>
        <span style={{
          fontFamily: "var(--font-geist-mono, monospace)",
          fontSize: "10px", letterSpacing: "0.35em",
          textTransform: "uppercase", color: "var(--gold)", whiteSpace: "nowrap",
        }}>
          Ce spun clienții
        </span>
        <div style={{ flex: 1, height: "1px", background: "linear-gradient(to right, var(--border), transparent)" }} />
      </div>

      {/* Header */}
      <div className="reveal t-pad" style={{ padding: "0 96px", marginBottom: "64px" }}>
        <h2 style={{
          fontFamily: "var(--font-cormorant, serif)",
          fontSize: "clamp(36px, 5vw, 60px)",
          fontWeight: 300, lineHeight: 1.1,
          color: "var(--cream)",
        }}>
          Rezultate reale,{" "}
          <em style={{ fontStyle: "italic", color: "var(--gold)" }}>afaceri reale.</em>
        </h2>
      </div>

      {/* Carousel track */}
      <div
        ref={trackRef}
        className="t-pad"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        style={{
          display: "flex",
          gap: "24px",
          padding: "0 96px",
          cursor: dragging ? "grabbing" : "grab",
          userSelect: "none",
          // Show 3 cards on desktop, slide by translating
          transform: `translateX(calc(-${active} * (min(480px, 80vw) + 24px)))`,
          transition: dragging ? "none" : "transform 0.6s cubic-bezier(0.23,1,0.32,1)",
          willChange: "transform",
        }}
      >
        {TESTIMONIALS.map((t, i) => {
          const isActive = i === active;
          return (
            <div
              key={i}
              onClick={() => goTo(i)}
              style={{
                flexShrink: 0,
                width: "min(480px, 80vw)",
                border: "1px solid",
                borderColor: isActive ? "rgba(201,169,110,0.4)" : "var(--border)",
                borderRadius: "4px",
                padding: "48px 40px",
                background: isActive ? "rgba(201,169,110,0.05)" : "rgba(240,230,211,0.02)",
                transition: "border-color 0.4s, background 0.4s, opacity 0.4s",
                opacity: isActive ? 1 : 0.45,
                position: "relative",
                overflow: "hidden",
                cursor: isActive ? "grab" : "pointer",
              }}
            >
              {/* Gold top bar on active */}
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: "1px",
                background: "linear-gradient(to right, transparent, var(--gold), transparent)",
                opacity: isActive ? 1 : 0,
                transition: "opacity 0.4s",
              }} />

              {/* Opening quote mark */}
              <div style={{
                fontFamily: "var(--font-cormorant, serif)",
                fontSize: "80px", lineHeight: 1,
                color: "var(--gold)", opacity: 0.2,
                marginBottom: "-16px", marginLeft: "-8px",
                userSelect: "none",
              }}>
                "
              </div>

              <Stars count={t.rating} />

              <blockquote style={{
                fontFamily: "var(--font-cormorant, serif)",
                fontSize: "clamp(18px, 2vw, 22px)",
                fontWeight: 300, lineHeight: 1.6,
                color: "var(--cream)",
                fontStyle: "italic",
                margin: "0 0 32px",
              }}>
                {t.quote}
              </blockquote>

              {/* Author */}
              <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                {/* Avatar */}
                <div style={{
                  width: "40px", height: "40px", borderRadius: "50%",
                  background: "linear-gradient(135deg, rgba(201,169,110,0.4), rgba(201,169,110,0.1))",
                  border: "1px solid rgba(201,169,110,0.3)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}>
                  <span style={{
                    fontFamily: "var(--font-cormorant, serif)",
                    fontSize: "16px", color: "var(--gold)", fontWeight: 400,
                  }}>
                    {t.initial}
                  </span>
                </div>
                <div>
                  <p style={{
                    fontFamily: "var(--font-geist-mono, monospace)",
                    fontSize: "12px", color: "var(--cream)",
                    letterSpacing: "0.02em", marginBottom: "3px",
                  }}>
                    {t.name}
                  </p>
                  <p style={{
                    fontFamily: "var(--font-geist-mono, monospace)",
                    fontSize: "10px", color: "var(--cream-dim)",
                    letterSpacing: "0.02em",
                  }}>
                    {t.role}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Controls */}
      <div className="reveal t-controls" style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "48px 96px 0",
      }}>
        {/* Dot indicators */}
        <div style={{ display: "flex", gap: "8px" }}>
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              style={{
                width: i === active ? "28px" : "8px",
                height: "2px",
                background: i === active ? "var(--gold)" : "var(--border)",
                border: "none", borderRadius: "1px",
                cursor: "pointer", padding: 0,
                transition: "all 0.4s cubic-bezier(0.23,1,0.32,1)",
              }}
            />
          ))}
        </div>

        {/* Prev / Next arrows */}
        <div style={{ display: "flex", gap: "12px" }}>
          {[
            { dir: -1, label: "←" },
            { dir: +1, label: "→" },
          ].map(({ dir, label }) => (
            <button
              key={dir}
              onClick={() => goTo(active + dir)}
              style={{
                width: "44px", height: "44px",
                background: "transparent",
                border: "1px solid var(--border)",
                borderRadius: "2px",
                color: "var(--cream-dim)",
                fontFamily: "var(--font-geist-mono, monospace)",
                fontSize: "16px", cursor: "pointer",
                transition: "border-color 0.2s, color 0.2s",
                display: "flex", alignItems: "center", justifyContent: "center",
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
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <p className="reveal t-pad" style={{
        fontFamily: "var(--font-geist-mono, monospace)",
        fontSize: "10px", color: "rgba(240,230,211,0.2)",
        letterSpacing: "0.1em", textAlign: "center",
        marginTop: "40px", padding: "0 96px",
      }}>
        * Testimoniale reprezentative pentru tipul de rezultate obținute. Numele sunt parțial anonimizate.
      </p>

      <style>{`
        #testimoniale .reveal {
          opacity: 0; transform: translateY(24px);
          transition: opacity 0.9s cubic-bezier(0.23,1,0.32,1), transform 0.9s cubic-bezier(0.23,1,0.32,1);
        }
        #testimoniale .reveal.visible { opacity: 1; transform: translateY(0); }
        @media (max-width: 768px) {
          #testimoniale { padding: 80px 0 !important; }
          #testimoniale .t-pad { padding-left: 32px !important; padding-right: 32px !important; }
          #testimoniale .t-controls { padding: 32px 32px 0 !important; }
        }
      `}</style>
    </section>
  );
}
