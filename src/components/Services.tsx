import Link from "next/link";

const PLANS = [
  {
    slug: "esential",
    name: "Esențial",
    tagline: "Pentru un site care trebuie doar să meargă.",
    featured: false,
    items: [
      "Găzduire, domeniu și certificat SSL administrate",
      "Backup săptămânal, păstrat 30 de zile",
      "Monitorizare 24/7, cu alertă dacă site-ul cade",
      "Actualizări de securitate lunare",
      "Răspuns la probleme în prima zi lucrătoare",
      "Raport lunar: stare și backup-uri",
    ],
  },
  {
    slug: "complet",
    name: "Complet",
    tagline: "Pentru afaceri care își actualizează des site-ul sau agentul.",
    featured: true,
    items: [
      "Tot ce include Esențial",
      "Backup zilnic, păstrat 30 de zile",
      "Răspuns la probleme în aceeași zi lucrătoare",
      "Până la 2 ore de modificări pe lună (texte, poze, ajustări)",
      "Agent AI: ajustări de răspunsuri și scenarii, din orele incluse",
      "Raport lunar cu traficul site-ului",
    ],
  },
  {
    slug: "parteneriat",
    name: "Parteneriat",
    tagline: "Pentru afaceri care cresc pe sistemul construit.",
    featured: false,
    items: [
      "Tot ce include Complet",
      "Backup zilnic, păstrat 90 de zile",
      "Intervenție în maxim 4 ore lucrătoare la incidente critice",
      "Până la 6 ore de dezvoltare pe lună",
      "Agent AI optimizat lunar, proactiv",
      "Audit de securitate trimestrial",
      "Apel lunar de 30 de minute, cu recomandări",
    ],
  },
];

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
            ține viu. Prima discuție e gratuită. Primești oferta după o
            discuție de 30 de minute.
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
          <div className="cta">
            <Link href="/contact" className="btn-ghost">Cere ofertă →</Link>
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
          <div className="cta">
            <Link href="/contact" className="btn-ghost">Cere ofertă →</Link>
          </div>
        </div>

        <div className="plans" id="mentenanta">
          <div className="plans-head">
            <div className="rv">
              <span className="gutter-num">03</span>
              <h3>Alege cât de liniștit vrei să dormi.</h3>
            </div>
            <p className="rv">
              Fiecare proiect include un pachet de mentenanță. Alege-l pe cel
              potrivit — oferta o primești după o discuție scurtă.
            </p>
          </div>

          <p className="plan-annual mono rv">Plătești anual? Primești 2 luni gratuite.</p>

          <div className="plan-grid rv">
            {PLANS.map((plan) => (
              <article
                key={plan.slug}
                className={plan.featured ? "plan-card featured" : "plan-card"}
              >
                {plan.featured && <span className="plan-badge mono">Recomandat</span>}
                <h4 className="mono">{plan.name}</h4>
                <p className="plan-tagline">{plan.tagline}</p>
                <ul>
                  {plan.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <Link href={`/contact?pachet=${plan.slug}`} className="btn-wa">
                  <span>Cere ofertă</span>
                </Link>
              </article>
            ))}
          </div>

          <p className="plan-note rv">
            Funcționalitățile noi mari se ofertează separat. Orele nefolosite
            nu se reportează. Costurile serviciilor terțe (WhatsApp/Meta,
            OpenAI, SMS, domeniu) se facturează la cost. La plata anuală, 2 luni
            sunt gratuite.
          </p>
        </div>
      </div>
    </section>
  );
}
