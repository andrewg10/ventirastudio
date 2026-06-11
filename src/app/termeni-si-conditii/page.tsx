import Nav from "@/components/Nav";
import ScrollProgress from "@/components/ScrollProgress";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Termeni și Condiții — Ventira Studio",
  description: "Termenii și condițiile de utilizare a serviciilor Ventira Studio.",
  robots: { index: true, follow: true },
  alternates: { canonical: "/termeni-si-conditii" },
};

const LAST_UPDATED = "29 martie 2025";

export default function TermeniConditii() {
  return (
    <>
      <ScrollProgress />
      <Nav />
      <main style={{ paddingTop: "140px", minHeight: "100vh" }}>
        <div className="legal-layout">
          <Link href="/" className="back-link">← Înapoi</Link>

          <div style={{ marginBottom: "64px" }}>
            <span className="section-label">Document legal</span>
            <h1 className="page-title">Termeni și Condiții</h1>
            <p className="legal-meta">Ultima actualizare: {LAST_UPDATED}</p>
          </div>

          <div className="legal-prose">

            <h2>1. Părțile contractante</h2>
            <p>
              Prezentele Termeni și Condiții reglementează relația dintre <strong>Speranța Expert SRL</strong>,
              cu sediul în Str. Pacii 3, Bl. S2, Sc. B, Et. P, Ap. 01, cod poștal 820025, România,
              CUI <strong>48785293</strong>, denumită în continuare „Ventira Studio" sau „Prestatorul",
              și orice persoană fizică sau juridică care utilizează site-ul ventirastudio.ro sau serviciile oferite,
              denumită în continuare „Utilizatorul" sau „Clientul".
            </p>
            <p>
              Prin utilizarea site-ului sau prin plasarea unei comenzi, Clientul acceptă în mod expres acești Termeni și Condiții.
            </p>

            <h2>2. Descrierea serviciilor</h2>
            <p>Ventira Studio oferă următoarele categorii de servicii:</p>
            <ul>
              <li><strong>Produse SaaS</strong> — platforme software cu abonament lunar, inclusiv AI Receptionist și produsele viitoare din portofoliu, accesibile pe baza unui abonament activ.</li>
              <li><strong>Agenți AI la comandă</strong> — dezvoltare de soluții AI personalizate conform specificațiilor agreate contractual cu Clientul.</li>
              <li><strong>Consultanță și strategie</strong> — sesiuni de consultanță privind automatizarea proceselor de afaceri prin inteligență artificială.</li>
              <li><strong>Automatizare end-to-end</strong> — implementarea și integrarea fluxurilor automate cu sistemele existente ale Clientului.</li>
            </ul>
            <p>
              Detaliile specifice, livrabilele, termenele și prețurile fiecărui proiect sunt stabilite prin contract separat sau ofertă acceptată în scris.
            </p>

            <h2>3. Înregistrarea și accesul la servicii</h2>
            <p>
              Accesul la produsele SaaS necesită crearea unui cont cu date corecte și actualizate.
              Clientul este responsabil pentru confidențialitatea credențialelor de acces și pentru toate activitățile desfășurate din contul său.
              Ventira Studio nu este responsabilă pentru prejudiciile cauzate de utilizarea neautorizată a contului ca urmare a neglijenței Clientului.
            </p>

            <h2>4. Prețuri și plăți</h2>
            <ul>
              <li>Prețurile serviciilor sunt cele afișate pe site sau cele convenite prin ofertă scrisă acceptată de Client.</li>
              <li>Toate prețurile sunt exprimate în EUR sau RON și nu includ TVA, acolo unde este aplicabil.</li>
              <li>Plata se efectuează prin mijloacele indicate în ofertă sau în interfața produsului (card bancar prin Stripe, transfer bancar).</li>
              <li>Abonamentele SaaS se reînnoiesc automat la sfârșitul perioadei plătite. Clientul poate anula oricând, cu efect la finalul perioadei curente.</li>
              <li>Facturile sunt emise electronic la adresa de email furnizată la înregistrare.</li>
            </ul>

            <h2>5. Dreptul de retragere</h2>
            <p>
              Conform OUG 34/2014, Clienții persoane fizice care contractează în afara activității lor profesionale beneficiază de un drept de retragere de <strong>14 zile calendaristice</strong> de la data contractării, fără invocarea unui motiv.
            </p>
            <p>
              Dreptul de retragere nu se aplică serviciilor digitale a căror execuție a început cu acordul expres al Clientului și cu recunoașterea că pierde dreptul de retragere odată ce serviciul a fost complet prestat.
            </p>
            <p>
              Pentru exercitarea dreptului de retragere, transmiteți o notificare clară la{" "}
              <a href="mailto:contact@ventirastudio.ro">contact@ventirastudio.ro</a>.
            </p>

            <h2>6. Obligațiile Prestatorului</h2>
            <ul>
              <li>Să presteze serviciile convenite cu diligența unui profesionist din industria IT.</li>
              <li>Să mențină disponibilitatea platformelor SaaS la minimum <strong>99% uptime lunar</strong>, excluzând mentenanța planificată anunțată în avans.</li>
              <li>Să notifice Clientul cu minimum 72 de ore înainte de orice intervenție planificată care poate afecta disponibilitatea serviciilor.</li>
              <li>Să păstreze confidențialitatea informațiilor și datelor Clientului.</li>
              <li>Să răspundă solicitărilor de suport în maximum 24 de ore lucrătoare.</li>
            </ul>

            <h2>7. Obligațiile Clientului</h2>
            <ul>
              <li>Să furnizeze informații corecte și complete necesare prestării serviciilor.</li>
              <li>Să achite contravaloarea serviciilor la termenele convenite.</li>
              <li>Să utilizeze serviciile exclusiv în scopuri legale și în conformitate cu prezentele condiții.</li>
              <li>Să nu reverse-engineereze, copieze sau distribuie software-ul sau soluțiile dezvoltate de Ventira Studio fără acordul scris al acesteia.</li>
              <li>Să nu utilizeze serviciile pentru activități frauduloase, ilegale sau care încalcă drepturile terților.</li>
            </ul>

            <h2>8. Proprietate intelectuală</h2>
            <p>
              Toate elementele site-ului ventirastudio.ro (texte, grafică, cod sursă, logo, denumiri) sunt proprietatea exclusivă a Speranța Expert SRL sau sunt utilizate sub licență și sunt protejate de legislația privind drepturile de autor.
            </p>
            <p>
              Soluțiile custom dezvoltate pentru Client devin proprietatea Clientului după achitarea integrală a prețului convenit, conform prevederilor contractuale specifice fiecărui proiect. Ventira Studio poate utiliza proiectul ca referință în portofoliu, cu acordul prealabil al Clientului.
            </p>
            <p>
              Produsele SaaS (AI Receptionist și altele) rămân proprietatea intelectuală a Ventira Studio. Clientul primește o licență de utilizare non-exclusivă, netransferabilă, pe durata abonamentului activ.
            </p>

            <h2>9. Limitarea răspunderii</h2>
            <p>
              Ventira Studio nu este responsabilă pentru:
            </p>
            <ul>
              <li>Pierderi indirecte, de profit, venituri sau date ale Clientului.</li>
              <li>Întreruperi ale serviciilor cauzate de forță majoră, pene de curent, atacuri cibernetice sau defecțiuni ale infrastructurii terților (hosting, internet, API-uri externe).</li>
              <li>Rezultatele comerciale obținute de Client prin utilizarea serviciilor.</li>
              <li>Conținutul generat de modelele AI, care poate fi inexact — Clientul rămâne responsabil pentru validarea și utilizarea acestuia.</li>
            </ul>
            <p>
              Răspunderea totală a Ventira Studio față de orice Client este limitată la valoarea sumelor plătite de acel Client în ultimele <strong>12 luni</strong> anterioare evenimentului care a generat prejudiciul.
            </p>

            <h2>10. Confidențialitate</h2>
            <p>
              Ambele părți se obligă să păstreze confidențialitatea informațiilor comerciale, tehnice sau de altă natură la care au acces în cadrul colaborării, pe durata contractului și pentru o perioadă de <strong>3 ani</strong> după încetarea acestuia.
            </p>

            <h2>11. Încetarea serviciilor</h2>
            <p>
              Ventira Studio poate suspenda sau înceta accesul la servicii dacă Clientul:
            </p>
            <ul>
              <li>Încalcă prezentele condiții în mod repetat sau grav.</li>
              <li>Nu achită facturile scadente în termen de 15 zile de la notificare.</li>
              <li>Utilizează serviciile în scopuri ilegale sau frauduloase.</li>
            </ul>
            <p>
              La încetarea serviciilor, datele Clientului sunt păstrate 30 de zile pentru export, după care sunt șterse definitiv.
            </p>

            <h2>12. Legea aplicabilă și litigii</h2>
            <p>
              Prezentele Termeni și Condiții sunt guvernate de legislația română. Orice litigiu se va soluționa pe cale amiabilă. În caz de eșec, competența revine instanțelor judecătorești române competente de la sediul Prestatorului.
            </p>
            <p>
              Clienții persoane fizice din UE pot utiliza platforma de soluționare online a litigiilor:{" "}
              <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer">
                ec.europa.eu/consumers/odr
              </a>.
            </p>

            <h2>13. Modificări ale termenilor</h2>
            <p>
              Ne rezervăm dreptul de a modifica acești Termeni și Condiții. Modificările substanțiale vor fi comunicate Clienților activi cu minimum <strong>30 de zile</strong> înainte de intrarea în vigoare, prin email sau notificare în platformă. Utilizarea continuă a serviciilor după data intrării în vigoare constituie acceptarea noilor termeni.
            </p>

            <h2>14. Contact</h2>
            <ul>
              <li>Email: <a href="mailto:contact@ventirastudio.ro">contact@ventirastudio.ro</a></li>
              <li>Adresă: Str. Pacii 3, Bl. S2, Sc. B, Et. P, Ap. 01, cod 820025, România</li>
              <li>Operator: Speranța Expert SRL, CUI 48785293</li>
            </ul>

          </div>
        </div>
      </main>
    </>
  );
}
