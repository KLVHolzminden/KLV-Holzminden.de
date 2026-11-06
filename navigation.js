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
