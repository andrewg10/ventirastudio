const STEPS = [
  {
    num: "01 / Descoperire",
    title: "Înțeleg problema",
    desc: "O discuție de 30 de minute. Nu vând nimic — aflu ce te costă timp și bani.",
  },
  {
    num: "02 / Preț fix",
    title: "Negru pe alb",
    desc: "Primești un preț fix și un termen clar, înainte să scriu o linie de cod.",
  },
  {
    num: "03 / Construcție",
    title: "Vezi progresul",
    desc: "Lucrez în iterații scurte. Vezi sistemul crescând, nu aștepți o „mare dezvăluire”.",
  },
  {
    num: "04 / Continuitate",
    title: "Al tău, dar nu singur",
    desc: "Cod, acces, documentație — totul e al tău. Iar eu rămân responsabil: mentenanța face parte din fiecare proiect, ca sistemul să meargă și mâine.",
  },
];

export default function Process() {
  return (
    <section className="process" id="proces">
      <div className="wrap">
        <div className="eyebrow mono rv">Procesul</div>
        <h2 className="rv">
          De la problemă la sistem, <em>pe un singur fir.</em>
        </h2>
        <div className="steps">
          {STEPS.map((s) => (
            <div key={s.num} className="step rv">
              <span className="num">{s.num}</span>
              <h4>{s.title}</h4>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
