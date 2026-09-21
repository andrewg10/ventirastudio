interface Case {
  number: string;
  name: string;
  what: string;
  type: string;
  /** External site — whole row becomes a link */
  href?: string;
  /** WhatsApp number (international, no +) — adds a "test the agent" link */
  wa?: string;
}

const WA_TEST_MESSAGE = "Bună! Am văzut agentul pe ventirastudio.ro și vreau să-l testez.";

function waLink(number: string) {
  return `https://wa.me/${number}?text=${encodeURIComponent(WA_TEST_MESSAGE)}`;
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

  // ── Agenți AI în producție ──
  {
    number: "04",
    name: "ConexTrans Dispecerat",
    what: "Agent AI pentru autogară: răspunde la întrebări despre orar și trasee pentru toți operatorii și preia rezervările curselor proprii.",
    type: "Agent AI · Live",
    wa: "40745384267",
  },
  {
    number: "05",
    name: "Agent La Liman",
    what: "Agent AI pe WhatsApp pentru restaurant: preia rezervări de mese și răspunde la întrebări despre meniu, program și evenimente private.",
    type: "Agent AI · Live",
    wa: "40745374765",
  },
  {
    number: "06",
    name: "Le Pelican Sportif",
    what: "Agent AI de rezervări pentru local: programări, confirmări și reamintiri, direct în conversație.",
    type: "Agent AI · Live",
    wa: "40754202153",
  },

  // ── Produse proprii ──
  {
    number: "07",
    name: "Ventira Agents",
    what: "Agenți AI de rezervări pe WhatsApp pentru saloane, clinici și service-uri. Programări, confirmări și reamintiri, fără recepție.",
    type: "Produs SaaS",
    wa: "40769292363",
  },
  {
    number: "08",
    name: "RadarFiscal",
    what: "Citește fișa pe plătitor din SPV și spune cât ai de plată, în ce cont IBAN se plătește și scoate ordinele de plată gata completate. Pentru contabili și antreprenori.",
    type: "Produs SaaS · Live ↗",
    href: "https://radarfiscal.ro",
  },
  {
    number: "09",
    name: "Speranța Digital",
    what: "Site-ul firmei de contabilitate din Tulcea: servicii, consultanță fiscală, salarizare — plus portalul de client pentru documente și termene.",
    type: "Client · Live ↗",
    href: "https://sperantadigital.ro",
  },
];

function CaseBody({ c }: { c: Case }) {
  return (
    <>
      <span className="gutter-num">{c.number}</span>
      <h3>{c.name}</h3>
      <div>
        <p className="what">{c.what}</p>
        {c.wa && (
          <a
            className="try"
            href={waLink(c.wa)}
            target="_blank"
            rel="noopener noreferrer"
          >
            Testează pe WhatsApp ↗
          </a>
        )}
      </div>
      <span className="type">{c.type}</span>
    </>
  );
}

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
          pornit dintr-o problemă reală, nu dintr-un template. Agenții îi poți
          testa direct pe WhatsApp.
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
            <CaseBody c={c} />
          </a>
        ) : (
          <div key={c.number} className="case rv">
            <CaseBody c={c} />
          </div>
        )
      )}
    </section>
  );
}
