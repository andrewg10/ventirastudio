import { WA_GENERAL } from "@/lib/site";

function TickerContent() {
  return (
    <>
      <span>Automatizări AI</span>
      <b>·</b>
      <span>Agenți WhatsApp</span>
      <b>·</b>
      <span>Site-uri custom</span>
      <b>·</b>
      <span>Aplicații web</span>
      <b>·</b>
      <span>Integrări & plăți</span>
      <b>·</b>
      <span>Mentenanță</span>
      <b>·</b>
    </>
  );
}

export default function Hero() {
  return (
    <header className="hero wrap" id="top">
      <div className="wash gold" style={{ width: "640px", height: "640px", top: "-10%", right: "-12%" }} />
      <div className="wash blush" style={{ width: "520px", height: "520px", bottom: "8%", left: "-14%" }} />
      <div className="meta-line mono">
        <span>Ventira Studio · București</span>
        <span>Software & AI · Made to order</span>
      </div>
      <h1>
        <span className="line"><span>Afacerea ta,</span></span>
        <span className="line"><span>pe <em>pilot automat</em>,</span></span>
        <span className="line"><span>iar tu comanzi.</span></span>
      </h1>
      <div className="hero-sub">
        <p className="rv">
          Automatizări AI, site-uri și aplicații scrise de la zero pentru
          afaceri din România. Fără șabloane, fără promisiuni umflate —
          sisteme care lucrează în locul tău, măsurabil.
        </p>
        <div className="cta-row rv">
          <a className="btn-ghost" href="#demo">Încearcă un demo viu ↓</a>
          <a className="btn-wa" href={WA_GENERAL} target="_blank" rel="noopener noreferrer">
            <span>Hai să vorbim</span>
          </a>
        </div>
      </div>
      <div className="hero-ticker">
        <div className="track">
          <TickerContent />
          <TickerContent />
        </div>
      </div>
    </header>
  );
}
