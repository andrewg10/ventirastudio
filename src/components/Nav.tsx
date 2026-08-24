"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { WA_GENERAL } from "@/lib/site";

const LINKS = [
  { label: "Servicii", href: "/#servicii" },
  { label: "Demo", href: "/#demo" },
  { label: "Proiecte", href: "/#proiecte" },
  { label: "Proces", href: "/#proces" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`site-nav${scrolled ? " scrolled" : ""}`}>
      <Link className="logo" href="/">
        <span className="v">Ventira</span>
        <span className="s">STUDIO</span>
      </Link>
      <div className="nav-links">
        {LINKS.map((link) => (
          <Link key={link.href} href={link.href}>
            {link.label}
          </Link>
        ))}
      </div>
      <a
        className="btn-wa"
        href={WA_GENERAL}
        target="_blank"
        rel="noopener noreferrer"
      >
        <span>Scrie-mi pe WhatsApp</span>
      </a>
    </nav>
  );
}
