fetch('assets/termine.json').then(r=>r.json()).then(rows=>{
  const tbody=document.querySelector('#termine-table tbody');
  rows.forEach(r=>{
    const tr=document.createElement('tr');
    tr.innerHTML=`<td>${r.datum}</td><td>${r.titel}</td><td>${r.ort}</td><td>${r.link?`<a href="${r.link}">Info</a>`:''}</td>`;
    tbody.appendChild(tr);
  });
});
