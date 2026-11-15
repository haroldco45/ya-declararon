// Robot de noticias de ¿Ya Declararon? — corre en GitHub Actions cada 30 minutos.
// Busca en Google Noticias y guarda data/noticias.json (máx. 40 noticias, de las más nuevas).
import { readFile, writeFile } from 'node:fs/promises';

const QUERIES = [
  'declaración de renta representantes Cámara',
  'congresistas Ley 2013 declaración de bienes y rentas',
  'representantes más ricos Congreso declaración',
  'congresistas no han publicado declaración de renta'
];
const FILE = 'data/noticias.json';

const decode = s => s.replace(/<!\[CDATA\[|\]\]>/g, '')
  .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").trim();
const tag = (xml, t) => { const m = xml.match(new RegExp(`<${t}[^>]*>([\\s\\S]*?)</${t}>`)); return m ? decode(m[1]) : ''; };

async function search(q) {
  const url = `https://news.google.com/rss/search?q=${encodeURIComponent(q + ' when:30d')}&hl=es-419&gl=CO&ceid=CO:es-419`;
  const r = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (VibrasPositivasHM robot)' } });
  if (!r.ok) throw new Error(`${r.status} ${q}`);
  const xml = await r.text();
  return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map(([, it]) => ({
    title: tag(it, 'title'),
    link: tag(it, 'link'),
    date: new Date(tag(it, 'pubDate')).toISOString(),
    source: tag(it, 'source')
  }));
}

let old = { items: [] };
try { old = JSON.parse(await readFile(FILE, 'utf8')); } catch {}

const fresh = (await Promise.allSettled(QUERIES.map(search))).flatMap(r => r.status === 'fulfilled' ? r.value : []);
const seen = new Set(); const items = [];
for (const n of [...fresh, ...old.items].sort((a, b) => new Date(b.date) - new Date(a.date))) {
  const key = n.title.toLowerCase().replace(/\s+-\s+[^-]+$/, '').slice(0, 80);
  if (!n.title || seen.has(key)) continue;
  seen.add(key); items.push(n);
}
const out = { updated: new Date().toISOString(), items: items.slice(0, 40) };
const changed = JSON.stringify(out.items) !== JSON.stringify(old.items);
if (changed) await writeFile(FILE, JSON.stringify(out, null, 2) + '\n');
console.log(changed ? `Guardadas ${out.items.length} noticias` : 'Sin noticias nuevas');
