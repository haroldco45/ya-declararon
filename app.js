/* ¿Ya Declararon? — Vibras Positivas HM
   Derecho de petición ciudadano sobre las declaraciones de renta de los representantes a la Cámara. */
(() => {
'use strict';

const TZ = 'America/Bogota';
const APP_URL = 'https://ya-declararon.netlify.app/';

/* Correos oficiales verificados (nov. 2026) */
const DEST = [
  { es: 'Cámara de Representantes · Secretaría General (asuntos jurídicos y derechos de petición)', en: 'House of Representatives · General Secretariat (legal affairs and petitions)', email: 'secretariageneral.juridica@camara.gov.co' },
  { es: 'Unidad Coordinadora de Atención Ciudadana del Congreso', en: 'Congress Citizen Service Unit', email: 'atencionciudadanacongreso@senado.gov.co' },
  { es: 'Departamento Administrativo de la Función Pública', en: 'Civil Service Department (Función Pública)', email: 'eva@funcionpublica.gov.co' },
  { es: 'Procuraduría General de la Nación', en: 'Inspector General’s Office (Procuraduría)', email: 'quejas@procuraduria.gov.co' }
];

/* Festivos de Colombia (para contar días hábiles) */
const FESTIVOS = new Set([
  '2026-11-16','2026-12-08','2026-12-25',
  '2027-01-01','2027-01-11','2027-03-22','2027-03-25','2027-03-26','2027-05-01','2027-05-10','2027-05-31',
  '2027-06-07','2027-07-05','2027-07-20','2027-08-07','2027-08-16','2027-10-18','2027-11-01','2027-11-15',
  '2027-12-08','2027-12-25'
]);

const PHOTOS = [
  'https://commons.wikimedia.org/wiki/Special:FilePath/Capitolio_Nacional_de_Colombia.JPG?width=700',
  'https://commons.wikimedia.org/wiki/Special:FilePath/Capitolio_Nacional_en_la_lluvia_II.jpg?width=700',
  'https://commons.wikimedia.org/wiki/Special:FilePath/Capitolio_Nacional_de_la_Rep%C3%BAblica_de_Colombia.JPG?width=700',
  'https://commons.wikimedia.org/wiki/Special:FilePath/Capitolio_Nacional_en_la_lluvia_III.jpg?width=700',
  'https://commons.wikimedia.org/wiki/Special:FilePath/Capitolio_Nacional_de_Colombia_(Bogot%C3%A1)_02.JPG?width=700',
  'https://commons.wikimedia.org/wiki/Special:FilePath/Bogota_-_Capitolio_Nacional.JPG?width=700'
];

const QUERIES = [
  'declaración de renta representantes Cámara',
  'congresistas Ley 2013 declaración de bienes y rentas',
  'representantes más ricos Congreso declaración'
];

/* ---------- Idioma ---------- */
const EN = {
  nav_hoy:'Today', nav_peticion:'My petition', nav_ley:'The law', refresh:'Refresh',
  kicker:'Citizen oversight · Law 2013 of 2019',
  hero_title:'Have your representatives <span class="hl">filed</span> their income tax return?',
  hero_lead:'National media report that more than half of Colombia’s House has not published its income tax return. You have the right to know who did and who did not. Fill in your details and send your petition to every authority at once.',
  cta_main:'Make my petition', cta_news:'See today’s news',
  stat1:'seats in the House of Representatives',
  stat2:'of representatives have not reported their income tax return, according to Infobae Colombia',
  stat3:'representatives report matching figures between their asset form and tax return, according to CAMBIO',
  stat4:'business days for authorities to answer your petition',
  hoy_kicker:'Updates every time you open the app', hoy_title:'Today',
  hoy_deadline_t:'If you send your petition today', hoy_deadline_p:'They must answer no later than:',
  hoy_deadline_s:'10 business days (Law 1755 of 2015, art. 14), excluding weekends and holidays.',
  hoy_mine_t:'My follow-up', hoy_mine_none:'You have not sent your petition from this phone yet.',
  news_title:'News on the case', live_searching:'Searching live…', live_ok:'Live', live_robot:'Robot',
  news_foot:'A robot checks the news every 30 minutes, and we also search live every time you open the app.',
  dest_title:'Your petition goes to:', form_kicker:'Step 1 · Your details', form_title:'Make your petition',
  form_lead:'Your details stay on your phone. The app only builds the letter and opens it in your email, ready to send to every authority.',
  f_nombre:'Full name', f_cedula:'ID number (cédula)', f_expedida:'Issued in', f_ciudad:'City / town', f_depto:'Department',
  f_direccion:'Address (optional)', f_correo:'Email for the reply', f_tel:'Phone / WhatsApp',
  f_extra:'Want to ask about a specific representative? (optional)', f_err:'Please fill in name, ID, city and email.', f_btn:'See my letter',
  letter_kicker:'Step 2 · Review and send', letter_en_note:'The letter is written in Spanish because Colombian authorities must receive it in Spanish.',
  send_all:'Send to every authority', send_gmail:'Send with Gmail', copy:'Copy letter and emails', pdf:'Save as PDF',
  send_note:'Tapping “Send” opens your email with the letter and all authority addresses filled in. Just tap “Send” there. Keep the automatic reply with your filing number.',
  sent_q:'Did you send it from your email?', sent_yes:'Yes, I sent it',
  share_title:'One petition is a voice. A thousand petitions are a message.',
  share_p:'Each citizen must send their own, under their own name. Share the app with your family and groups.', share_btn:'Share on WhatsApp',
  ley_kicker:'What the law says', ley_title:'Why must they publish their income?',
  law1:'It requires members of Congress and other elected officials to publish their asset and income statement, conflict-of-interest register and income tax return, and to update it every year.',
  law2t:'Public Integrity App', law2:'The Función Pública tool where those statements are filed. Any citizen can look them up.', law2a:'Open the app',
  law3:'Requests for documents and information must be answered within 10 business days. If the authority is not competent, it must forward the request and tell you.',
  law4t:'What if they don’t answer?', law4:'Ask the Procuraduría for support at vigilanciaderechodepeticion@procuraduria.gov.co with a copy of your petition and filing number, or file a tutela action.',
  sources:'Sources:', footer:'Independent citizen app. Not affiliated with any government agency or political party.', photos:'Photos:'
};
const ES = {};
let lang = localStorage.getItem('yd_lang') || 'es';

function snapshotES(){
  document.querySelectorAll('[data-i18n]').forEach(el => { ES[el.dataset.i18n] ??= el.textContent; });
  document.querySelectorAll('[data-i18n-html]').forEach(el => { ES[el.dataset.i18nHtml] ??= el.innerHTML; });
  Object.assign(ES, { live_searching:'Buscando en vivo…', live_ok:'En vivo', live_robot:'Robot' });
}
const t = k => (lang === 'en' ? EN[k] : ES[k]) ?? ES[k] ?? k;
function applyLang(){
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach(el => { const v = t(el.dataset.i18n); if (v) el.textContent = v; });
  document.querySelectorAll('[data-i18n-html]').forEach(el => { const v = t(el.dataset.i18nHtml); if (v) el.innerHTML = v; });
  $('#btnLang').textContent = lang === 'en' ? 'ES' : 'EN';
  renderDest(); renderToday(); renderMine();
}

/* ---------- Utilidades ---------- */
const $ = s => document.querySelector(s);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function toast(msg){
  let el = $('.toast'); if (!el){ el = document.createElement('div'); el.className='toast'; document.body.appendChild(el); }
  el.textContent = msg; el.classList.add('show'); clearTimeout(el._t); el._t = setTimeout(()=>el.classList.remove('show'), 3200);
}
function bogotaParts(d = new Date()){
  const p = Object.fromEntries(new Intl.DateTimeFormat('en-CA',{timeZone:TZ,year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(d).map(x=>[x.type,x.value]));
  return { y:+p.year, m:+p.month, d:+p.day, iso:`${p.year}-${p.month}-${p.day}` };
}
function fmtLong(date, withTime){
  const o = { timeZone:TZ, weekday:'long', day:'numeric', month:'long', year:'numeric' };
  if (withTime){ o.hour='numeric'; o.minute='2-digit'; }
  return new Intl.DateTimeFormat(lang==='en'?'en-US':'es-CO', o).format(date);
}
function addBusinessDays(n){
  const {y,m,d} = bogotaParts();
  const dt = new Date(Date.UTC(y, m-1, d, 12));
  let added = 0;
  while (added < n){
    dt.setUTCDate(dt.getUTCDate()+1);
    const dow = dt.getUTCDay(); const iso = dt.toISOString().slice(0,10);
    if (dow !== 0 && dow !== 6 && !FESTIVOS.has(iso)) added++;
  }
  return dt;
}
function timeAgo(date){
  const s = (Date.now() - date.getTime())/1000;
  const rtf = new Intl.RelativeTimeFormat(lang==='en'?'en':'es',{numeric:'auto'});
  if (s < 3600) return rtf.format(-Math.max(1,Math.round(s/60)),'minute');
  if (s < 86400) return rtf.format(-Math.round(s/3600),'hour');
  return rtf.format(-Math.round(s/86400),'day');
}

/* ---------- Destinatarios ---------- */
function renderDest(){
  $('#destList').innerHTML = DEST.map(d => `<li>${esc(lang==='en'?d.en:d.es)}<small>${esc(d.email)}</small></li>`).join('');
}

/* ---------- Hoy ---------- */
function renderToday(){
  $('#hoyStamp').textContent = (lang==='en'?'Updated: ':'Actualizado: ') + fmtLong(new Date(), true);
  const dl = addBusinessDays(10);
  $('#deadlineDate').textContent = new Intl.DateTimeFormat(lang==='en'?'en-US':'es-CO',{timeZone:'UTC',weekday:'long',day:'numeric',month:'long',year:'numeric'}).format(dl);
}
function renderMine(){
  const sent = JSON.parse(localStorage.getItem('yd_sent') || 'null');
  const card = $('.today-card.mine'), p = $('#mineStatus');
  if (!sent){ card.classList.remove('done'); p.textContent = t('hoy_mine_none'); return; }
  card.classList.add('done');
  const due = new Date(sent.due);
  const fDue = new Intl.DateTimeFormat(lang==='en'?'en-US':'es-CO',{timeZone:'UTC',day:'numeric',month:'long',year:'numeric'}).format(due);
  const late = Date.now() > due.getTime() + 86400000;
  p.innerHTML = lang==='en'
    ? `You sent your petition on <strong>${esc(fmtLong(new Date(sent.at)))}</strong>. Deadline to answer: <strong>${esc(fDue)}</strong>.${late?' <br><strong>The deadline has passed.</strong> You can ask the Procuraduría for support or file a tutela.':''}`
    : `Usted envió su petición el <strong>${esc(fmtLong(new Date(sent.at)))}</strong>. Plazo para responder: <strong>${esc(fDue)}</strong>.${late?' <br><strong>Ya se venció el plazo.</strong> Puede pedir apoyo a la Procuraduría o poner una tutela.':''}`;
}

/* ---------- Noticias ---------- */
let newsItems = [];
function renderNews(items){
  const grid = $('#newsGrid');
  if (!items.length){ grid.innerHTML = `<p class="muted">${lang==='en'?'No news found right now. Try “Refresh”.':'No encontramos noticias en este momento. Toque “Actualizar”.'}</p>`; return; }
  const today = bogotaParts().iso;
  grid.innerHTML = items.slice(0,12).map((n,i) => {
    const d = new Date(n.date); const isToday = !isNaN(d) && bogotaParts(d).iso === today;
    const img = n.image || PHOTOS[i % PHOTOS.length];
    return `<a class="news reveal in" href="${esc(n.link)}" target="_blank" rel="noopener">
      <div class="news-img" style="background-image:url('${esc(img)}')">${isToday?`<span class="tag">${lang==='en'?'Today':'Hoy'}</span>`:''}</div>
      <div class="news-body"><h4>${esc(n.title)}</h4><p class="news-meta">${esc(n.source||'')}${isNaN(d)?'':' · '+esc(timeAgo(d))}</p></div></a>`;
  }).join('');
  const tick = items.slice(0,6).map(n => `<span>${esc(n.title)}</span>`).join('');
  if (tick) $('#tickerTrack').innerHTML = tick + tick;
}
function mergeNews(list){
  const seen = new Set(); const out = [];
  for (const n of list){
    const key = (n.title||'').toLowerCase().replace(/\s+-\s+[^-]+$/,'').slice(0,80);
    if (!n.title || seen.has(key)) continue; seen.add(key); out.push(n);
  }
  return out.sort((a,b) => new Date(b.date) - new Date(a.date));
}
async function loadRobot(){
  try{
    const r = await fetch('data/noticias.json?t=' + Date.now(), {cache:'no-store'});
    if (!r.ok) return [];
    const j = await r.json(); return j.items || [];
  }catch{ return []; }
}
async function liveSearch(){
  const out = [];
  await Promise.all(QUERIES.map(async q => {
    const rss = `https://news.google.com/rss/search?q=${encodeURIComponent(q + ' when:30d')}&hl=es-419&gl=CO&ceid=CO:es-419`;
    try{
      const r = await fetch('https://api.allorigins.win/raw?url=' + encodeURIComponent(rss), {cache:'no-store'});
      if (!r.ok) return;
      const xml = new DOMParser().parseFromString(await r.text(), 'text/xml');
      xml.querySelectorAll('item').forEach(it => out.push({
        title: it.querySelector('title')?.textContent?.trim(),
        link: it.querySelector('link')?.textContent?.trim(),
        date: it.querySelector('pubDate')?.textContent,
        source: it.querySelector('source')?.textContent?.trim()
      }));
    }catch{}
  }));
  return out;
}
async function refreshNews(manual){
  const badge = $('#liveBadge'); const btn = $('#btnRefresh');
  badge.className = 'live'; badge.textContent = t('live_searching'); btn.classList.add('spin');
  if (!newsItems.length) $('#newsGrid').innerHTML = '<div class="skel"></div><div class="skel"></div><div class="skel"></div>';
  const robot = await loadRobot();
  if (robot.length){ newsItems = mergeNews(robot); renderNews(newsItems); }
  const live = await liveSearch();
  newsItems = mergeNews([...live, ...robot]);
  renderNews(newsItems);
  badge.className = 'live ok'; badge.textContent = live.length ? t('live_ok') : t('live_robot');
  btn.classList.remove('spin'); renderToday(); renderMine();
  if (manual) toast(lang==='en'?'Updated':'Actualizado');
}

/* ---------- Carta ---------- */
function buildLetter(f){
  const hoy = new Intl.DateTimeFormat('es-CO',{timeZone:TZ,day:'numeric',month:'long',year:'numeric'}).format(new Date());
  const lugar = [f.ciudad, f.depto].filter(Boolean).join(', ');
  const extra = f.extra ? `\n7. De manera especial, la información de los numerales 1 a 3 respecto de: ${f.extra}.\n` : '\n';
  return `${lugar}, ${hoy}

Señores
SECRETARÍA GENERAL – CÁMARA DE REPRESENTANTES DE COLOMBIA
UNIDAD COORDINADORA DE ATENCIÓN CIUDADANA DEL CONGRESO
DEPARTAMENTO ADMINISTRATIVO DE LA FUNCIÓN PÚBLICA
PROCURADURÍA GENERAL DE LA NACIÓN
Bogotá D. C.

Asunto: Derecho de petición de información – Cumplimiento de la Ley 2013 de 2019 por parte de los representantes a la Cámara (declaración de bienes y rentas, conflictos de interés y declaración del impuesto sobre la renta).

Yo, ${f.nombre}, ciudadano(a) colombiano(a), identificado(a) con la cédula de ciudadanía n.º ${f.cedula}${f.expedida ? ' de ' + f.expedida : ''}, domiciliado(a) en ${lugar}, en ejercicio del derecho fundamental de petición consagrado en el artículo 23 de la Constitución Política, del derecho de acceso a documentos públicos del artículo 74 de la Constitución, y en los términos de la Ley 1755 de 2015 y de la Ley 1712 de 2014, de manera respetuosa presento la siguiente petición.

HECHOS

1. La Ley 2013 de 2019 obliga a los servidores públicos elegidos por voto popular, entre ellos los congresistas, a publicar y divulgar su declaración de bienes y rentas, el registro de conflictos de interés y la declaración del impuesto sobre la renta y complementarios, y a actualizarla cada año.
2. Esa información se registra en el Aplicativo por la Integridad Pública que administra el Departamento Administrativo de la Función Pública.
3. En noviembre de 2026, medios de comunicación nacionales publicaron que más de la mitad de los miembros de la Cámara de Representantes no ha reportado su declaración de renta, y que varios no han presentado o no han actualizado su información desde hace años.
4. Como ciudadano(a) tengo derecho a conocer si quienes nos representan están cumpliendo con esta obligación legal de transparencia.

PETICIONES

Solicito que se me informe y entregue, por escrito:

1. La lista completa de los representantes a la Cámara del periodo constitucional vigente (2026-2030) que SÍ han publicado en el Aplicativo por la Integridad Pública su declaración de bienes y rentas, su registro de conflictos de interés y su declaración del impuesto sobre la renta, indicando para cada uno el año gravable de la última declaración publicada y la fecha de publicación.
2. La lista completa de los representantes que NO han publicado alguno de esos documentos, o que no los han actualizado en el último año, indicando cuál o cuáles documentos les faltan.
3. La lista de los representantes que cargaron documentos distintos a la declaración de renta (por ejemplo, solo el recibo de pago del impuesto u otro documento).
4. Las acciones, requerimientos o comunicaciones que la Cámara de Representantes y la Función Pública hayan enviado a los representantes incumplidos para que publiquen su información, con sus fechas.
5. Si se ha dado traslado a la Comisión de Ética y Estatuto del Congresista, a la Procuraduría General de la Nación o a otra autoridad por el incumplimiento de la Ley 2013 de 2019 por parte de algún representante, y en qué estado se encuentran esos trámites.
6. El enlace o ruta pública donde cualquier ciudadano puede consultar las declaraciones publicadas de cada representante.${extra}
No solicito datos reservados. Pido únicamente la información que la Ley 2013 de 2019 define como pública y de divulgación, y la información sobre el cumplimiento de esa obligación, que es de interés general.

FUNDAMENTOS DE DERECHO

- Artículos 23 y 74 de la Constitución Política.
- Ley 1755 de 2015, en especial el artículo 14, numeral 1, que fija diez (10) días hábiles para responder peticiones de documentos e información.
- Ley 1712 de 2014, de transparencia y acceso a la información pública.
- Ley 2013 de 2019.
- Circular Externa 100-019 de 2021 de la Función Pública.

Si alguna de las entidades destinatarias no es competente para responder alguno de los puntos, solicito que dé traslado a la autoridad competente dentro del término legal y me lo informe, conforme al artículo 21 de la Ley 1755 de 2015.

NOTIFICACIONES

Recibiré respuesta en:
- Correo electrónico: ${f.correo}${f.tel ? '\n- Teléfono / WhatsApp: ' + f.tel : ''}${f.direccion ? '\n- Dirección: ' + f.direccion + ', ' + lugar : ''}

Atentamente,

${f.nombre}
C. C. n.º ${f.cedula}${f.expedida ? ' de ' + f.expedida : ''}
${lugar}`;
}
const SUBJECT = 'Derecho de petición – Lista de representantes a la Cámara que han publicado su declaración de renta (Ley 2013 de 2019)';
let currentLetter = '';

function getForm(){
  const fd = new FormData($('#form')); const f = {};
  for (const [k,v] of fd) f[k] = String(v).trim();
  return f;
}
function saveForm(f){ const {extra, ...keep} = f; localStorage.setItem('yd_form', JSON.stringify(keep)); }
function restoreForm(){
  const f = JSON.parse(localStorage.getItem('yd_form') || 'null'); if (!f) return;
  for (const [k,v] of Object.entries(f)){ const el = $('#form').elements[k]; if (el) el.value = v; }
}
function markPending(){
  $('#sentCheck').hidden = false;
}

function initForm(){
  restoreForm();
  $('#form').addEventListener('submit', e => {
    e.preventDefault();
    const f = getForm();
    const okEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.correo);
    if (!f.nombre || !f.cedula || !f.ciudad || !okEmail){ $('#formErr').hidden = false; return; }
    $('#formErr').hidden = true; saveForm(f);
    currentLetter = buildLetter(f);
    $('#letter').textContent = currentLetter;
    $('#letterWrap').hidden = false;
    $('#letterWrap').scrollIntoView({behavior:'smooth', block:'start'});
  });
  const to = DEST.map(d => d.email).join(',');
  $('#btnSend').addEventListener('click', () => {
    location.href = `mailto:${to}?subject=${encodeURIComponent(SUBJECT)}&body=${encodeURIComponent(currentLetter)}`;
    markPending();
  });
  $('#btnGmail').addEventListener('click', () => {
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(to)}&su=${encodeURIComponent(SUBJECT)}&body=${encodeURIComponent(currentLetter)}`, '_blank');
    markPending();
  });
  $('#btnCopy').addEventListener('click', async () => {
    const txt = `PARA: ${DEST.map(d=>d.email).join(', ')}\nASUNTO: ${SUBJECT}\n\n${currentLetter}`;
    try{ await navigator.clipboard.writeText(txt); toast(lang==='en'?'Copied. Paste it into your email.':'Copiado. Péguelo en su correo.'); }
    catch{ toast(lang==='en'?'Could not copy':'No se pudo copiar'); }
    markPending();
  });
  $('#btnPdf').addEventListener('click', () => window.print());
  $('#btnMarkSent').addEventListener('click', () => {
    localStorage.setItem('yd_sent', JSON.stringify({ at: Date.now(), due: addBusinessDays(10).toISOString() }));
    $('#sentCheck').hidden = true; renderMine();
    toast(lang==='en'?'Saved. We’ll show your deadline in “Today”.':'Listo. Le mostramos su plazo en “Hoy”.');
    $('#hoy').scrollIntoView({behavior:'smooth'});
  });
}

/* ---------- Compartir ---------- */
function initShare(){
  $('#btnShare').addEventListener('click', () => {
    const msg = lang==='en'
      ? `Do you know which Colombian representatives have published their income tax return? Most have not. Send your petition to Congress, Función Pública and the Procuraduría in one minute: ${APP_URL}`
      : `¿Sabe qué representantes a la Cámara han publicado su declaración de renta? Más de la mitad no lo ha hecho. Exija la lista con su derecho de petición, se envía a todas las entidades en un minuto: ${APP_URL}`;
    window.open('https://wa.me/?text=' + encodeURIComponent(msg), '_blank');
  });
}

/* ---------- Animaciones ---------- */
function initReveal(){
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } }), {threshold:.15});
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
  const co = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return; co.unobserve(e.target);
    const el = e.target, end = +el.dataset.count; let n = 0; const step = Math.max(1, Math.ceil(end/40));
    const iv = setInterval(() => { n = Math.min(end, n+step); el.textContent = n; if (n >= end) clearInterval(iv); }, 30);
  }), {threshold:.6});
  document.querySelectorAll('[data-count]').forEach(el => co.observe(el));
}

/* ---------- Inicio ---------- */
snapshotES();
if (lang !== 'es') applyLang(); else { renderDest(); renderToday(); renderMine(); }
$('#btnLang').addEventListener('click', () => { lang = lang==='es'?'en':'es'; localStorage.setItem('yd_lang', lang); applyLang(); renderNews(newsItems); });
$('#btnRefresh').addEventListener('click', () => refreshNews(true));
initForm(); initShare(); initReveal();
refreshNews(false);
document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible'){ renderToday(); renderMine(); } });
if ('serviceWorker' in navigator) window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(()=>{}));
})();
