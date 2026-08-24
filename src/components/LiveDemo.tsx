"use client";

import { useEffect, useRef, useState } from "react";
import { WA_DEMO } from "@/lib/site";

type Msg = { from: "in" | "out"; text: string };

const INITIAL: Msg[] = [
  { from: "in", text: "Bună! Sunt agentul de programări. Cu ce te pot ajuta azi?" },
];

// Reply logic copied from index.html
function reply(t: string): string {
  const s = t.toLowerCase();
  if (/programa|rezerv|maine|mâine|ora|azi|\d{1,2}[:.]\d{2}/.test(s))
    return "Perfect. Am găsit liber mâine la 14:00 și la 16:30. Pe ce nume fac programarea?";
  if (/pret|preț|cost|cat|cât/.test(s))
    return "Prețurile pornesc de la 150 lei, în funcție de serviciu. Vrei să-ți trimit lista completă sau te programez direct?";
  if (/anul(e|a)|sterge|șterge|renunt/.test(s))
    return "Nicio problemă — am anulat. Vrei să reprogramăm pentru altă zi?";
  if (/salut|buna|bună|hey|hello/.test(s))
    return "Salut! Pot să te programez, să-ți spun prețurile sau programul. Ce te interesează?";
  return "Am notat. Un coleg uman îți răspunde imediat pentru detalii — între timp, vrei să-ți rezerv un loc?";
}

export default function LiveDemo() {
  const [messages, setMessages] = useState<Msg[]>(INITIAL);
  const [input, setInput] = useState("");
  const chatRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const el = chatRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages]);

  useEffect(() => () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, []);

  const send = () => {
    const t = input.trim();
    if (!t) return;
    setMessages((m) => [...m, { from: "out", text: t }]);
    setInput("");
    timeoutRef.current = setTimeout(() => {
      setMessages((m) => [...m, { from: "in", text: reply(t) }]);
    }, 700 + Math.random() * 500);
  };

  return (
    <section className="demo" id="demo">
      <div className="wrap">
        <div className="eyebrow mono rv">Atinge, nu doar citi</div>
        <h2 className="rv">
          Un agent <em>viu</em>, chiar aici.
        </h2>
        <div className="demo-grid">
          <div className="demo-copy rv">
            <p>
              Acesta e genul de agent pe care îl instalez pe WhatsApp-ul
              afacerii tale. Scrie-i ceva — o programare, o întrebare de preț
              — și privește cum răspunde.
            </p>
            <p>
              Ce vezi aici e o demonstrație. Al tău va ști serviciile tale,
              programul tău, prețurile tale.
            </p>
            <a
              className="btn-ghost"
              style={{ borderColor: "var(--champagne)", color: "var(--champagne)" }}
              href={WA_DEMO}
              target="_blank"
              rel="noopener noreferrer"
            >
              Vreau unul pentru firma mea →
            </a>
          </div>
          <div className="chat rv" ref={chatRef}>
            <div className="chat-head">
              <span className="dot" />
              <span>Agent Ventira · online</span>
            </div>
            <div>
              {messages.map((m, i) => (
                <div key={i} className={`msg ${m.from} show`}>
                  {m.text}
                </div>
              ))}
            </div>
            <div className="chat-input">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") send();
                }}
                placeholder="ex: vreau o programare mâine la 14:00"
                autoComplete="off"
              />
              <button type="button" onClick={send}>Trimite</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
