<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="icon" type="image/png" href="assets/favicon.png" />
  <title>Vorstand – KLV Holzminden</title>
  <meta name="description" content="Vorstand des Kreisleichtathletikverbands Holzminden: Ämter und Kontaktinformationen." />
  <link rel="canonical" href="https://klv-holzminden.de/vorstand.html" />
  <meta name="robots" content="index, follow" />
  <link rel="stylesheet" href="styles.css" />
</head>
<body>
  <header class="site-header">
    <div class="nav-wrap">
      <a class="brand" href="index.html">
        <img src="assets/favicon.png" alt="Logo KLV Holzminden" class="brand-logo" />
        <span class="brand-name">KLV Holzminden</span>
      </a>
      <button class="nav-toggle" aria-controls="main-menu" aria-expanded="false" aria-label="Menü öffnen/schließen">☰</button>
      <nav id="main-menu" class="main-nav" aria-label="Hauptnavigation">
        <ul>
          <li><a href="index.html">Start</a></li>
          <li><a href="vereine.html">Vereine</a></li>
          <li><a href="verband.html">Verband</a></li>
          <li><a href="termine.html">Termine</a></li>
          <li><a href="vorstand.html" class="active">Vorstand</a></li>
          <li><a href="ergebnisse.html">Ergebnisse</a></li>
          <li><a href="downloads.html">Downloads</a></li>
          <li><a href="kontakt.html">Kontakt</a></li>
        </ul>
      </nav>
    </div>
  </header>
  <main>
    <section class="sections">
      <div class="container">
        <h2 class="section-title">Vorstand</h2>
        <table class="table" style="width:100%; margin-top:20px;">
          <thead>
            <tr>
              <th>Funktion</th>
              <th>Name</th>
              <th>Kontakt</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Vorsitzender</td><td>Steve Sander</td><td><a href="mailto:klv-meldung@web.de">E‑Mail</a></td></tr>
            <tr><td>Stellv. Vorsitzender</td><td>Frank Sander</td><td>–</td></tr>
            <tr><td>Kassenwart</td><td>Isabell Werner</td><td>–</td></tr>
            <tr><td>Schriftwart</td><td>Anja Gaede</td><td>–</td></tr>
            <tr><td>Statistiker</td><td>Britta Härke</td><td>–</td></tr>
            <tr><td>Pressewart</td><td>Klaus Roloff</td><td>–</td></tr>
          </tbody>
        </table>
        <p style="margin-top:30px; color:#666; font-size:14px;">Stand: 14.11.2024</p>
      </div>
    </section>
  </main>
  <footer class="site">
    <div class="container">
      <p><strong>Kreisleichtathletikverband Holzminden (KLV)</strong><br />
      Informationen zum Leichtathletik‑Sport im Landkreis Holzminden.</p>
      <p>
        <a href="impressum.html">Impressum</a> · 
        <a href="datenschutz.html">Datenschutz</a> · 
        <a href="mailto:s.sander@ksbholzminden.de">Kontakt</a>
      </p>
    </div>
  </footer>
  <script>
    // Navigation toggle
    const toggle = document.querySelector('.nav-toggle');
    const menu = document.querySelector('#main-menu');
    if (toggle && menu) {
      toggle.addEventListener('click', () => {
        const open = menu.classList.toggle('open');
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
    }
  </script>
</body>
</html>