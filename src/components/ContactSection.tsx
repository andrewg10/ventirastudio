import { WA_CONTACT } from "@/lib/site";

export default function ContactSection() {
  return (
    <section className="contact wrap" id="contact">
      <div className="wash gold" style={{ width: "560px", height: "560px", top: 0, right: "-10%" }} />
      <div className="eyebrow mono rv">Primul pas</div>
      <h2 className="rv">
        Spune-mi ce te <em>mănâncă</em> de timp.
      </h2>
      <div className="sub">
        <p className="rv">
          O singură conversație. Îți spun sincer dacă merită automatizat — și
          cât ar costa. Dacă nu merită, îți spun și asta.
        </p>
        <a className="big-wa rv" href={WA_CONTACT} target="_blank" rel="noopener noreferrer">
          <span>Scrie-mi pe WhatsApp →</span>
        </a>
      </div>
    </section>
  );
}
