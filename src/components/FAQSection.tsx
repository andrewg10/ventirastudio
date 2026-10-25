// Server component — intentionally NO GSAP/JS reveal: this content must be
// visible in raw HTML so LLM crawlers (GPTBot, ClaudeBot, PerplexityBot) can read it.

const FAQS: { q: string; a: string }[] = [
  {
    q: "Ce este Ventira Studio?",
    a: "Ventira Studio este o agenție AI din România (Tulcea & București), operată de Speranța Expert SRL, care construiește automatizări AI, agenți AI pe WhatsApp, site-uri și aplicații custom pentru afaceri românești. Totul este construit la comandă, fără template-uri.",
  },
  {
    q: "Cât costă o automatizare AI sau un agent AI?",
    a: "Automatizările și agenții AI pornesc de la 4.000 lei, plus un abonament de mentenanță lunară (Esențial 399 lei/lună sau Complet 499 lei/lună). Prețul final se stabilește după o discuție de descoperire, în funcție de complexitatea procesului automatizat.",
  },
  {
    q: "Cât costă un site custom?",
    a: "Site-urile și aplicațiile web construite la comandă pornesc de la 1.500 lei. Exemple live: conextrans.ro, laliman.ro, cassaluks.ro.",
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
