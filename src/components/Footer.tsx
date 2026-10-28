import Link from "next/link";
import { EMAIL, LEGAL_NAME, CUI, REG_COM, SEDIU, VAT_NOTE, WHATSAPP_DISPLAY, WHATSAPP_NUMBER } from "@/lib/site";

const LINKS = [
  { label: "Produse", href: "/produse" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
  { label: "Confidențialitate", href: "/politica-de-confidentialitate" },
  { label: "Termeni", href: "/termeni-si-conditii" },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      {/* Identitatea firmei — Legea 365/2002 art. 5: denumire, CUI, contact direct */}
      <span className="mono">
        © {new Date().getFullYear()} Ventira Studio · {LEGAL_NAME} · {REG_COM} · CUI {CUI} · {SEDIU} · {VAT_NOTE}
      </span>
      <nav style={{ display: "flex", flexWrap: "wrap", gap: "24px" }}>
        {LINKS.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="mono"
            style={{ color: "var(--muted)", textDecoration: "none", letterSpacing: ".12em" }}
          >
            {l.label}
          </Link>
        ))}
      </nav>
      <span className="mono">
        Tulcea · București ·{" "}
        <a href={`tel:+${WHATSAPP_NUMBER}`} style={{ color: "inherit", textDecoration: "none" }}>
          {WHATSAPP_DISPLAY}
        </a>{" "}
        · {EMAIL}
      </span>
    </footer>
  );
}
