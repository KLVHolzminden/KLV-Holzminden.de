const toggle = document.querySelector('.nav-toggle');
const menu = document.querySelector('#main-menu');
if (toggle && menu) {
  toggle.hidden = false;
  menu.classList.add('enhanced');
  function closeMenu() { menu.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); }
  toggle.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  menu.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu.classList.contains('open')) { closeMenu(); toggle.focus(); }
  });
}

// Every subpage offers a clear route back to the overview without relying on browser history.
if (document.body && !document.querySelector('.home-page')) {
  const main = document.querySelector('main');
  if (main) {
    const back = document.createElement('p');
    back.className = 'back-navigation';
    back.innerHTML = '<a href="index.html">← Zurück zur Startseite</a>';
    main.append(back);
  }
}
