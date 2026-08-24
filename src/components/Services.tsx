export default function Services() {
  return (
    <section className="services" id="servicii">
      <div className="wrap">
        <div className="svc-head">
          <div>
            <div className="eyebrow mono rv">Servicii</div>
            <h2 className="rv">
              Trei feluri în care <em>îți cumpăr timp.</em>
            </h2>
          </div>
          <p className="right rv">
            Preț fix, stabilit înainte să încep. Fiecare proiect include un
            plan de mentenanță — un sistem viu are nevoie de cineva care îl
            ține viu. Prima discuție e gratuită.
          </p>
        </div>

        <div className="svc rv">
          <span className="gutter-num">01</span>
          <div>
            <h3>Automatizări &amp; agenți AI</h3>
            <div className="tags">
              <span className="tag">Agent WhatsApp</span>
              <span className="tag">Programări</span>
              <span className="tag">Facturare</span>
              <span className="tag">Rapoarte</span>
            </div>
          </div>
          <p className="desc">
            Un angajat care nu doarme: răspunde clienților, face programări,
            emite facturi și rapoarte. Tu doar verifici dimineața ce s-a
            întâmplat peste noapte.
          </p>
          <div className="price">
            <span className="mono">de la</span>
            <span className="amount">2.500 lei</span>
            <span className="mono" style={{ display: "block", marginTop: "6px" }}>+ mentenanță</span>
          </div>
        </div>

        <div className="svc rv">
          <span className="gutter-num">02</span>
          <div>
            <h3>Site-uri &amp; aplicații custom</h3>
            <div className="tags">
              <span className="tag">Cod de la zero</span>
              <span className="tag">Magazin online</span>
              <span className="tag">Plăți &amp; integrări</span>
              <span className="tag">SEO inclus</span>
            </div>
          </div>
          <p className="desc">
            De la site de prezentare la platformă completă. Fără WordPress,
            fără teme cumpărate — fiecare pagină e scrisă pentru afacerea ta
            și pentru Google. Construcția e accesibilă pentru că nu te vând și
            te las: rămân responsabil de sistem.
          </p>
          <div className="price">
            <span className="mono">de la</span>
            <span className="amount">1.200 lei</span>
            <span className="mono" style={{ display: "block", marginTop: "6px" }}>+ mentenanță</span>
          </div>
        </div>

        <div className="svc rv">
          <span className="gutter-num">03</span>
          <div>
            <h3>Mentenanță &amp; continuitate</h3>
            <div className="tags">
              <span className="tag">Esențial — găzduire, SSL, backup, monitorizare</span>
              <span className="tag">Complet — totul din Esențial + modificări lunare, prioritate</span>
            </div>
          </div>
          <p className="desc">
            Inclusă în fiecare proiect — un sistem fără îngrijire se
            degradează până se oprește. <b>Esențial</b> ține totul în
            funcțiune; <b>Complet</b> îl și evoluează lună de lună. Tu ai un
            singur număr de sunat.
          </p>
          <div className="price">
            <span className="mono">Esențial</span>
            <span className="amount">299 lei/lună</span>
            <span className="mono" style={{ display: "block", marginTop: "12px" }}>Complet</span>
            <span className="amount">399 lei/lună</span>
          </div>
        </div>
      </div>
    </section>
  );
}
