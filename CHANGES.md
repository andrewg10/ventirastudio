# CHANGES — Site audit & fixes (2026-06-11)

> **Update (final state):** canonical host is **www.ventirastudio.ro**. The apex now resolves (proxied record in Cloudflare) and 301s to www via the existing "Redirect to WWW" rule, query strings preserved. All code URLs (metadataBase, og:url, JSON-LD, sitemap, robots) flipped to www accordingly — the P0 runbook below is superseded by this setup. Remaining for Andrei: set `NEXT_PUBLIC_GA_ID` in Railway; add Search Console domain property + submit `https://www.ventirastudio.ro/sitemap.xml`.

Full audit of ventirastudio.ro (source + live site). Fixes applied directly to the repo.
Verification: `tsc --noEmit` passes; eslint introduces no new issues (14 pre-existing style errors remain, non-blocking); live booking modal (cal.eu) confirmed working. Run `npm run build` locally before deploy — the sandbox used for review cannot run Next builds.

---

## P0 — INFRASTRUCTURE (action needed in Cloudflare + Railway, not code)

**`ventirastudio.ro` (apex, no www) has NO DNS record. It shows a browser error page.**
Only `www.ventirastudio.ro` resolves (Cloudflare-proxied). Meanwhile all canonicals, sitemap, OG and robots URLs point to the apex — the dead host. Any ad click, share, or typed-in visit to `ventirastudio.ro` lands on an error. If Google/Meta ads point there, that's paid traffic hitting a wall.

Fix (≈10 min):
1. **Railway** → service `ventira-studio` → Settings → Networking → Custom Domains → add `ventirastudio.ro` (you likely only added `www`). Railway shows a target value.
2. **Cloudflare** → DNS → add record for `@` (apex): CNAME to the Railway target, Proxy ON (Cloudflare flattens CNAME at apex automatically).
3. **Cloudflare** → Rules → Redirect Rules → add `www.ventirastudio.ro/*` → `https://ventirastudio.ro/$1` (301). Apex becomes the canonical host, matching all code/SEO URLs.
4. Verify: `ventirastudio.ro` loads, `www` 301-redirects to apex.

---

## Functional bugs fixed (code)

1. **Nav.tsx** — mobile hamburger was visible on desktop (confirmed live). Inline `display:flex` beat the `.nav-mobile{display:none}` class. Display control moved fully to CSS (`!important` base + media override); added `aria-expanded`.

2. **Dead mobile CSS across 4 components** — all media-query overrides written as `div[style*="padding: 0 96px"]`-style attribute selectors never matched: React serializes inline styles without spaces (`padding:0 96px`) and in kebab-case (`paddingLeft` selectors can't match `padding-left:`). Mobile layout was silently broken on:
   - `HowItWorks.tsx` → real classes `hiw-pad` / `hiw-sticky` / `hiw-phone`, plus reduced grid gap on mobile
   - `Testimonials.tsx` → `t-pad` / `t-controls`
   - `Products.tsx` → `prod-pad` (+ removed double border on last mobile item)
   - `ProductsPageContent.tsx` (/produse) → `pp-pad` / `pp-row` / `pp-expanded`; was rendering 112px indent + 2-col grid + 4-col rows on phones

3. **Global `section{}` style collision (mobile)** — Hero (≤900px) and Testimonials (≤768px) both injected unscoped `section { padding: ... !important }` rules hitting every section on the page; on phones Testimonials' `80px 0` won and stripped Hero's side padding. Scoped to `#hero` / `#testimoniale`. Testimonials' global `.reveal` also scoped.

4. **/contact "Alege ora →" was a dead link** (`<a href="#">` with a comment promising a component that didn't exist). Replaced with the real `<BookingButton>` opening the cal.eu modal. This was a broken booking CTA on your highest-intent page — blog posts funnel there too.

5. **Products.tsx** — "AI Receptionist" card opened a new tab for an internal `#contact` anchor (`target="_blank"`). Removed.

6. **ProductsPageContent.tsx** — conflicting `flex hidden md:flex` classes on status badge (worked by luck); expand panel `maxHeight` 600→900px so expanded content isn't clipped on mobile single-column.

## Correctness / hygiene fixed

7. **FooterCta.tsx** — `© 2025` hardcoded → dynamic `new Date().getFullYear()`; "Speranta Expert SRL" → **"Speranța Expert SRL"** (correct legal name, also fixed ×5 in Politica de confidențialitate + Termeni și condiții).

8. **CookieConsent.tsx** — with `NEXT_PUBLIC_GA_ID` unset, gtag was configured with placeholder `G-XXXXXXXXXX`. Now GA config is skipped unless a real `G-…` ID exists. **Check Railway env: if `NEXT_PUBLIC_GA_ID` was never set, you have no GA4 data — set it.**

9. **api/contact/route.ts** — user input was interpolated unescaped into the notification email HTML (HTML injection). Added `escapeHtml()` for all fields.

10. **ContactForm.tsx** — was a `<div>` with click handler; now a real `<form onSubmit>` (Enter submits, proper semantics, `type="submit"`). GDPR checkbox: whole label toggles (not just the 18px box), added `role="checkbox"`/`aria-checked`.

## SEO added

11. **layout.tsx** — Organization JSON-LD (name, legalName Speranța Expert SRL, locality București, logo, email). Helps Google + AI-engine citations.
12. **Canonical URLs** on every page (`alternates.canonical`): /, /contact, /produse, /blog, /blog/[slug], legal pages. Matters double given the apex/www mess above.

## Repo hygiene

13. **README.md** — replaced create-next-app boilerplate with real docs (stack, env vars, structure, conventions).
14. Deleted root `og-image.png` (5.6 MB duplicate; the served one is `public/og-image.png`, 96 KB).

## Verified as NOT bugs

- `cal.eu` — your booking page exists there and the modal loads it correctly (tested live). Not a typo of cal.com.
- styled-jsx scoping works in prod (verified live: 161 scoped elements).
- Rate limiter, consent-mode defaults, sitemap/robots structure: sound.

## Known remaining (deliberately untouched)

- `@calcom/embed-react` dependency is unused (modal uses plain iframe) — removing requires lockfile regen; do `npm uninstall @calcom/embed-react` locally when convenient.
- Pre-existing eslint style errors (unescaped `"` in JSX text, `any` types in CookieConsent, empty interface in blog.ts) — cosmetic, non-blocking.
- Blog post title says "în 2025" — dated content, your call whether to refresh.
