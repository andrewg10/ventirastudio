import Link from "next/link";
import { EMAIL, LEGAL_NAME } from "@/lib/site";

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
      <span className="mono">
        © {new Date().getFullYear()} Ventira Studio · {LEGAL_NAME}
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
      <span className="mono">București, România · {EMAIL}</span>
    </footer>
  );
}
