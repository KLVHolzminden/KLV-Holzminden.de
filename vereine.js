fetch('assets/vereine.json').then(r=>r.json()).then(items=>{
  const grid=document.querySelector('#vereine-grid');
  items.forEach(v=>{
    const el=document.createElement('div');
    el.className='card';
    el.innerHTML = `<h3>${v.name}</h3>
      <p>${v.ort}</p>
      ${v.link ? `<a href="${v.link}">Website</a>`:''}`;
    grid.appendChild(el);
  });
});
