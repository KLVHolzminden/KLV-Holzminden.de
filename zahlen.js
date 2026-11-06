const periodControls = document.querySelector('.period-controls');
if (periodControls) {
  periodControls.hidden = false;
  periodControls.addEventListener('click', event => {
    const button = event.target.closest('button[data-period]');
    if (!button) return;
    const period = button.dataset.period;
    document.querySelector('#trend-five').hidden = period !== 'five';
    document.querySelector('#trend-ten').hidden = period !== 'ten';
    periodControls.querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', String(b === button)));
  });
}
const filters = document.querySelector('.facts-filters');
if (filters) {
  filters.hidden = false;
  const input = document.querySelector('#club-search');
  const sort = document.querySelector('#club-sort');
  const tbody = document.querySelector('.club-stats tbody');
  const rows = Array.from(tbody.rows);
  const status = document.querySelector('#club-filter-status');
  const normalize = value => value.toLocaleLowerCase('de-DE').normalize('NFD').replace(/\p{Diacritic}/gu, '');
  function update() {
    const query = normalize(input.value.trim());
    const key = sort.value;
    rows.sort((a,b) => key === 'name' ? a.dataset.name.localeCompare(b.dataset.name, 'de') : Number(b.dataset[key]) - Number(a.dataset[key]));
    let visible = 0;
    rows.forEach(row => {
      row.hidden = !normalize(row.dataset.name).includes(query);
      if (!row.hidden) visible++;
      tbody.appendChild(row);
    });
    status.hidden = false;
    status.textContent = visible + ' von ' + rows.length + ' Vereinen angezeigt. Die Gesamtzeile bezieht sich auf alle Vereine.';
  }
  input.addEventListener('input', update);
  sort.addEventListener('change', update);
}
