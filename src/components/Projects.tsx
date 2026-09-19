interface Case {
  number: string;
  name: string;
  what: string;
  type: string;
  href?: string;
}

const CASES: Case[] = [
  // ── Lucrări de client, live ──
  {
    number: "01",
    name: "Autogara Tulcea",
    what: "Platformă pentru Autogara Tulcea: programul curselor tuturor operatorilor, căutare pe destinații, rezervări Tulcea–Constanța, închirieri și bilete.",
    type: "Website · Live ↗",
    href: "https://conextrans.ro",
  },
  {
    number: "02",
    name: "La Liman",
    what: "Site-ul restaurantului de pe faleza Tulcei: meniu complet, galerie, evenimente private și rezervări online cu confirmare telefonică.",
    type: "Website · Live ↗",
    href: "https://laliman.ro",
  },
  {
    number: "03",
    name: "Cassa Luks",
    what: "Site de generare de cereri de ofertă pentru depozitul de materiale de acoperiș: catalog de produse, formulare rapide și comenzi pe WhatsApp.",
    type: "Website · Live ↗",
    href: "https://cassaluks.ro",
  },

  // ── Agenți AI livrați ──
  {
    number: "04",
    name: "ConexTrans Dispecerat",
    what: "Agent AI pentru autogară: răspunde la întrebări despre orar și trasee pentru toți operatorii și preia rezervările curselor proprii.",
    type: "Agent AI",
  },
  {
    number: "05",
    name: "Agent La Liman",
    what: "Agent AI pe WhatsApp pentru restaurant: preia rezervări de mese și răspunde la întrebări despre meniu, program și evenimente private.",
    type: "Agent AI",
  },
  {
    number: "06",
    name: "Le Pelican Sportif",
    what: "Agent AI de rezervări pentru local: programări, confirmări și reamintiri, direct în conversație.",
    type: "Agent AI",
  },

  // ── Produse proprii ──
  {
    number: "07",
    name: "Ventira Agents",
    what: "Agenți AI de rezervări pe WhatsApp pentru saloane, clinici și service-uri. Programări, confirmări și reamintiri, fără recepție.",
    type: "Produs SaaS",
  },
  {
    number: "08",
    name: "FișaRol.ro",
    what: "Generare de fișe de post conforme, în minute în loc de ore. Folosit de firme și contabili din România.",
    type: "Produs SaaS",
  },
  {
    number: "09",
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
          Site-uri live, agenți AI în producție și produse proprii — fiecare
          pornit dintr-o problemă reală, nu dintr-un template.
        </p>
      </div>

      {CASES.map((c) =>
        c.href ? (
          <a
            key={c.number}
            className="case rv"
            href={c.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="gutter-num">{c.number}</span>
            <h3>{c.name}</h3>
            <p className="what">{c.what}</p>
            <span className="type">{c.type}</span>
          </a>
        ) : (
          <div key={c.number} className="case rv">
            <span className="gutter-num">{c.number}</span>
            <h3>{c.name}</h3>
            <p className="what">{c.what}</p>
            <span className="type">{c.type}</span>
          </div>
        )
      )}
    </section>
  );
}
