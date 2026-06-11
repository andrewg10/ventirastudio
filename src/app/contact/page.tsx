import Nav from "@/components/Nav";
import ScrollProgress from "@/components/ScrollProgress";
import ContactForm from "@/components/ContactForm";
import BookingButton from "@/components/BookingButton";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — Ventira Studio",
  description: "Rezervă un apel gratuit de 30 de minute cu echipa Ventira Studio.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <ScrollProgress />
      <Nav />
      <main style={{ paddingTop: "140px", minHeight: "100vh" }}>
        <div className="page-layout">
          <div style={{ marginBottom: "80px", maxWidth: "640px" }}>
            <span className="section-label">Contact</span>
            <h1 className="page-title">
              Hai să vorbim despre{" "}
              <em style={{ fontStyle: "italic", color: "var(--gold)" }}>afacerea ta.</em>
            </h1>
            <p className="page-subtitle">
              Completează formularul și te contactăm în maxim 24 de ore. Primul apel este gratuit — fără presiune, fără pitch agresiv.
            </p>
          </div>
          <div className="contact-grid">
            <ContactForm />
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              <div className="info-card">
                <span className="info-label">La ce să te aștepți</span>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "16px" }}>
                  {[
                    { n: "01", t: "Răspundem în maxim 24 de ore în zilele lucrătoare." },
                    { n: "02", t: "Programăm un apel de 30 min pentru a înțelege contextul." },
                    { n: "03", t: "Trimitem o propunere concretă cu timeline și costuri." },
                    { n: "04", t: "Dacă mergem mai departe, începem în 5-7 zile lucrătoare." },
                  ].map(({ n, t }) => (
                    <li key={n} style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
                      <span className="step-num">{n}</span>
                      <span className="step-text">{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="info-card">
                <span className="info-label">Contact direct</span>
                <a href="mailto:contact@ventirastudio.ro" className="direct-email">
                  <span style={{ color: "var(--gold)" }}>→</span>
                  contact@ventirastudio.ro
                </a>
              </div>
              <div className="info-card" style={{ background: "rgba(201,169,110,0.04)" }}>
                <span className="info-label">Preferi să vorbim direct?</span>
                <p className="info-text" style={{ marginBottom: "16px" }}>
                  Rezervă un slot de 30 min direct în calendarul nostru.
                </p>
                <BookingButton
                  label="Alege ora →"
                  variant="primary"
                  style={{ padding: "14px 32px", fontSize: "11px" }}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
