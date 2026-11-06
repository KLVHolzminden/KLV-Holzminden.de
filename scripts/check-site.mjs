import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const root = path.resolve(import.meta.dirname, '..');
const errors = [];
const seen = new Set();
let links = 0;
const read = p => fs.readFileSync(path.join(root, p), 'utf8');
function visit(file) {
  if (seen.has(file)) return;
  seen.add(file);
  const html = read(file).replace(/<!--[\s\S]*?-->/g, '');
  for (const m of html.matchAll(/\b(?:href|src)\s*=\s*["']([^"']+)["']/gi)) {
    const url = m[1].replaceAll('&amp;', '&');
    if (/^(?:[a-z]+:|\/\/)/i.test(url)) continue;
    links++;
    const [relative, fragment] = url.split('#');
    const target = relative ? path.posix.normalize(path.posix.join(path.posix.dirname(file), relative.split('?')[0])) : file;
    if (!fs.existsSync(path.join(root, target))) { errors.push(file + ' → missing ' + target); continue; }
    if (fragment && target.endsWith('.html')) {
      const markup = read(target).replace(/<!--[\s\S]*?-->/g, '');
      const ids = [...markup.matchAll(/\b(?:id|name)\s*=\s*(?:["']([^"']+)["']|([^\s>]+))/gi)].map(x => x[1] || x[2]);
      if (!ids.includes(decodeURIComponent(fragment))) errors.push(file + ' → missing anchor ' + target + '#' + fragment);
    }
    if (target.endsWith('.html')) visit(target);
  }
}
const pages = fs.readdirSync(root).filter(p => p.endsWith('.html') && !p.startsWith('Ergebnis_') && !p.startsWith('google') && p !== 'footer.html');
for (const p of pages) {
  const html = read(p);
  assert.match(html, /<title>[^<]+/i, p);
  assert.equal((html.match(/<main\b/gi) || []).length, 1, p);
  assert.match(html, /id="main-menu"/, p);
  assert.match(html, /href="kontakt.html"/, p);
  assert.match(html, /href="impressum.html"/, p);
  assert.match(html, /src="navigation.js"/, p);
  visit(p);
}
for (const p of ['termine.json', 'vereine.json']) JSON.parse(read(p));
for (const p of ['navigation.js', 'footer.js', 'termine.js', 'vereine.js']) new vm.Script(read(p), {filename:p});
assert.equal((read('vereine.html').match(/<tr>/g)||[]).length, 18, '17 Vereine plus Tabellenkopf');
assert.match(read('kontakt.html'), /forms.office.com\/e\/0injdVHfmt/);
assert.match(read('kontakt.html'), /mailto:s.sander@ksbholzminden.de/);
assert.match(read('impressum.html'), /Liebigstraße 112/);
assert.doesNotMatch(read('impressum.html'), /Musterstraße/);
assert.match(read('assets/bestenliste_2024.html'), /charset=UTF-8/);
assert.match(read('robots.txt'), /^User-agent: \*/);
assert.match(read('sitemap.xml'), /<urlset xmlns="http:\/\/www.sitemaps.org\/schemas\/sitemap\/0.9">/);
for (const p of pages) assert.doesNotMatch(read(p), /href="(?:#|assets\/[^"]*\.pdf)"/, p);
// Exercise the mobile menu using the same event handlers shipped to browsers.
const classes = new Set();
const handlers = {};
const attrs = {};
const toggle = { hidden:true, setAttribute:(k,v)=>attrs[k]=v, addEventListener:(k,fn)=>handlers['toggle:'+k]=fn, focus:()=>handlers.focused=true };
const menu = { classList:{add:c=>classes.add(c), remove:c=>classes.delete(c), contains:c=>classes.has(c), toggle:c=>{if(classes.has(c)){classes.delete(c);return false;}classes.add(c);return true;}}, addEventListener:(k,fn)=>handlers['menu:'+k]=fn };
vm.runInNewContext(read('navigation.js'), {document:{querySelector:q=>q==='.nav-toggle'?toggle:menu, addEventListener:(k,fn)=>handlers[k]=fn}});
assert.equal(toggle.hidden,false);
assert.ok(classes.has('enhanced'));
handlers['toggle:click']();
assert.equal(attrs['aria-expanded'],'true');
handlers.keydown({key:'Escape'});
assert.equal(attrs['aria-expanded'],'false');
assert.equal(handlers.focused,true);
handlers['toggle:click']();
handlers['menu:click']({target:{closest:()=>({})}});
assert.equal(attrs['aria-expanded'],'false');
if(errors.length){ console.error(errors.join('\n')); process.exit(1); }
console.log('OK: ' + pages.length + ' Hauptseiten, ' + seen.size + ' erreichbare HTML-Dateien, ' + links + ' interne Verweise und Sprungmarken; Inhalte, JSON, JavaScript und Menüabläufe geprüft.');
