import { AGENTS, agentLink, WA_DEMO } from "@/lib/site";

export default function LiveDemo() {
  return (
    <section className="demo" id="demo">
      <div className="wrap">
        <div className="eyebrow mono rv">Fără simulări</div>
        <h2 className="rv">
          Agenți <em>vii</em>, în producție.
        </h2>
        <div className="demo-grid">
          <div className="demo-copy rv">
            <p>
              Nu-ți arăt un chat de demonstrație. Ăștia sunt agenții pe care
              i-am instalat la clienți — scrie-le pe WhatsApp și răspund acum,
              cu datele reale ale afacerii lor.
            </p>
            <p>
              Al tău va ști serviciile tale, programul tău, prețurile tale.
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

          <div className="chat rv">
            <div className="chat-head">
              <span className="dot" />
              <span>Agenți activi · WhatsApp</span>
            </div>
            {AGENTS.map((a) => (
              <a
                key={a.number}
                className="agent-row"
                href={agentLink(a.number)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="agent-name">{a.name}</span>
                <span className="agent-meta">{a.business} — {a.does}</span>
                <span className="agent-cta">Scrie-i →</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
