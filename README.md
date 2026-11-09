# KLV Holzminden – statische Website

HTML, CSS und JavaScript ohne Installation und ohne Build-Schritt. Vercel veröffentlicht das Repository-Verzeichnis.

## Inhalte pflegen
- `index.html`: Einstieg für Vereinsvertreter, Sportler und Förderer.
- `vereine.html`: vollständige vorhandene Vereinsübersicht (17 Vereine), direkt im HTML.
- `kontakt.html`, `vorstand.html`, `verband.html`: Kontakt und Verbandsinformationen.
- `termine.html`: Verweise auf KSB-Kalender und Kontakt. Aktuell keine bestätigten Termine hinterlegt.
- `ergebnisse.html`: Einstieg zu vorhandenen Bestenlisten und Kreisrekorden.
- `assets/bestenliste_2023.html`, `assets/bestenliste_2024.html`, `assets/kreisrekorde.html`: bestehende Archivlisten.
- `downloads.html`: Satzung und verfügbare Listen.
- `impressum.html`, `datenschutz.html`: vorhandene Texte statisch eingebunden.
- `styles.css`, `navigation.js`: gemeinsames Design und mobile Navigation.
- `foerderer.html`, `engagement-finder.js`, `data/engagementangebote.json`: interaktiver Engagement-Finder. Die Angebote werden im Browser aus der JSON-Datei gelesen; personenbezogene Eingaben werden nicht gespeichert.

Header und Footer sind statisch in jeder Hauptseite vorhanden. Bei Änderungen an der Navigation alle Hauptseiten berücksichtigen. Die Navigation und die Inhalte funktionieren auch ohne JavaScript.

## Bekannte Inhaltslücken
Wettkampf-PDFs, Wettkampfordnung und weitere Formulare sind im Ausgangsbestand keine verwendbaren Dokumente. Darauf wird nicht als Download verlinkt. Die Satzung ist als PDF im Downloadbereich veröffentlicht. Keine Ergebnis-Beispieldaten als tatsächliche Leistungen veröffentlichen. Alte Platzhalterdateien bleiben zur Nachvollziehbarkeit im Repository.

Die wiederhergestellten Vorstandsangaben tragen den vorhandenen Stand 14.11.2024; Aktualität bitte redaktionell prüfen. Impressum und Datenschutzerklärung wurden aus vorhandenen Texten wiederhergestellt, nicht rechtlich neu geprüft. Ihre inhaltliche Aktualisierung für das aktuelle Hosting und das externe Kontaktformular steht aus.

`termine.json` enthält bis zur Pflege bestätigter Termine eine leere Liste. `vereine.json` und ältere Hilfsskripte sind nicht in die Website eingebunden.

## Engagementangebote pflegen
Die Angebote liegen in `data/engagementangebote.json`. Für ein neues Angebot einen Datensatz mit einer eindeutigen `id` ergänzen und mindestens Titel, Motto, Beschreibung, Interessen, Zeitmodell, Zeitwerten, Zeitbeschreibung, Voraussetzungen, Detail-Link, Kontaktperson, Kontaktadresse, `aktiv` und `sortierung` pflegen. `aktiv: false` blendet ein Angebot aus, ohne es zu löschen. Die Werte in `interessen` müssen einem der Auswahlwerte im Finder entsprechen. Für bestehende Detailseiten können Links wie `foerderer.html#kampfrichter` verwendet werden.

## Prüfung
`node scripts/check-site.mjs` prüft interne Dateiverweise und Sprungmarken, Hauptnavigation, Seitentitel, JSON-Dateien und JavaScript-Syntax.
