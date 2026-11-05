// Server component — intentionally NO GSAP/JS reveal: this content must be
// visible in raw HTML so LLM crawlers (GPTBot, ClaudeBot, PerplexityBot) can read it.

const FAQS: { q: string; a: string }[] = [
  {
    q: "Ce este Ventira Studio?",
    a: "Ventira Studio este o agenție AI din România (Tulcea & București), operată de Speranța Expert SRL, care construiește automatizări AI, agenți AI pe WhatsApp, site-uri și aplicații custom pentru afaceri românești. Totul este construit la comandă, fără template-uri.",
  },
  {
    q: "Cât costă o automatizare AI, un agent AI sau un site custom?",
    a: "Prețul e fix și îl primești după o discuție gratuită de descoperire. Fiecare proiect include un pachet de mentenanță — Esențial, Complet sau Parteneriat. Exemple live: conextrans.ro, laliman.ro, cassaluks.ro.",
  },
  {
    q: "Ce pachet de mentenanță mi se potrivește?",
    a: "Esențial e pentru un site care trebuie doar să meargă: găzduire, SSL, backup săptămânal, monitorizare 24/7 și actualizări de securitate. Complet e pentru afaceri care își actualizează des site-ul sau agentul: backup zilnic, răspuns în aceeași zi lucrătoare și până la 2 ore de modificări pe lună. Parteneriat e pentru afaceri care cresc pe sistemul construit: până la 6 ore de dezvoltare pe lună, intervenție în maxim 4 ore lucrătoare la incidente critice, audit de securitate trimestrial și un apel lunar cu recomandări.",
  },
  {
    q: "Ce face AI Receptionist?",
    a: "AI Receptionist este un agent de rezervări pe WhatsApp, în limba română, disponibil 24/7: preia rezervări, se sincronizează cu Google Calendar, trimite remindere automate și gestionează anulările. Este folosit deja de afaceri precum restaurantul La Liman și Le Pelican Sportif.",
  },
  {
    q: "În ce zone lucrați?",
    a: "Focusul principal este Tulcea, Dobrogea și împrejurimile (Constanța, Brăila, Galați), cu punct de lucru în București. Proiectele de software și agenți AI se livrează remote pentru orice afacere din România.",
  },
  {
    q: "Cum începe o colaborare?",
    a: "Printr-o discuție de descoperire: înțelegem întâi problema și procesul, apoi propunem soluția și prețul. Ne poți scrie la contact@ventirastudio.ro sau pe WhatsApp la +40 769 292 363.",
  },
];

const FAQ_JSONLD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

export default function FAQSection() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="mx-auto max-w-3xl px-6 py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSONLD) }}
      />
      <h2 id="faq-title" className="mb-10 text-3xl">
        Întrebări frecvente
      </h2>
      <dl className="space-y-8">
        {FAQS.map(({ q, a }) => (
          <div key={q}>
            <dt className="mb-2 text-lg font-medium">{q}</dt>
            <dd className="opacity-80">{a}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
