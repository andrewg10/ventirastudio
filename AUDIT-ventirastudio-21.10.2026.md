# AUDIT — ventirastudio.ro — 21.10.2026

Checklist: VENTIRA-CHECKLIST v1.0 (21.10.2026), din skill. `Desktop\VENTIRA-CHECKLIST.md` nu a fost accesibil din sesiune (folder neconectat) — de confirmat că e aceeași versiune.
Obiect: repo `andrewg10/ventirastudio`, HEAD `962c9ea` = deploy Railway `08ac615a` (SUCCESS, 22.09) = live `www.ventirastudio.ro`.
Metodă: fetch real din Chrome (DOM, headere, coduri HTTP), DNS prin DoH (dns.google), Railway MCP (variabile, domenii, deploy-uri), repo + git, `npm audit` pe lockfile.

**Module:** T ✔ · C ✔ · S (subset — site fără login/DB; doar formular de contact → email) · **P N/A** (nicio plată prin site) · **AI N/A** (site-ul nu rulează niciun agent; agenții de pe WhatsApp sunt proiecte separate, se auditează acolo) · **L N/A** (site live, nu aplicație în lansare).

Legendă: ✅ dovadă · ⚠️ acceptat temporar, cu termen · ❌ lipsește · ❔ neverificabil de aici · N/A.

---

## T. Site tehnic

| # | Punct | Stare | Dovadă / termen | Fix |
|---|---|---|---|---|
| T1 | Redirecturi, 404 real | ✅ | apex→www 301 (next.config + Cloudflare); `/pagina-inexistenta-xyz-123` → **404**, text/html, pagină proprie RO; `/api/contact` GET → 405; `content-encoding: zstd`; TTFB 484 ms (vezi S43 — server în SUA) | — |
| T2 | Headere securitate | ❌→✅ | Live înainte: HSTS 180z ✓, nosniff ✓, **X-Frame-Options null, Referrer-Policy null, Permissions-Policy null, CSP null, `x-powered-by: Next.js`** | `next.config.ts`: HSTS 2 ani+preload, XFO DENY, Referrer, Permissions, `poweredByHeader:false`, **CSP în Report-Only** → ⚠️ trece pe enforce după 7 zile fără violări în consolă (termen 28.10) |
| T3 | Fișiere expuse | ✅ | `/.env` 404 · `/.git/HEAD` 404 · `/.htaccess` 404 · `/wp-login.php` 404 · `/xmlrpc.php` 404 · `/phpinfo.php` 404 · `/package.json` 404 · `/robots.txt` 200 · `/sitemap.xml` 200 · `/favicon.ico` 200 | — |
| T4 | Head pe fiecare pagină | ⚠️→✅ | `lang=ro` ✓, title 59 car. ✓, canonical ✓ pe toate 7 paginile, viewport ✓, OG absolut ✓, twitter ✓, favicon+apple ✓. **Lipsea `theme-color`**; **meta description 225 car.** (max 160); titlu articol blog 99 car. (`… — Ventira Studio Blog`); descrieri /contact și /termeni 65 car. (<120) | theme-color `#FAF6EE`; description 158 car.; titlul articolului = titlul postului (fără sufix). ⚠️ descrierile scurte pe /contact, /termeni — minor |
| T5 | Date structurate | ✅ | JSON-LD `Organization` valid (parse OK), telefon, adresă, areaServed, `sameAs` prezent dar **gol** (`// TODO` în layout.tsx:86) | ⚠️ pune LinkedIn/Instagram/Facebook reale în `sameAs` când există (termen: la prima campanie) |
| T6 | Conținut & a11y | ✅ | exact 1 `<h1>`, 7 H2 / 12 H3, 0 `<img>` (design fără imagini), 15 `target=_blank` toate cu `noopener`, 0 inputuri fără label, 0 butoane fără nume; 0 linkuri interne rupte (toate 200) | contrast nemăsurat instrumental — ❔ |
| T7 | Performanță | ⚠️→✅ | 38 resurse, 1,1 MB transfer; **`og-image.png` 618 KB** (cea mai mare resursă); fonturi `font-display: swap` ✓; Cormorant venea de pe `fonts.googleapis.com` (vezi C15) | OG → JPG q85 **39 KB** (verificat vizual identic); Cormorant self-hosted prin `next/font` |
| T8 | Măsurare | ✅ | GA4 + Google Ads prin gtag, **încărcate doar după „Accept”** (test pe stare curată: 0 request-uri Google înainte de consimțământ); `NEXT_PUBLIC_GA_ID` + `NEXT_PUBLIC_ADS_ID` setate în Railway | — |
| T9 | Local SEO | ❔ | Site: Tulcea · București + telefon. **Google Business Profile** — nu pot verifica de aici; schema are adresă fără stradă | de verificat GBP = site (telefon, localitate) |
| T10 | Mobil | ⚠️→✅ | Nu am putut emula 390 px din extensie (resize ignorat). **`scrollWidth 1895 > 1707`** pe desktop: `.wash` (640 px, right −12 %) și `.track` (ticker, 3265 px) ies din viewport; `body{overflow-x:hidden}` dar `html` visible → pe iOS Safari se poate face scroll lateral | `html{overflow-x:clip}`. ❔ test real pe telefon după deploy |

## C. Conformitate legală RO/UE

| # | Punct | Stare | Dovadă / termen | Fix |
|---|---|---|---|---|
| C1 | Denumire exactă | ✅ | „Speranța Expert SRL" în footer (site.ts `LEGAL_NAME`) + legal pages | — |
| C2 | Sediu | ❌ | Footer: „Tulcea · București" — **fără adresă**; nici în Termeni | **Andrei:** adresa sediului social (din certificat ORC) → footer + Termeni + Politică |
| C3 | Telefon + email | ⚠️→✅ | Email ✓; telefonul era doar în JSON-LD și în butonul WhatsApp, nu în footer | footer: `+40 769 292 363` (tel:) + email |
| C4 | Nr. Reg. Com. | ❌ | Nicăieri pe site | **Andrei:** J.../.../... → footer |
| C5 | CUI | ⚠️→✅ | Era în `site.ts` dar footerul nou nu-l afișa (doar pe /produse prin FooterCta vechi) | footer: `CUI 48785293` |
| C6 | Autorizație | N/A | software/consultanță — activitate neautorizată | — |
| C7 | Profesie reglementată | N/A | site-ul nu oferă servicii de expert contabil | — |
| C8 | Prețuri cu TVA | ⚠️ | „de la 4.000 lei" / „399 lei/lună" fără mențiune TVA; Termeni §4: „nu includ TVA, acolo unde este aplicabil" | **Andrei:** firma e plătitoare de TVA? → sub prețuri: „prețurile nu includ TVA" sau „firmă neplătitoare de TVA". Termen: odată cu C2/C4 |
| C9 | ANPC SAL | ⚠️ | Lipsea complet; Termenii prevăd consumatori (retragere 14 zile) → B2C posibil | Link text „ANPC · SAL" → `reclamatiisal.anpc.ro` în footer + §12 Termeni. **Pictograma 250×50 lipsește** (descarcă de pe anpc.ro → `public/anpc-sal.png`). Alternativ: Termeni „exclusiv B2B" și scoți tot. Termen 31.10 |
| C10 | Link SOL scos | ✅ | Era `ec.europa.eu/consumers/odr` în Termeni §12 — **scos**, înlocuit cu ANPC/SAL (sursă secundară — confirmă în MO) | — |
| C11 | Politica de confidențialitate | ❌→✅ | Politica spunea: Supabase (neutilizat), **„Railway cu servere în UE" (fals: `us-west2`)**, **fără Google** (GA4/Ads rulează), fără Cloudflare, „nu transferăm în afara SEE" (fals) | §4 rescris: Resend, Railway (SUA), Cloudflare, Google Ireland (doar după consimțământ), Cal; transfer SUA pe art. 45–46. `LAST_UPDATED` 21.10.2026 |
| C12 | Formular | ✅ | 5 câmpuri (buget opțional), bifă GDPR nebifată implicit, link politică lângă buton (`ContactForm.tsx`) | — |
| C13 | Cookie-uri înainte de consimțământ | ✅ / ⚠️→✅ | Stare curată (consent șters): **0 request-uri `google*`**, `gtmScripts: 0`, banner cu „Refuz" + „Accept" (77×32 / 88×32 px). „Refuz" era ghost (fundal transparent) vs „Accept" plin | „Refuz" cu fundal + bordură vizibile, aceeași greutate |
| C14 | Fără analytics = fără banner | N/A | există analytics | — |
| C15 | Conținut încorporat / fonturi | ❌→✅ | **Cormorant Garamond de pe `fonts.googleapis.com`** (request la Google la fiecare vizită, 4 link-uri); cal.eu doar la click ✓; fără hartă/YouTube | `next/font/google` → self-host la build; preconnect-urile scoase |
| C16 | DPA | N/A | site propriu | — |
| C17–C19 | Consumatori / retragere / termeni | ✅ | Termeni §4–5: preț, retragere 14 zile + excepția serviciilor digitale începute | — |
| C20 | Recenzii | ✅ | Secțiunea de testimoniale (iunie, nume anonimizate) **nu mai e în site** | — |
| C21 | Reduceri / urgență falsă | ✅ | niciuna | — |
| C22–C23 | Imagini | ✅ | 0 imagini pe homepage; blog: 5 JPG-uri proprii în `public/` | ❔ licența lor dacă sunt stock |
| **C24** | **Afirmații nedovedite** | **❌** | Blog: *„Cum un agent AI a redus no-show-urile cu 70 % pentru un salon de înfrumusețare"* — „studiu de caz real", salon în Sectorul 2 București, −70 % no-show, 8–12 h/săpt. **Tu mi-ai spus pe 23.09 că niciun agent nu avea rezultate și că n-ai clienți cu saloane.** Dacă articolul e fictiv, e exact ce OUG 18/2026 și 365/2002 sancționează, pe un site cu CUI în footer | **Andrei decide:** (a) articolul se scoate (`content/blog/ai-receptionist-no-show-studiu-de-caz.mdx`, e și `featured`), sau (b) se rescrie ca „scenariu ilustrativ" fără „real" și fără cifre. Articolul „5 procese… în 2025" — cifrele din el de verificat la fel. **Termen: înainte de orice campanie plătită** |
| C25 | Promisiuni operaționale | ⚠️ | „Răspundem în maxim 24 de ore" (contact, formular, FooterCta) + **Termeni §8: suport în max. 24 h lucrătoare** — angajament contractual, ești singur | Păstrezi doar dacă îl ții. Altfel „în prima zi lucrătoare". Email-urile afișate (`contact@`) — primesc mail ❔ (DMARC `rua` → `dmarcreports@` există?) |
| C26 | EAA | N/A | microîntreprindere, servicii; minimul T6 făcut | — |
| C27–C28 | Domeniu / conturi | ✅ | Domeniu pe Cloudflare, Railway pe contul tău (whoami: andrewg10) | ❔ 2FA la registrar/Cloudflare (S52) |
| C29 | Credit Ventira | N/A | e site-ul Ventira | — |
| C30 | Date demo | ✅ | `grep -rniE "lorem|placeholder|test@|se adaug"` pe `src/`+`content/` → 0 | — |

## S. Securitate (subset aplicabil — fără DB/login)

| # | Punct | Stare | Dovadă / termen | Fix |
|---|---|---|---|---|
| S1–S17 | DB / Auth | N/A | site fără bază de date și fără conturi | — |
| S18–S19 | Rate limit formular | ✅ | `api/contact/route.ts`: 3 cereri / 15 min / IP, in-memory (se resetează la redeploy — acceptabil pentru un formular) | — |
| S20 | Plafon cost furnizori | ❔ | Resend: plan/limită de trimitere — de verificat în dashboard | — |
| S23 | Headere | vezi T2 | | |
| S24 | XSS | ✅ | Inputul din formular e escapat în HTML-ul emailului (`escapeHtml`, iunie); JSON-LD fără `<` | — |
| S25 | Validare server | ⚠️ | Validare manuală (nume/email regex/lungime mesaj ≤ 5000) — fără zod, dar suficientă pentru 5 câmpuri | — |
| S26 | Secrete | ✅ | `.env*` în `.gitignore`; `git ls-files` fără `.env`; `git log -p --all` grep pe pattern-uri (`re_`, `sk_live`, `AIza`, `ghp_`, chei private) → 0. (grep, nu gitleaks) | — |
| **S27** | **npm audit** | **❌** | `npm audit --omit=dev`: **12 vulnerabilități (6 moderate, 5 high, 1 critical)** — `sharp`/libvips (CVE-2026-33327/33328/35590/35591, libheif, librsvg) adus de Next image optimizer; `sprintf-js` | Local: `npm audit fix` → `npm run build` → push. Dacă `sharp` nu se rezolvă, `npm i sharp@latest`. **Termen 25.10** |
| S28 | Pachete nefolosite | ⚠️ | `@calcom/embed-react` — 0 importuri (modalul e iframe) | `npm uninstall @calcom/embed-react` (regenerează lockfile) |
| S29 | Debug în producție | ✅ | Erorile din API spre client sunt generice; `console.error` doar server | — |
| S31–S33 | Ownership / redirect / upload | N/A | fără obiecte per user, fără upload | — |
| S39 | SPF/DKIM/DMARC | ✅ / ⚠️ | apex SPF `include:_spf.google.com ~all` ✓; Resend: `send.ventirastudio.ro` SPF `include:amazonses.com` ✓, DKIM `resend._domainkey` ✓; **DMARC `p=none`** | ⚠️ după 30 de zile de rapoarte → `p=quarantine`. Termen 21.11 |
| S43 | Date personale — regiune | ❌ | **Serviciul Railway rulează în `us-west2`** (list-deployments: `regions: ["us-west2"]`). Formularul de contact (nume, email, mesaj) și jurnalele cu IP ajung în SUA. Politica a fost corectată ca să spună adevărul, dar fix-ul corect e mutarea | **Railway → Settings → Region → `europe-west4` (Amsterdam)**: 2 minute, zero cod, TTFB din RO scade probabil de la ~480 ms la ~100–150 ms, iar politica revine la „servere în UE". Pot face eu prin Railway MCP dacă zici da |
| S48–S50 | Monitoring | ❔ | Healthcheck Railway pe `/` (railway.toml) ✓; uptime extern + alertă — nu văd | UptimeRobot/BetterStack gratuit pe `https://www.ventirastudio.ro/` |
| S51 | Variabile | ✅ | Railway production: `CONTACT_EMAIL, NEXT_PUBLIC_ADS_ID, NEXT_PUBLIC_CAL_LINK, NEXT_PUBLIC_GA_ID, RESEND_API_KEY` (valori redactate) | — |
| S52–S54 | 2FA, conturi | ❔ | neverificabil de aici | confirmă 2FA GitHub, Railway, Cloudflare, Resend |
| S57–S58 | CSRF / CORS | ✅ | singura mutație e POST JSON pe rută proprie, fără CORS `*` | — |
| S60 | Scanare dependențe | ⚠️ | fără Dependabot | GitHub → Settings → Dependabot alerts + security updates (2 clickuri) |
| S67 | /docs expuse | ✅ | n/a, 404 | — |
| S69 | Versiuni fixate | ⚠️ | `^` pe majoritatea; lockfile prezent și folosit (`npm ci` în Dockerfile) — acceptabil | — |
| S70 | Git = producție | ✅ | `main` == `origin/main` == HEAD `962c9ea` == deploy live (marker „Tulcea & București" pe prod). Cele 23 fișiere „M" din working tree sunt **doar CRLF** (`git diff -w` gol) | opțional: `.gitattributes` `* text=auto` ca să dispară zgomotul |

## P / AI / L — N/A (motivele în antet)

---

## Ce e deja bine
- Consimțământul e făcut corect: Consent Mode v2 cu default denied, zero scripturi Google înainte de „Accept" — verificat pe stare curată, nu din cod.
- Zero fișiere expuse, 404 real, 405 pe GET la API, rate limit pe formular, input escapat în email, secrete în afara git-ului.
- Head complet pe toate paginile (canonical, OG absolut, 1 H1, `noopener` peste tot), JSON-LD valid.
- Email: SPF + DKIM + DMARC existente, Resend configurat corect pe subdomeniu dedicat.
- Git curat și sincron cu producția; variabilele de mediu complete în Railway.
- Testimonialele anonimizate din iunie au dispărut din site.

## Corecții aplicate în acest audit (commit pe `main`)
`next.config.ts` (headere, CSP report-only, poweredByHeader) · `src/app/layout.tsx` (next/font Cormorant, theme-color, description 158, OG → jpg) · `src/app/globals.css` (overflow-x clip, font var) · `src/components/Footer.tsx` (CUI, telefon, ANPC·SAL) · `src/components/CookieConsent.tsx` (Refuz vizibil) · `src/app/termeni-si-conditii/page.tsx` (SOL scos → ANPC/SAL, dată) · `src/app/politica-de-confidentialitate/page.tsx` (§4 destinatari + transfer, §7 cookie-uri, dată) · `src/app/blog/[slug]/page.tsx` (titlu) · `public/og-image.jpg` (+ png șters).
Nu s-a produs ZIP: modificările sunt direct în repo (acces direct), listate aici.

## Rămâne la Andrei (în ordinea gravității)
1. **C24 — articolul „studiu de caz real −70 %"**: scoate sau rescrie ca scenariu. Înainte de orice ad.
2. **S43 — regiunea Railway → EU** (spune „da" și o fac eu).
3. **S27 — `npm audit fix` + build + push** (1 critical).
4. **C2 / C4 / C8 — sediu, J, TVA** → îmi dai cele 3 date și le pun în 2 minute.
5. C9 pictograma ANPC SAL (sau Termeni „exclusiv B2B"), C25 promisiunea de 24 h, S60 Dependabot, S48 uptime, S39 DMARC quarantine (21.11), T2 CSP enforce (28.10).

## Update 21.10.2026 (după „da la toate")
- **C24 ✅** — scoase `ai-receptionist-no-show-studiu-de-caz.mdx` și `5-procese-automatizare-ai-antreprenori-romania.mdx`; rămâne articolul de opinie (fără afirmații de rezultat).
- **S43 ✅** — Railway `regions` → `europe-west4` (update-service, aplicat pe deployment-ul curent). Politica §4 poate reveni la „servere în UE" la următoarea revizie.
- **S27 ✅ / ⚠️** — Next 16.2.1 → **16.4.2** (critical: DoS Server Components, bypass middleware), `@next/mdx`, `eslint-config-next` la fel; `@calcom/embed-react` scos (S28). Rămân 4 moderate (`sprintf-js`, tranzitiv, doar cu `--force`) — ⚠️ la următorul bump de Next. **Lockfile regenerat fără build local** — primul deploy Railway e testul; dacă pică, revert la commitul anterior.
- **C2 / C4 / C8 ✅** — sediu (din ONRC via listafirme.eu: Str. Păcii 3, Bl. S2, Sc. B, Et. P, Ap. 01, Tulcea, 820025 — *nu* „nr. 1 / Sc. A" cum ți-l aminteai), J2023000405369, „neplătitoare de TVA — prețurile afișate sunt finale" în footer, Servicii, Termeni, Politică. **De confirmat J și sediul cu certificatul ORC.**
- **C25 ✅** — „maxim 24 de ore" → „în prima zi lucrătoare" (contact, formular, FooterCta, Termeni §8).
- Rămân: C9 pictograma SAL, S60 Dependabot (GitHub Settings), S48 uptime extern, T2 CSP enforce (28.10), S39 DMARC quarantine (21.11), T5 `sameAs`.

## Verificări după deploy (max. 5)
1. `curl -sI https://www.ventirastudio.ro/` → `x-frame-options: DENY`, `referrer-policy`, `permissions-policy`, `content-security-policy-report-only` prezente, **fără** `x-powered-by`.
2. Homepage în Chrome → Network: **niciun request către `fonts.googleapis.com` / `fonts.gstatic.com`**; titlurile sunt în Cormorant (nu Georgia) — dacă vezi Georgia, variabila `--font-cormorant` nu s-a propagat.
3. Consolă pe homepage, /produse, /contact, cu „Accept" dat: **0 mesaje `Content Security Policy`**; dacă apar, îmi trimiți hostul blocat.
4. Telefon real (iPhone) pe homepage: fără scroll lateral.
5. Share pe WhatsApp al `https://www.ventirastudio.ro` → preview cu imaginea nouă (JPG).
