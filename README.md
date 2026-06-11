# Ventira Studio — ventirastudio.ro

Site-ul agenției Ventira Studio (Speranța Expert SRL). Next.js App Router, dark premium design ("Dark Sanctum": `#080808` / `#F0E6D3` / `#C9A96E`, Cormorant Garamond + Geist Mono).

## Stack

- **Next.js 16** (App Router, output standalone) + React 19 + TypeScript
- **Tailwind CSS v4** + styled-jsx pentru stiluri scoped per componentă
- **Blog**: MDX din `content/blog/*.mdx` (gray-matter + next-mdx-remote)
- **Booking**: Cal (cal.eu) în modal iframe — `CalModal.tsx`
- **Contact**: `/api/contact` → Resend (rate-limited 3 req / 15 min / IP)
- **Deploy**: Railway, build prin `Dockerfile` (npm ci → next build → standalone runner)

## Rulare locală

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # verificare build de producție
```

## Variabile de mediu

| Variabilă | Rol |
|---|---|
| `RESEND_API_KEY` | trimiterea emailurilor din formularul de contact (fără ea, send-ul e sărit în dev) |
| `CONTACT_EMAIL` | destinatar formular (default: contact@ventirastudio.ro) |
| `NEXT_PUBLIC_CAL_LINK` | link Cal pentru booking (default: andreigemanaru/consultanta) |
| `NEXT_PUBLIC_GA_ID` | GA4 Measurement ID — fără ea, config-ul GA e sărit |
| `NEXT_PUBLIC_ADS_ID` | Google Ads ID (default în cod) |

## Structură

- `src/app/` — pagini: home, /produse, /blog, /blog/[slug], /contact, legal, 404, sitemap, robots, api/contact
- `src/components/` — Hero, Services, HowItWorks, Products, Testimonials, FooterCta, Nav, ContactForm, CalModal, CookieConsent
- `content/blog/` — articole MDX (frontmatter: title, description, date, category, featured)
- `public/` — imagini, favicon, og-image (1200×630)

## Convenții

- Stilurile responsive ale componentelor folosesc clase dedicate (`hiw-*`, `pp-*`, `t-*`, `prod-pad`) în blocuri `<style jsx>` — nu selectori pe atributul `style` (React serializează fără spații, nu se potrivesc).
- Consimțământ cookies: Google Consent Mode v2, default denied pentru EEA; scripturile de tracking se încarcă doar după accept (`CookieConsent.tsx`).
