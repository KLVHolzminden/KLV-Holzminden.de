// footer.js (ohne <script>-Tags)
fetch('footer.html')
  .then(r => r.text())
  .then(html => {
    const placeholder = document.querySelector('footer.site');
    if (!placeholder) return;
    // Ersetzt den Platzhalter <footer class="site"></footer> komplett
    placeholder.outerHTML = html;
  })
  .catch(err => console.error('Footer konnte nicht geladen werden:', err));
