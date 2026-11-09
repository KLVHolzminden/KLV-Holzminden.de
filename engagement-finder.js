const finder = document.querySelector('[data-engagement-finder]');
if (finder) {
  const results = finder.querySelector('[data-results]');
  const status = finder.querySelector('[data-status]');
  const allButton = finder.querySelector('[data-show-all]');
  const toggle = finder.querySelector('[data-finder-toggle]');
  const questions = finder.querySelector('[data-finder-questions]');
  let offers = [];
  let showAll = false;
  const escapeHtml = value => String(value).replace(/[&<>"]/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[char]));
  const mailto = offer => {
    const subject = `Interesse am Engagement: ${offer.titel}`;
    const body = `Hallo ${offer.kontaktperson},\n\nich habe mich auf der KLV-Website über Möglichkeiten informiert, mich in der Leichtathletik zu engagieren.\n\nBesonders interessiert mich: ${offer.titel}.\n\nIch würde gerne mehr darüber erfahren und gemeinsam schauen, ob und wie ich mich einbringen kann.\n\nViele Grüße`;
    return `mailto:${offer.kontaktadresse}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };
  function render() {
    const time = finder.querySelector('input[name="zeit"]:checked')?.value || '';
    const interests = [...finder.querySelectorAll('input[name="interesse"]:checked')].map(input => input.value);
    const open = interests.includes('offen');
    const scored = offers.map(offer => {
      const matched = open ? 1 : offer.interessen.filter(item => interests.includes(item)).length;
      const timeMatch = !time || offer.zeitwerte.includes(time);
      return {...offer, score: (matched * 4) + (timeMatch ? 2 : 0), matchesInterest: !interests.length || open || matched > 0, timeMatch};
    }).filter(offer => showAll || (offer.matchesInterest && offer.timeMatch)).sort((a,b) => b.score - a.score || a.sortierung - b.sortierung);
    const visible = scored.length ? scored : offers;
    results.innerHTML = visible.map(offer => `<article class="engagement-result"><p class="eyebrow">${escapeHtml(offer.zeitmodell)}</p><h3>${escapeHtml(offer.titel)}</h3><p class="engagement-motto">${escapeHtml(offer.motto)}</p><p>${escapeHtml(offer.beschreibung)}</p><dl><div><dt>Zeitlicher Rahmen</dt><dd>${escapeHtml(offer.zeitbeschreibung)}</dd></div><div><dt>Voraussetzungen</dt><dd>${escapeHtml(offer.voraussetzungen)}</dd></div></dl><p class="engagement-actions"><a href="${escapeHtml(offer.detailLink)}">Mehr erfahren</a><a class="button" href="${mailto(offer)}">Ich habe Interesse</a></p></article>`).join('');
    status.textContent = showAll ? `Alle ${visible.length} Engagementmöglichkeiten werden angezeigt.` : `${visible.length} passende Möglichkeit${visible.length === 1 ? '' : 'en'} werden angezeigt.`;
    allButton.setAttribute('aria-pressed', String(showAll));
    allButton.textContent = showAll ? 'Passende Angebote anzeigen' : 'Alle Angebote anzeigen';
  }
  finder.addEventListener('change', render);
  allButton.addEventListener('click', () => { showAll = !showAll; render(); });
  toggle.addEventListener('click', () => {
    const opening = questions.hidden;
    questions.hidden = !opening;
    toggle.setAttribute('aria-expanded', String(opening));
    toggle.textContent = opening ? 'Fragebogen schließen' : 'Finde dein Engagement';
    if (opening) questions.querySelector('input')?.focus();
  });
  fetch('data/engagementangebote.json').then(response => response.ok ? response.json() : Promise.reject()).then(data => { offers = data.filter(offer => offer.aktiv).sort((a,b) => a.sortierung - b.sortierung); render(); }).catch(() => { status.textContent = 'Die Engagementangebote konnten gerade nicht geladen werden. Bitte nutze den Kontaktweg unten auf der Seite.'; });
}
