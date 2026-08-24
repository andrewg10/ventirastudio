export default function Comparison() {
  return (
    <section className="compare wrap">
      <div className="compare-head">
        <div className="eyebrow mono rv">Manual vs. automatizat</div>
        <h2 className="rv">
          Fiecare oră făcută de mână <em>are un preț.</em> Doar că nu apare pe
          nicio factură.
        </h2>
      </div>
      <div className="cmp-grid">
        <div className="cmp-card rv">
          <div className="cmp-row bad">
            <span className="sign">MANUAL</span>
            <p>Răspunzi la aceleași întrebări de 30 de ori pe zi</p>
          </div>
          <div className="cmp-row good">
            <span className="sign">VENTIRA</span>
            <p>Agentul răspunde instant, tu intervii doar la excepții</p>
          </div>
          <div className="cmp-row bad">
            <span className="sign">MANUAL</span>
            <p>Programări notate în agendă, uitate, suprapuse</p>
          </div>
          <div className="cmp-row good">
            <span className="sign">VENTIRA</span>
            <p>Calendar sincronizat, confirmări și reamintiri automate</p>
          </div>
        </div>
        <div className="cmp-card rv">
          <div className="cmp-row bad">
            <span className="sign">MANUAL</span>
            <p>Facturi emise seara, după program, cu greșeli</p>
          </div>
          <div className="cmp-row good">
            <span className="sign">VENTIRA</span>
            <p>Facturare automată la fiecare comandă, zero erori</p>
          </div>
          <div className="cmp-row bad">
            <span className="sign">MANUAL</span>
            <p>Afli cum merge firma abia la finalul lunii</p>
          </div>
          <div className="cmp-row good">
            <span className="sign">VENTIRA</span>
            <p>Raport zilnic pe WhatsApp, cifrele în buzunar</p>
          </div>
        </div>
      </div>
    </section>
  );
}
