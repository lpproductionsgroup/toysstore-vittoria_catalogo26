# Toys Store Vittoria — Catalogo Natale 2026

Landing page singola Next.js in italiano per presentare e sfogliare il catalogo natalizio. Il catalogo è informativo: ogni acquisto avviene sullo shop Shopify ufficiale; questo progetto non implementa checkout né usa API Shopify. I collegamenti storici a `/catalogo` ricevono un redirect permanente a `/#catalogo`.

## Requisiti e avvio locale

- Node.js 22 (o una versione compatibile con la release Next.js installata)
- npm

```bash
npm ci
npm run dev
```

Apri [http://localhost:3000](http://localhost:3000). I comandi `npm run typecheck`, `npm run lint` e `npm run build` verificano tipi, lint e build di produzione.

## Asset del catalogo

Gli asset originali sono già inclusi:

- `public/catalogo-natale-2026.pdf` — PDF originale (124 pagine); il server accetta richieste HTTP Range per il caricamento progressivo.
- `public/logo-natalizio.png` — logo originale PNG, mantenuto nelle sue proporzioni.

Per sostituire i file, copia i nuovi originali usando gli stessi nomi e mantieni aggiornati dimensioni e percorso in `lib/site.ts`. Non includere dati di prodotti o promozioni non verificati. Il worker PDF.js viene copiato dalla versione usata da react-pdf in un asset versionato in `public/`; i moduli WASM locali per le immagini JPEG 2000 sono copiati in `public/wasm/` dal lifecycle script `postinstall`.

## Analytics e privacy

Per impostazione predefinita non viene attivato alcun servizio di analytics. L’app emette eventi locali `catalogo:analytics` (apertura, cambio pagina, download e clic allo shop). Una futura integrazione `gtag` è gated sia da `NEXT_PUBLIC_ANALYTICS_ENABLED=true` sia da `window.__catalogAnalyticsConsent === true`: collega questo consenso solo al sistema privacy approvato dal titolare. Non è stato aggiunto un banner, un testo legale o un cookie policy non verificato.

## Deploy su Vercel

1. Crea un repository GitHub e carica il progetto includendo PDF e logo.
2. Importa il repository in Vercel (framework Next.js, build `npm run build`, install `npm ci`).
3. Assegna al progetto il dominio `catalogo.toysstorevittoria.it` dalle impostazioni Domains di Vercel.
4. Copia il record DNS indicato da Vercel per il sottodominio e aggiungilo in Hostinger (di norma un record CNAME per `catalogo`; usa il target esatto comunicato da Vercel).
5. Attendi la propagazione DNS e la verifica TLS in Vercel, poi controlla home, `/#catalogo`, `/#negozio`, il redirect `/catalogo`, `/robots.txt`, `/sitemap.xml` e il download PDF.

Non modificare DNS del dominio principale né checkout Shopify. Il link allo shop resta `https://toysstorevittoria.it`. Il link privacy punta alla policy Shopify verificata: `https://www.toysstorevittoria.it/policies/privacy-policy`.

## Struttura

```text
.
├── .env.example
├── .github/
│   └── workflows/ci.yml
├── .gitignore
├── .nvmrc
├── app/
│   ├── error.tsx
│   ├── globals.css
│   ├── layout.tsx
│   ├── loading.tsx
│   ├── not-found.tsx
│   ├── opengraph-image.tsx
│   ├── page.tsx
│   ├── robots.ts
│   └── sitemap.ts
├── components/
│   ├── AnalyticsEvents.tsx
│   ├── Benefits.tsx
│   ├── CatalogPreview.tsx
│   ├── CatalogViewer.tsx
│   ├── CatalogViewerClient.tsx
│   ├── ChristmasDecorations.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── Navbar.tsx
│   ├── ShopCTA.tsx
│   ├── StoreLocation.tsx
│   └── viewer-controls.css
├── lib/site.ts
├── public/catalogo-natale-2026.pdf
├── public/logo-natalizio.png
├── public/pdf.worker.<versione-trattini>.mjs
├── public/wasm/
├── scripts/copy-pdf-worker.mjs
├── eslint.config.mjs
├── next-env.d.ts
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
└── tsconfig.json
```
