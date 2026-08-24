# MASTER PROMPT — Ventira Studio portfolio/site build

Paste everything below the line into any capable AI (Claude Code, Cursor, etc.).
Works for building from scratch OR rebuilding an existing page (attach/point to the current code and say "rebuild this to match the system below").

---

You are building the portfolio website for **Ventira Studio** (ventirastudio.ro) — a solo Romanian software studio run by Andrei: AI automations/agents, custom websites & apps, maintenance retainers. Market: Romania. The site must feel **"expensive-good"**: a quiet, visionary builder. Not loud, not corporate, not template-looking.

## Visual identity (locked — do not deviate)

- **Base: light editorial.** Warm cream paper `#FAF6EE`, secondary `#F4EDE0`, ink `#171310`, soft ink `#4A423A`, muted `#8A7F72`.
- **Accent: gold/champagne** `#C9A96E`, deep gold `#A8874B`. Optional secondary warmth: blush `#EAD9C9`. No other accent colors.
- **Typography: serif + mono mix.** Display: Cormorant Garamond (500/600, tight leading ~1.05, big sizes via clamp, italic words in gold as emphasis). Labels/numbers/UI: Geist Mono, 10–12px, uppercase, letter-spacing .12–.2em. Body: Cormorant Garamond 18–21px.
- **Layout: editorial asymmetric.** Magazine energy — offset columns, generous whitespace, hairline rules `rgba(23,19,16,.12)`, index numbers (01, 02…) in gutters, right-aligned meta text. Never centered-symmetric hero blocks.
- **Texture:** subtle SVG grain overlay (~5% opacity, fixed) + 2–3 large blurred radial washes (gold/blush, blur 90px) drifting slowly with scroll parallax.
- **Logotype:** "Ventira" in serif + "STUDIO" in small letterspaced mono, baseline lockup.
- **Dark is allowed for ONE inverted section** (ink background, gold accents) to create rhythm — e.g. the live demo section.

## Motion system (rich but smooth)

- GSAP + ScrollTrigger; Lenis smooth scroll (lerp ~0.1).
- One easing family everywhere: `power3.out` / `power4.out`.
- Hero H1: line-mask reveal (overflow:hidden per line, translateY(110%) → 0, stagger .14).
- Everything else: reveal on scroll (opacity 0 + y:36px → visible at `top 88%`), stagger siblings.
- Washes: slow scroll parallax (`scrub`), yPercent -15…-20.
- Buttons: pill, ink background, gold fill-sweep on hover via ::before scaleX.
- List rows (services/cases): hover → title slides 12px right + turns gold.
- Numbers: count-up on scroll into view.
- Respect `prefers-reduced-motion`. Animate only transform/opacity.
- **Hard performance rule: FCP under 1.8s.** Font preconnect, no hero images, CSS gradients only, no heavy libraries beyond GSAP/Lenis.

## Voice & language

Romanian, informal „tu" but elevated — literate, calm, zero agency-hype. Short declarative sentences. Blunt honesty as a brand trait ("Dacă nu merită automatizat, îți spun și asta."). Hero manifesto (locked): „Afacerea ta, pe *pilot automat*, iar tu comanzi." (3 lines, "pilot automat" italic gold).

## Page structure (in order)

1. **Nav** (fixed, blurs on scroll): logo lockup, anchors, WhatsApp pill CTA.
2. **Hero — quiet manifesto**: mono meta line top (studio · city / discipline), 3-line manifesto H1 with one italic gold word, short sub-paragraph, dual CTA (ghost link "Încearcă un demo viu ↓" + WhatsApp pill). Infinite mono ticker strip under it (services list).
3. **Live speed proof**: self-measuring widget using the Performance API (real FCP + full load from the visitor's browser), count-up numbers, gold progress bars, verdict lines vs Google's 1.8s / 2.5s benchmarks. Copy: „Nu-ți cer să mă crezi. Browserul tău tocmai a măsurat."
4. **Services** (editorial index rows, not cards): 01 Automatizări & agenți AI, 02 Site-uri & aplicații custom, 03 Mentenanță & continuitate. Each row: gutter number, title, tag pills (mono), description, right-aligned "de la X lei" anchor price. Fixed-price + free first call note.
5. **Manual vs. Automatizat**: two cards of paired rows — MANUAL (struck-through, muted red sign) vs VENTIRA (gold sign) — adapted comparison pattern.
6. **Live demo (the inverted dark section)**: working chat mockup of a WhatsApp booking agent — real input, scripted keyword replies (programare/preț/anulare), message-in animations. Copy invites touching it; CTA „Vreau unul pentru firma mea".
7. **Projects** (editorial case rows): **Ventira Agents** (SaaS — WhatsApp booking agents), **FișaRol.ro** (SaaS — fișe de post), **Speranța Contab** (client — accounting portal). ⚠️ **Do NOT include QuickJob.** Add others only if explicitly provided.
8. **Process**: 4 steps — Descoperire / Preț fix negru pe alb / Construcție în iterații vizibile / Predare completă (codul rămâne al clientului).
9. **Contact**: oversized serif headline („Spune-mi ce te *mănâncă* de timp."), honest sub-line, big WhatsApp pill with pre-filled message.
10. **Footer**: mono, © Ventira Studio · Speranța Expert SRL, contact@ventirastudio.ro.

## CTAs & data

- WhatsApp-first everywhere, number **+40 769 292 363** → `https://wa.me/40769292363?text=<pre-filled RO message>`. Pre-fill differs per section: hero/nav = general intent; demo = „Vreau un agent ca ăsta pentru firma mea"; contact = „Salut, am o problemă care îmi mănâncă timp: ".
- Prices (locked): Automatizări & agenți AI **de la 2.500 lei + mentenanță** · Site-uri & aplicații custom **de la 1.200 lei + mentenanță** · Mentenanță two tiers: **Esențial 299 lei/lună** (găzduire, SSL, backup, monitorizare) and **Complet 399 lei/lună** (Esențial + modificări lunare, prioritate). **Maintenance is MANDATORY and included with every project** — the entry build prices are accessible precisely because the retainer continues the relationship. Frame it as responsibility, not lock-in: „un sistem viu are nevoie de cineva care îl ține viu" / „rămân responsabil de sistem". Never present maintenance as optional anywhere on the page (process section included).

## Output

- If prototyping: ONE self-contained HTML file (inline CSS/JS, CDN for GSAP/Lenis/fonts).
- If production: Next.js (App Router) + Tailwind, same system tokenized; components per section; deployable on Railway/Vercel.
- SEO: Romanian title/description, semantic landmarks, OG tags, single H1.

Quality bar: it must read as a designed editorial object, not a template. When in doubt: more whitespace, fewer effects, slower motion.
