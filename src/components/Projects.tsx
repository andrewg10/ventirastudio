const CASES = [
  {
    number: "01",
    name: "Ventira Agents",
    what: "Agenți AI de rezervări pe WhatsApp pentru saloane, clinici și service-uri. Programări, confirmări și reamintiri, fără recepție.",
    type: "Produs SaaS",
  },
  {
    number: "02",
    name: "FișaRol.ro",
    what: "Generare de fișe de post conforme, în minute în loc de ore. Folosit de firme și contabili din România.",
    type: "Produs SaaS",
  },
  {
    number: "03",
    name: "Speranța Contab",
    what: "Portal pentru cabinet de expertiză contabilă: documente, termene și comunicare cu clienții, într-un singur loc.",
    type: "Client",
  },
];

export default function Projects() {
  return (
    <section className="work wrap" id="proiecte">
      <div className="work-head">
        <div>
          <div className="eyebrow mono rv">Proiecte</div>
          <h2 className="rv">
            Construite <em>de la zero.</em>
          </h2>
        </div>
        <p className="rv" style={{ color: "var(--ink-soft)", maxWidth: "34ch", fontSize: "18px" }}>
          Produse proprii și proiecte de client — fiecare pornit dintr-o
          problemă reală, nu dintr-un template.
        </p>
      </div>

      {CASES.map((c) => (
        <a key={c.number} className="case rv" href="#">
          <span className="gutter-num">{c.number}</span>
          <h3>{c.name}</h3>
          <p className="what">{c.what}</p>
          <span className="type">{c.type}</span>
        </a>
      ))}
    </section>
  );
}
