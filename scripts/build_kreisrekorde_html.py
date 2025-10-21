#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Erzeugt eine EINE statische HTML-Datei mit allen KLV-Kreisrekorden
(Stand: 1.01.2025), intern verlinkt (Anker), ohne Abhängigkeit zur Originalseite.
Speicherort/Ziel: public/assets/kreisrekorde/rekorde-2024.html
"""

import re, html, pathlib, urllib.request

SRC_URL = "https://www.stb-tb.de/klvhol/daten/rekord24.htm"
OUTFILE = pathlib.Path("public/assets/kreisrekorde/rekorde-2024.html")

# Überschriften in der Quelle, in gewünschter Reihenfolge:
TITLES = [
    "Männer",
    "Frauen",
    "Männliche Jugend U20",
    "Männliche Jugend U18",
    "Weibliche Jugend U20",
    "Weibliche Jugend U18",
    "Männliche Jugend: MJ U16 M15 M14 MJ U14 M13 M12",
    "Weibliche Jugend: WJ U16 W15 W14 WJ U14 W13 W12",
    "Senioren: M30 M35 M40 M45 M50 M55 M60 M65 M70 M75 M80 M85",
    "Seniorinnen: W30 W35 W40 W45 W50 W55 W60 W65 W70",
]

# Ziel-IDs für Anker im Inhaltsverzeichnis
ID_MAP = {
    "Männer": "maenner",
    "Frauen": "frauen",
    "Männliche Jugend U20": "mj-u20",
    "Männliche Jugend U18": "mj-u18",
    "Weibliche Jugend U20": "wj-u20",
    "Weibliche Jugend U18": "wj-u18",
    "Männliche Jugend: MJ U16 M15 M14 MJ U14 M13 M12": "mj-gesamt",
    "Weibliche Jugend: WJ U16 W15 W14 WJ U14 W13 W12": "wj-gesamt",
    "Senioren: M30 M35 M40 M45 M50 M55 M60 M65 M70 M75 M80 M85": "senioren",
    "Seniorinnen: W30 W35 W40 W45 W50 W55 W60 W65 W70": "seniorinnen",
}

HTML_SHELL = """<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>KLV Holzminden – Kreisrekorde 2024 (Stand: 1.01.2025)</title>
  <meta name="description" content="Kreis-Leichtathletik-Verband Holzminden e.V. – Kreisrekorde 2024, Stand: 1. Januar 2025">
  <style>
    :root { --maxw: 1100px; }
    html,body{margin:0;padding:0;}
    body{font-family:system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,Helvetica Neue,Arial,Noto Sans,sans-serif;line-height:1.45;color:#111;background:#fff;}
    header{max-width:var(--maxw);margin:2rem auto 1rem;padding:0 1rem;}
    h1{font-size:clamp(1.5rem,2.5vw,2rem);margin:.2rem 0;}
    .meta{color:#444;}
    main{max-width:var(--maxw);margin:0 auto 3rem;padding:0 1rem;}
    nav.toc{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:.5rem .75rem;margin:1rem 0 1.25rem;}
    nav.toc a{text-decoration:none;border:1px solid #e5e5e5;padding:.5rem .6rem;border-radius:.5rem;display:block;color:inherit;}
    nav.toc a:hover{background:#f0f0f0;}
    section{margin:2rem 0;}
    h2{font-size:1.25rem;margin:0 0 .4rem 0;}
    .block{background:#fafafa;border:1px solid #eee;border-radius:.5rem;padding:1rem;overflow:auto;}
    pre{white-space:pre-wrap;margin:0;font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;font-size:.95rem;}
    .toplink{margin-top:.6rem;display:inline-block;font-size:.95rem;}
    .sr{position:absolute;left:-10000px;top:auto;width:1px;height:1px;overflow:hidden;}
  </style>
</head>
<body>
  <a id="top" class="sr">Seitenanfang</a>

  <header>
    <h1>Kreis-Leichtathletik-Verband Holzminden e.V.</h1>
    <div class="meta">Kreisrekorde 2024 – Stand: 1. Januar 2025</div>

    <nav class="toc" aria-label="Inhaltsverzeichnis">
      <a href="#maenner">Männer</a>
      <a href="#frauen">Frauen</a>
      <a href="#mj-u20">Männliche Jugend U20</a>
      <a href="#mj-u18">Männliche Jugend U18</a>
      <a href="#wj-u20">Weibliche Jugend U20</a>
      <a href="#wj-u18">Weibliche Jugend U18</a>
      <a href="#mj-gesamt">Männliche Jugend: U16/U15/U14 + U14/U13/U12</a>
      <a href="#wj-gesamt">Weibliche Jugend: U16/U15/U14 + U14/U13/U12</a>
      <a href="#senioren">Senioren (M30–M85)</a>
      <a href="#seniorinnen">Seniorinnen (W30–W70)</a>
    </nav>
  </header>

  <main>
    {CONTENT}
  </main>
</body>
</html>
"""

def fetch(url: str) -> str:
    with urllib.request.urlopen(url) as r:
        charset = r.headers.get_content_charset() or "utf-8"
        return r.read().decode(charset, errors="replace")

def extract_plain_text(html_src: str) -> str:
    # br/p/li -> Zeilenumbrüche, Tags weg, Entities auflösen
    txt = re.sub(r"(?i)<\s*br\s*/?>", "\n", html_src)
    txt = re.sub(r"(?i)</\s*p\s*>", "\n", txt)
    txt = re.sub(r"(?i)</\s*li\s*>", "\n", txt)
    txt = re.sub(r"(?s)<[^>]+>", "", txt)
    txt = html.unescape(txt)
    txt = re.sub(r"\r\n?", "\n", txt)
    return txt.strip()

def split_sections(text: str) -> dict:
    # Finde Beginnzeilen aller Titel; teile den Text in Abschnitte
    pattern = r"(^" + r"|^".join(re.escape(t) for t in TITLES) + r")\s*$"
    anchors = [ (m.group(0), m.start()) for m in re.finditer(pattern, text, flags=re.M) ]
    parts = {}
    for i, (title, start) in enumerate(anchors):
        end = anchors[i+1][1] if i+1 < len(anchors) else len(text)
        body = text[start+len(title):end].strip()
        parts[title] = body
    return parts

def wrap_section(title: str, body: str) -> str:
    section_id = ID_MAP.get(title) or re.sub(r"[^a-z0-9]+", "-", title.lower()).strip("-")
    # „zurück nach oben“-Link (#top) als interner Link
    return (
        f'<section id="{section_id}">\n'
        f'  <h2>{html.escape(title)}</h2>\n'
        f'  <div class="block"><pre>{html.escape(body).strip()}</pre></div>\n'
        f'  <a class="toplink" href="#top">zurück nach oben ↑</a>\n'
        f'</section>\n'
    )

def main():
    raw = fetch(SRC_URL)
    # Versuche nur den Body zu nehmen; wenn nicht vorhanden, nimm alles
    m = re.search(r"(?is)<body[^>]*>(.*)</body>", raw)
    core = m.group(1) if m else raw
    text = extract_plain_text(core)
    parts = split_sections(text)

    sections_html = []
    for t in TITLES:
        sections_html.append(wrap_section(t, parts.get(t, "")))

    final_html = HTML_SHELL.replace("{CONTENT}", "\n".join(sections_html))
    OUTFILE.parent.mkdir(parents=True, exist_ok=True)
    OUTFILE.write_text(final_html, encoding="utf-8")
    print(f"OK: wrote {OUTFILE}")

if __name__ == "__main__":
    main()
