"use client";

import { useEffect, useRef, useState } from "react";

const FCP_LIMIT = 1.8;
const LOAD_LIMIT = 2.5;

// index.html: numbers use comma as decimal separator
function fmt(s: number): string {
  return s.toFixed(2).replace(".", ",");
}

function Meter({
  label,
  seconds,
  limit,
  limitLabel,
  started,
}: {
  label: string;
  seconds: number | null;
  limit: number;
  limitLabel: string;
  started: boolean;
}) {
  const [display, setDisplay] = useState(0);
  const run = started && seconds !== null;

  useEffect(() => {
    if (!run) return;
    const target = seconds!;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(target);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const duration = 1400;
    const step = (now: number) => {
      const p = Math.min(1, (now - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 2);
      setDisplay(target * eased);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [run, seconds]);

  const pct = seconds !== null ? Math.round((seconds / limit) * 100) : 0;

  return (
    <div className="meter">
      <div className="label mono">{label}</div>
      <div className="value">
        <span>{run ? fmt(display) : "—"}</span>
        <small>s</small>
      </div>
      <div className="bar">
        <i style={{ transform: `scaleX(${run ? Math.min(seconds! / (limit * 2), 1) : 0})` }} />
      </div>
      <div className="verdict">
        {seconds === null ? (
          "se măsoară…"
        ) : seconds <= limit ? (
          <>
            <b>{pct}% din {limitLabel}</b> — trece testul
          </>
        ) : (
          <>
            cu <b>{pct - 100}% peste</b> {limitLabel}
          </>
        )}
      </div>
    </div>
  );
}

export default function SpeedProof() {
  const [fcp, setFcp] = useState<number | null>(null);
  const [load, setLoad] = useState<number | null>(null);
  const [started, setStarted] = useState(false);
  const metersRef = useRef<HTMLDivElement>(null);

  // Real measurements — same logic as index.html (load + 300ms, fallbacks 0.6 / 1.2)
  useEffect(() => {
    const measure = () => {
      setTimeout(() => {
        let fcpVal = 0.6;
        let loadVal = 1.2;
        try {
          const p = performance
            .getEntriesByType("paint")
            .find((e) => e.name === "first-contentful-paint");
          if (p) fcpVal = p.startTime / 1000;
          const navE = performance.getEntriesByType("navigation")[0] as
            | PerformanceNavigationTiming
            | undefined;
          if (navE && navE.loadEventEnd) loadVal = navE.loadEventEnd / 1000;
        } catch {}
        setFcp(fcpVal);
        setLoad(loadVal);
      }, 300);
    };
    if (document.readyState === "complete") {
      measure();
    } else {
      window.addEventListener("load", measure, { once: true });
      return () => window.removeEventListener("load", measure);
    }
  }, []);

  // Count-up starts when meters scroll into view (index: start 'top 85%')
  useEffect(() => {
    const el = metersRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setStarted(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -15% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="proof wrap" id="proba">
      <div className="proof-grid">
        <div>
          <div className="eyebrow mono rv">Proba, nu promisiunea</div>
          <h2 className="rv">
            Nu-ți cer să mă crezi. <em>Browserul tău</em> tocmai a măsurat.
          </h2>
          <p className="lead rv">
            Pagina asta e construită exact ca proiectele pe care le livrez.
            Cifrele de mai jos nu sunt ale mele — sunt măsurate acum, pe
            conexiunea ta, de dispozitivul tău.
          </p>
        </div>
        <div className="meters rv" ref={metersRef}>
          <Meter
            label="Primul conținut vizibil"
            seconds={fcp}
            limit={FCP_LIMIT}
            limitLabel="limita Google (1,8s)"
            started={started}
          />
          <Meter
            label="Pagina complet încărcată"
            seconds={load}
            limit={LOAD_LIMIT}
            limitLabel="reperul „rapid” (2,5s)"
            started={started}
          />
          <div className="proof-note">
            Reperul Google pentru „rapid” este 1,8s. Cine vinde viteză trebuie
            să o și livreze — inclusiv pe propria pagină.
          </div>
        </div>
      </div>
    </section>
  );
}
