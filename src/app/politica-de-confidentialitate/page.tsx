import Nav from "@/components/Nav";
import ScrollProgress from "@/components/ScrollProgress";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politica de Confidențialitate — Ventira Studio",
  description: "Politica de confidențialitate și protecția datelor personale conform GDPR pentru Ventira Studio.",
  robots: { index: true, follow: true },
  alternates: { canonical: "/politica-de-confidentialitate" },
};

const LAST_UPDATED = "29 martie 2025";

export default function PoliticaConfidentialitate() {
  return (
    <>
      <ScrollProgress />
      <Nav />
      <main style={{ paddingTop: "140px", minHeight: "100vh" }}>
        <div className="legal-layout">
          <Link href="/" className="back-link">← Înapoi</Link>

          <div style={{ marginBottom: "64px" }}>
            <span className="section-label">Document legal</span>
            <h1 className="page-title">Politica de Confidențialitate</h1>
            <p className="legal-meta">Ultima actualizare: {LAST_UPDATED}</p>
          </div>

          <div className="legal-prose">

            <h2>1. Identitatea operatorului</h2>
            <p>
              Datele dumneavoastră personale sunt prelucrate de <strong>Speranța Expert SRL</strong>,
              cu sediul în Str. Pacii 3, Bl. S2, Sc. B, Et. P, Ap. 01, cod poștal 820025, România,
              CUI <strong>48785293</strong>, denumită în continuare „Ventira Studio", „noi" sau „operatorul".
            </p>
            <p>
              Contact: <a href="mailto:contact@ventirastudio.ro">contact@ventirastudio.ro</a>
            </p>

            <h2>2. Ce date colectăm</h2>
            <p>Colectăm următoarele categorii de date personale:</p>
            <ul>
              <li><strong>Date de contact</strong> — nume, adresă de email, transmise voluntar prin formularul de contact de pe site.</li>
              <li><strong>Date operaționale</strong> — tipul serviciului solicitat, bugetul estimativ și mesajul liber transmis prin formular.</li>
              <li><strong>Date de rezervare</strong> — dacă rezervați un apel prin Cal.com, aceasta implică colectarea de date conform politicii proprii Cal.com (cal.eu).</li>
              <li><strong>Date tehnice</strong> — adresa IP, tipul de browser, paginile vizitate, colectate automat prin serverele de hosting (Railway) în scopuri de securitate și diagnosticare.</li>
            </ul>
            <p>
              <strong>Nu colectăm</strong> date sensibile (origine rasială, opinii politice, date de sănătate, date biometrice) și nu creăm profiluri automate cu efect juridic.
            </p>

            <h2>3. Scopurile și temeiul juridic al prelucrării</h2>
            <div className="legal-table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Scop</th>
                    <th>Temei juridic (GDPR)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Răspuns la solicitările primite prin formularul de contact</td>
                    <td>Art. 6(1)(b) — executarea unui contract / măsuri precontractuale</td>
                  </tr>
                  <tr>
                    <td>Trimiterea ofertelor și propunerilor comerciale solicitate</td>
                    <td>Art. 6(1)(b) — măsuri precontractuale</td>
                  </tr>
                  <tr>
                    <td>Gestionarea relației contractuale cu clienții</td>
                    <td>Art. 6(1)(b) — executarea contractului</td>
                  </tr>
                  <tr>
                    <td>Respectarea obligațiilor legale (arhivare, fiscalitate)</td>
                    <td>Art. 6(1)(c) — obligație legală</td>
                  </tr>
                  <tr>
                    <td>Securitatea sistemelor informatice</td>
                    <td>Art. 6(1)(f) — interes legitim</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2>4. Destinatarii datelor</h2>
            <p>Datele dumneavoastră pot fi transmise către:</p>
            <ul>
              <li><strong>Resend Inc.</strong> (resend.com) — furnizor de servicii email tranzacțional, utilizat pentru transmiterea mesajelor din formular. Datele sunt procesate conform politicii Resend și a acordului de prelucrare a datelor.</li>
              <li><strong>Supabase Inc.</strong> — furnizor de infrastructură cloud cu servere în Uniunea Europeană, utilizat pentru stocarea datelor operaționale.</li>
              <li><strong>Railway Corp.</strong> — furnizor de hosting pentru aplicația web, cu servere în UE.</li>
              <li><strong>Cal.com / Cal.eu</strong> — platformă de programare a întâlnirilor, utilizată dacă alegeți să rezervați un apel.</li>
            </ul>
            <p>
              Nu vindem, nu închiriem și nu cedăm datele dumneavoastră personale către terți în scopuri de marketing.
              Nu transferăm date în afara Spațiului Economic European fără garanții adecvate.
            </p>

            <h2>5. Durata păstrării datelor</h2>
            <ul>
              <li><strong>Date din formularul de contact</strong> — păstrate maximum <strong>2 ani</strong> de la ultima interacțiune, sau până la solicitarea ștergerii.</li>
              <li><strong>Date contractuale</strong> — păstrate <strong>10 ani</strong> conform legislației fiscale române (Legea 82/1991).</li>
              <li><strong>Date tehnice (log-uri)</strong> — maximum <strong>90 de zile</strong>.</li>
            </ul>

            <h2>6. Drepturile dumneavoastră</h2>
            <p>Conform Regulamentului GDPR (UE) 2016/679, beneficiați de următoarele drepturi:</p>
            <ul>
              <li><strong>Dreptul de acces</strong> — puteți solicita o copie a datelor pe care le deținem despre dumneavoastră.</li>
              <li><strong>Dreptul la rectificare</strong> — puteți solicita corectarea datelor inexacte.</li>
              <li><strong>Dreptul la ștergere</strong> — puteți solicita ștergerea datelor, în condițiile prevăzute de GDPR.</li>
              <li><strong>Dreptul la restricționarea prelucrării</strong> — puteți solicita limitarea utilizării datelor în anumite situații.</li>
              <li><strong>Dreptul la portabilitate</strong> — puteți solicita datele într-un format structurat, utilizat frecvent.</li>
              <li><strong>Dreptul de opoziție</strong> — vă puteți opune prelucrărilor bazate pe interes legitim.</li>
              <li><strong>Dreptul de a nu fi supus deciziilor automate</strong> — nu luăm decizii exclusiv automate cu efect juridic asupra dumneavoastră.</li>
            </ul>
            <p>
              Pentru exercitarea oricărui drept, trimiteți o solicitare la{" "}
              <a href="mailto:contact@ventirastudio.ro">contact@ventirastudio.ro</a>.
              Răspundem în maximum <strong>30 de zile</strong> calendaristice.
            </p>
            <p>
              Aveți de asemenea dreptul de a depune o plângere la <strong>Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal (ANSPDCP)</strong>,
              cu sediul în B-dul G-ral. Gheorghe Magheru nr. 28-30, sector 1, București,{" "}
              <a href="https://www.dataprotection.ro" target="_blank" rel="noopener noreferrer">www.dataprotection.ro</a>.
            </p>

            <h2>7. Cookie-uri</h2>
            <p>
              Site-ul ventirastudio.ro utilizează exclusiv cookie-uri tehnice strict necesare funcționării (sesiune, securitate).
              Nu utilizăm cookie-uri de tracking, publicitate sau analiză comportamentală de la terți.
              Nu este necesară obținerea consimțământului pentru cookie-urile strict necesare, conform Directivei ePrivacy.
            </p>

            <h2>8. Securitatea datelor</h2>
            <p>
              Implementăm măsuri tehnice și organizatorice adecvate pentru protejarea datelor: transmisie criptată HTTPS,
              acces restricționat pe bază de autentificare, furnizori de infrastructură cu certificări de securitate (SOC 2).
              În cazul unui incident de securitate care afectează datele dumneavoastră, vă vom notifica conform obligațiilor GDPR.
            </p>

            <h2>9. Modificări ale politicii</h2>
            <p>
              Ne rezervăm dreptul de a actualiza această politică. Versiunea actualizată va fi publicată pe această pagină
              cu data ultimei modificări. Vă recomandăm să verificați periodic această pagină.
            </p>

            <h2>10. Contact</h2>
            <p>
              Pentru orice întrebări legate de prelucrarea datelor dumneavoastră personale:
            </p>
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
