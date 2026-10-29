# CHANGES — 29.10.2026 · Securitate: abuz de cost și spam pe formularul de contact

Branch: `security/cost-abuse-2026-10-29` (NU e pe `main`; Railway face deploy automat din `main`).
**Repo public:** secretul `ORIGIN_SECRET` stă doar în Railway și Cloudflare. Nu se scrie niciodată în cod, în acest fișier sau în commit-uri.

## Ordinea de deploy

Branch-ul se poate face merge oricând. Fără `ORIGIN_SECRET` comportamentul e sigur: limiterul folosește `cf-connecting-ip`, nu primul `x-forwarded-for`, și în log apare un avertisment o singură dată.

1. Merge `security/cost-abuse-2026-10-29` → `main`. Testează `/contact` pe live: mesajul trebuie să ajungă la contact@ventirastudio.ro.
2. **Blocare origine (recomandat)**, în ordinea asta:
   1. Generează un secret: `openssl rand -hex 32`.
   2. **Cloudflare → Rules → Transform Rules → Modify Request Header** pe zona `ventirastudio.ro` (acoperă și `www`): *Set static* `x-origin-secret` = secretul, pentru toate cererile.
   3. Abia după ce regula e activă: **Railway → serviciul `ventira-studio` → Variables → `ORIGIN_SECRET`** = același secret.
   4. Verifică:
      - formularul de pe `www.ventirastudio.ro/contact` merge;
      - `POST https://<serviciu>.up.railway.app/api/contact` direct → 403.

   Dacă inversezi 2.2 cu 2.3, formularul de contact dă 403 până adaugi regula. Restul site-ului nu e afectat.

**Rollback:** ștergi `ORIGIN_SECRET` din Railway.

## Ce s-a schimbat și de ce

### 1. IP-ul pentru rate limit nu mai poate fi falsificat
- **Înainte** (`src/app/api/contact/route.ts`): cheia limiterului era **primul** `x-forwarded-for`, pe care îl trimite clientul. Cu un header inventat la fiecare cerere, limita de 3 / 15 min nu mai conta.
- **Acum** (`src/lib/origin-secret.ts` → `getClientIp()`):
  - cu `ORIGIN_SECRET` și header valid: `cf-connecting-ip`;
  - cu `ORIGIN_SECRET`, fără header valid: **ultimul** `x-forwarded-for`, adăugat de Railway;
  - fără `ORIGIN_SECRET`: `cf-connecting-ip`, apoi ultimul `x-forwarded-for`, plus un avertisment logat o dată.
- **Nou `src/proxy.ts`** (convenția Next 16, înlocuiește `middleware.ts`): cu `ORIGIN_SECRET` setat, `/api/*` fără headerul `x-origin-secret` corect → 403. Comparația e în timp constant.
  - Restricționat la `/api/*` intenționat: healthcheck-ul Railway (`railway.toml` → `/`) lovește containerul direct, fără header. Dacă blocam `/`, fiecare deploy ar fi picat.

### 2. Honeypot
- **`src/components/ContactForm.tsx`**: câmp `website` ascuns. E poziționat în afara ecranului, cu `aria-hidden`, `tabIndex=-1` și `autoComplete="off"`.
- **Server:** dacă `website` vine completat, răspunde 200 `{ success: true }` fără să trimită nimic, ca botul să nu afle că a fost prins.

### 3. Validare strictă
- Nume ≤ 100 de caractere, verificat pe server și în formular.
- Email ≤ 254 de caractere.
- Serviciul trebuie să fie unul din lista `SERVICES`.
- Bugetul e gol sau unul din `BUDGETS`, ≤ 50 de caractere.
- Toate câmpurile se verifică să fie string, ca un JSON cu tipuri greșite să nu mai arunce eroare 500.
- Listele `SERVICES` și `BUDGETS` au fost mutate din `ContactForm.tsx` în **`src/lib/contact-options.ts`**, ca clientul și serverul să folosească aceeași listă.
- Subiectul emailului: numele trece prin `oneLine()`, care elimină CR/LF și caracterele de control. Corpul HTML era deja escapat (`escapeHtml`).

### 4. Plafon global
Maximum **50 de emailuri de contact / zi (UTC) / proces**. Peste plafon, formularul răspunde 503 cu „Scrie-ne direct la contact@ventirastudio.ro” și se loghează o eroare. Contorul stă în memorie, deci se resetează la restart sau redeploy.

### 5. Ce NU s-a atins
- `AUDIT-ventirastudio-21.10.2026.md`, `CHANGES.md`, `PROMPT-portfolio-build.md` sunt încă în repo-ul **public**. Decizia de a le scoate îți aparține. Dacă le scoți, `git rm` nu le șterge din istoric.
- Footer-ul „Site realizat de Ventira Studio” e neschimbat.

## Fișiere
- `src/app/api/contact/route.ts`, `src/components/ContactForm.tsx`
- noi: `src/proxy.ts`, `src/lib/origin-secret.ts`, `src/lib/contact-options.ts`

## Verificare (29.10.2026, local, fără rețea spre producție, fără niciun email trimis)
- `npx tsc --noEmit` → 0 erori.
- `npm run lint` → 14 erori, **identic cu `main`**, toate preexistente. Fișierele modificate sunt curate. Singura eroare raportată pe ele vine din `src/lib/blog.ts`, neatins.
- `npm run build` (Turbopack) **nu a putut rula în sandbox**: `fonts.googleapis.com` e blocat de politica de rețea (403), iar `next/font/google` descarcă Cormorant Garamond la build. Nu ține de schimbări.
  - Verificare alternativă: `next build --webpack` cu răspunsuri de font simulate (`NEXT_FONT_GOOGLE_MOCKED_RESPONSES`, fișier mock în afara repo-ului) → build OK, `ƒ Proxy (Middleware)` listat.
  - **Build-ul Turbopack real se verifică pe Railway sau local la tine.**
- Smoke test pe serverul standalone local, fără `RESEND_API_KEY`:

  | Test | Rezultat |
  |---|---|
  | `/` fără header | 200 (nu e blocat) |
  | `/api/contact` fără header, cu `ORIGIN_SECRET` | 403 |
  | cerere validă cu header | 200 |
  | serviciu necunoscut | 422 |
  | nume de 101 caractere | 422 |
  | honeypot completat | 200 `{success:true}`, fără trimitere |
- **Neverificat:** Transform Rule-ul Cloudflare și comportamentul pe Railway live.
