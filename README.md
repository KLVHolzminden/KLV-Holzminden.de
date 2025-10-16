# KLV Holzminden – Statische Website

Dies ist eine schlanke, statische Website ohne Build‑Schritt. Ideal für Vercel, Netlify oder GitHub Pages.

## Struktur
- `index.html` – Startseite
- `termine.html` – Tabelle aus `assets/termine.json`
- `ergebnisse.html`
- `verband.html`
- `vereine.html` – Karten aus `assets/vereine.json`
- `downloads.html`
- `kontakt.html`
- `impressum.html`, `datenschutz.html`
- `styles.css` – Design
- `termine.js`, `vereine.js` – Kleines JS für Datenlisten
- `assets/` – Dateien & JSON-Daten

## Deployment (Vercel, ohne Konsole)
1. GitHub‑Konto anlegen (falls noch nicht vorhanden).
2. Neues Repository erstellen, alle Dateien dieses Ordners hochladen.
3. Auf https://vercel.com mit GitHub anmelden → **New Project** → Repo auswählen → **Deploy**.
4. Fertig. Die Seite ist sofort unter einer `*.vercel.app`‑Adresse erreichbar.
5. Optional: Eigene Domain verbinden.

## Inhalte pflegen
- Termine: `assets/termine.json` editieren (Datum, Titel, Ort, Link).
- Vereine: `assets/vereine.json` ergänzen (Name, Ort, Link).
- Downloads: Dateien in `assets/` ablegen und in `downloads.html` verlinken.
