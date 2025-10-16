<script>
// Lädt den Footer automatisch aus footer.html nach
fetch('footer.html')
  .then(response => response.text())
  .then(html => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const newFooter = doc.querySelector('footer');
    const currentFooter = document.querySelector('footer.site');
    if (currentFooter && newFooter) {
      currentFooter.replaceWith(newFooter);
    }
  })
  .catch(err => console.error('Footer konnte nicht geladen werden:', err));
</script>
