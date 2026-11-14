#!/usr/bin/env node
// generar-libro.mjs — Regenera html/estado-del-registro.html a partir de la
// copia del registro que vive en este repositorio (registro/) y de la
// identidad de cada activo (libro/identidad.json).
//
// Uso (desde la raíz del repositorio, como paso de cada sincronización):
//   node libro/generar-libro.mjs              regenera la página; intenta
//                                             actualizar capitalizaciones
//                                             desde CoinGecko y, si lo logra,
//                                             reescribe libro/identidad.json
//   node libro/generar-libro.mjs --sin-red    no consulta CoinGecko: usa las
//                                             capitalizaciones guardadas
//   node libro/generar-libro.mjs --salida R   escribe en otra ruta (pruebas)
//
// Sin dependencias: Node 18+. No toca registro/; solo lee. Escribe la página
// de forma atómica (temporal + renombrado).

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const RAIZ = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const DIR_REGISTRO = path.join(RAIZ, 'registro');
const ARCHIVO_IDENTIDAD = path.join(RAIZ, 'libro', 'identidad.json');
const args = process.argv.slice(2);
const SIN_RED = args.includes('--sin-red');
const iSalida = args.indexOf('--salida');
const SALIDA = iSalida >= 0 ? args[iSalida + 1] : path.join(RAIZ, 'html', 'estado-del-registro.html');

const MESES = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
const MESES_CORTO = ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'];
const NUMEROS = {2:'dos',3:'tres',4:'cuatro',5:'cinco',6:'seis',7:'siete',8:'ocho',9:'nueve',10:'diez',11:'once',12:'doce',13:'trece',14:'catorce',15:'quince',16:'dieciséis',17:'diecisiete',18:'dieciocho',19:'diecinueve',20:'veinte'};

// La hora del registro es UTC-4 fija (Venezuela, sin horario de verano).
function ahoraUTC4() {
  return new Date(Date.now() - 4 * 3600e3);
}
function fechaLarga(d, conHora) {
  const base = `${d.getUTCDate()} de ${MESES[d.getUTCMonth()]} de ${d.getUTCFullYear()}`;
  if (!conHora) return base;
  const hh = String(d.getUTCHours()).padStart(2, '0');
  const mm = String(d.getUTCMinutes()).padStart(2, '0');
  return `${base} a las ${hh}:${mm} UTC-4`;
}

function diasEnMes(anio, mes1a12) {
  return new Date(Date.UTC(anio, mes1a12, 0)).getUTCDate();
}

// "2026-11-01 00:59:59.999 UTC-4" -> partes; si falta el campo, se deriva de tiempo (UTC-4 fija)
function parseFecha(s) {
  const m = /^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})\.(\d{3}) UTC-4$/.exec(s);
  if (!m) return null;
  return { anio: +m[1], mes: +m[2], dia: +m[3], hora: +m[4], min: +m[5], seg: +m[6] };
}
function fechaDeTiempo(t) {
  const d = new Date(t - 4 * 3600e3);
  return { anio: d.getUTCFullYear(), mes: d.getUTCMonth() + 1, dia: d.getUTCDate(), hora: d.getUTCHours(), min: d.getUTCMinutes(), seg: d.getUTCSeconds() };
}
function diaMesCorto(f) { return `${f.dia} ${MESES_CORTO[f.mes - 1]}`; }
// Cierre HH:59:59.999 -> intervalo "HH:00–(HH+1):00"
function textoIntervalo(f) {
  const h2 = (f.hora + 1) % 24;
  return `${diaMesCorto(f)} ${String(f.hora).padStart(2, '0')}:00–${String(h2).padStart(2, '0')}:00`;
}

function fmtMcap(v) {
  const coma = (x) => x.replace('.', ',');
  if (v >= 1e12) return '$' + coma((v / 1e12).toFixed(2)) + ' T';
  if (v >= 1e9) return '$' + coma((v / 1e9).toFixed(2)) + ' mil M';
  if (v >= 1e6) return '$' + coma((v / 1e6).toFixed(1)) + ' M';
  return '$' + coma(Math.round(v / 1e3).toString()) + ' mil';
}
function fmtHoras(n) {
  return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}
function uneY(partes) {
  if (partes.length <= 1) return partes.join('');
  return partes.slice(0, -1).join(', ') + ' y ' + partes[partes.length - 1];
}
function mayus(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#x27;');
}
// Recorta sufijos societarios para que los nombres largos quepan y se lean
// (conserva el marcador «(bStocks)» y no toca nombres propios de cripto).
const SUFIJOS_SOCIETARIOS = [' Corp', ' Corporation', ' Group', ' Inc', ' Ltd', ' PLC', ' Holdings', ' Company', ' Co', ' Industries'];
function recortaNombre(n) {
  let base = n.replace(/\s*\(bStocks Tokenized Stock\)/, ' (bStocks)')
              .replace(/\s*\(bStocks Tokenized ETF\)/, ' (bStocks ETF)'), cola = '';
  const m = /^(.*?)(\s*\(bStocks(?: ETF)?\))$/.exec(base);
  if (m) { base = m[1]; cola = m[2]; }
  let corto = true;
  while (corto) {
    corto = false;
    for (const s of SUFIJOS_SOCIETARIOS) {
      if (base.endsWith(s)) { base = base.slice(0, -s.length); corto = true; }
    }
  }
  return base + cola;
}

// ---------- lectura del registro ----------
function leerMes(ruta) {
  const lineas = fs.readFileSync(ruta, 'utf8').split('\n');
  const st = { n: 0, first: null, last: null, huecos: 0, duplicados: 0, invalidas: 0, contiguo: true, inicioHistorico: null };
  let prev = null;
  for (const linea of lineas) {
    if (!linea.trim()) continue;
    let o;
    try { o = JSON.parse(linea); } catch { st.invalidas++; continue; }
    if (o && o.formato) {
      if (typeof o.inicioHistorico === 'number') st.inicioHistorico = o.inicioHistorico;
      continue; // cabecera, no es una lectura
    }
    if (!o || typeof o.tiempo !== 'number') { st.invalidas++; continue; }
    const f = typeof o.fecha === 'string' ? parseFecha(o.fecha) : fechaDeTiempo(o.tiempo);
    if (!f) { st.invalidas++; continue; }
    if (prev) {
      const paso = o.tiempo - prev.tiempo;
      if (paso === 3600000) { /* contiguo */ }
      else if (paso <= 0) { st.duplicados++; st.contiguo = false; continue; }
      else { st.huecos++; st.contiguo = false; }
    }
    if (!st.first) st.first = { tiempo: o.tiempo, f };
    st.last = { tiempo: o.tiempo, f };
    prev = { tiempo: o.tiempo };
    st.n++;
  }
  return st;
}

function analizarRegistro() {
  const activos = fs.readdirSync(DIR_REGISTRO, { withFileTypes: true })
    .filter((d) => d.isDirectory()).map((d) => d.name).sort();
  const porActivo = {};
  let archivos = 0, huecos = 0, duplicados = 0, invalidas = 0;
  for (const a of activos) {
    const dir = path.join(DIR_REGISTRO, a);
    const meses = fs.readdirSync(dir)
      .filter((x) => /^\d{4}_.+\.jsonl$/.test(x)).sort();
    porActivo[a] = { meses: {}, total: 0, first: null, last: null };
    for (const archivo of meses) {
      const aamm = archivo.slice(0, 4);
      const st = leerMes(path.join(dir, archivo));
      archivos++;
      huecos += st.huecos; duplicados += st.duplicados; invalidas += st.invalidas;
      const anio = 2000 + +aamm.slice(0, 2), mes = +aamm.slice(2);
      porActivo[a].meses[aamm] = { ...st, anio, mes };
      porActivo[a].total += st.n;
      if (st.inicioHistorico && !porActivo[a].inicioHistorico) porActivo[a].inicioHistorico = st.inicioHistorico;
      if (st.first && (!porActivo[a].first || st.first.tiempo < porActivo[a].first.tiempo)) porActivo[a].first = st.first;
      if (st.last && (!porActivo[a].last || st.last.tiempo > porActivo[a].last.tiempo)) porActivo[a].last = st.last;
    }
  }
  return { activos, porActivo, archivos, huecos, duplicados, invalidas };
}

// ---------- descripciones ----------
function mesCompleto(st) {
  if (!st.contiguo || !st.first || !st.last) return false;
  const dias = diasEnMes(st.anio, st.mes);
  return st.n === dias * 24 &&
    st.first.f.dia === 1 && st.first.f.hora === 0 &&
    st.last.f.dia === dias && st.last.f.hora === 23;
}
function descMes(st) {
  if (mesCompleto(st)) return `${MESES[st.mes - 1]} completo (${fmtHoras(st.n)} h)`;
  if (st.contiguo && st.first) {
    if (st.first.f.dia === 1 && st.first.f.hora === 0)
      return `${MESES[st.mes - 1]} del 1 al ${st.last.f.dia} (${fmtHoras(st.n)} h)`;
    return `${MESES[st.mes - 1]} del ${st.first.f.dia} al ${st.last.f.dia} (${fmtHoras(st.n)} h)`;
  }
  return `${MESES[st.mes - 1]} (${fmtHoras(st.n)} h, con huecos)`;
}
function descMesResumen(st) {
  // Viñeta resumen corta: «octubre desde el día 2», «noviembre hasta el 11»
  const mes = MESES[st.mes - 1];
  if (mesCompleto(st)) return `${mes} completo`;
  const dias = diasEnMes(st.anio, st.mes);
  const empiezaTarde = st.first.f.dia !== 1 || st.first.f.hora !== 0;
  const terminaPronto = st.last.f.dia !== dias || st.last.f.hora !== 23;
  if (empiezaTarde) return `${mes} desde el ${st.first.f.dia}`;
  if (terminaPronto) return `${mes} hasta el ${st.last.f.dia}`;
  return mes;
}
function mesesDe(pa) {
  return Object.keys(pa.meses).sort().map((k) => pa.meses[k]);
}

// ---------- capitalización (CoinGecko) ----------
async function refrescarMcap(identidad) {
  const ids = [...new Set(Object.values(identidad.activos).map((a) => a.cg).filter(Boolean))];
  const t0 = ahoraUTC4();
  const mercado = new Map();
  for (let i = 0; i < ids.length; i += 250) {
    const lote = ids.slice(i, i + 250).join(',');
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${lote}&per_page=250&page=1`;
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 15000);
    try {
      const r = await fetch(url, { signal: ctrl.signal, headers: { accept: 'application/json' } });
      if (!r.ok) throw new Error(`CoinGecko respondió ${r.status}`);
      for (const c of await r.json()) mercado.set(c.id, c.market_cap || null);
    } finally { clearTimeout(timer); }
  }
  for (const a of Object.values(identidad.activos)) {
    if (a.cg && mercado.has(a.cg)) a.mcap = mercado.get(a.cg);
  }
  const t1 = ahoraUTC4();
  const hhmm = (d) => `${String(d.getUTCHours()).padStart(2, '0')}:${String(d.getUTCMinutes()).padStart(2, '0')}`;
  identidad.meta.consulta_identidad = `entre las ${hhmm(t0)} y las ${hhmm(t1)} UTC-4 del ${fechaLarga(t1)}`;
  identidad.meta.mcap_fecha = fechaLarga(t1);
  const tmp = ARCHIVO_IDENTIDAD + '.tmp';
  fs.writeFileSync(tmp, JSON.stringify(identidad, null, 1) + '\n', { mode: 0o600 });
  fs.renameSync(tmp, ARCHIVO_IDENTIDAD);
  return true;
}

// ---------- página ----------
function generar() {
  const identidad = JSON.parse(fs.readFileSync(ARCHIVO_IDENTIDAD, 'utf8'));
  const R = analizarRegistro();
  const hoy = ahoraUTC4();
  const nombreDe = (a) => esc(recortaNombre((identidad.activos[a] && identidad.activos[a].nombre) || a.replace(/USDT$/, '')));
  const mcapDe = (a) => identidad.activos[a] && identidad.activos[a].mcap;

  // Cobertura común: del más tardío de los primeros al más temprano de los últimos
  let maxFirst = null, minLast = null;
  for (const a of R.activos) {
    const pa = R.porActivo[a];
    if (!pa.first || !pa.last) continue;
    if (!maxFirst || pa.first.tiempo > maxFirst.tiempo) maxFirst = pa.first;
    if (!minLast || pa.last.tiempo < minLast.tiempo) minLast = pa.last;
  }
  const horasComunes = maxFirst && minLast && minLast.tiempo >= maxFirst.tiempo
    ? Math.round((minLast.tiempo - maxFirst.tiempo) / 3600e3) + 1 : 0;
  let cobertura;
  if (maxFirst.f.mes === minLast.f.mes && maxFirst.f.anio === minLast.f.anio) {
    const dias = minLast.f.dia - maxFirst.f.dia + 1;
    const completaDias = maxFirst.f.hora === 0 && minLast.f.hora === 23;
    if (dias === 7 && completaDias)
      cobertura = `la semana ${maxFirst.f.dia}–${minLast.f.dia} de ${MESES[maxFirst.f.mes - 1]} completa`;
    else if (completaDias)
      cobertura = `los días ${maxFirst.f.dia}–${minLast.f.dia} de ${MESES[maxFirst.f.mes - 1]} completos`;
    else
      cobertura = `del ${maxFirst.f.dia} al ${minLast.f.dia} de ${MESES[maxFirst.f.mes - 1]}`;
  } else {
    cobertura = `del ${maxFirst.f.dia} de ${MESES[maxFirst.f.mes - 1]} al ${minLast.f.dia} de ${MESES[minLast.f.mes - 1]}`;
  }
  const coberturaLarga = `${cobertura}, ${fmtHoras(horasComunes)} horas contiguas`;
  const coberturaCorta = cobertura;

  // Los que tienen más que la cobertura común
  const top = R.activos.filter((a) => R.porActivo[a].total > horasComunes)
    .sort((a, b) => R.porActivo[b].total - R.porActivo[a].total || a.localeCompare(b));
  const resto = R.activos.filter((a) => !top.includes(a));

  // Viñetas de "Lo que hay"
  const vin = [];
  vin.push(`<li><strong>${R.activos.length} activos</strong>, cada uno con su carpeta y sus archivos mensuales.</li>`);
  vin.push(`<li><strong>Cobertura común</strong>: ${coberturaLarga}.</li>`);
  const gainers = identidad.meta.grupo_gainers || [];
  if (gainers.length) {
    const conSept = gainers.filter((a) => R.porActivo[a] && R.porActivo[a].meses['2609'] && mesCompleto(R.porActivo[a].meses['2609']));
    const sinSept = gainers.filter((a) => !conSept.includes(a));
    const partes = [];
    if (conSept.length) partes.push(`${NUMEROS[conSept.length] || conSept.length} con septiembre completo`);
    for (const a of sinSept) {
      const pa = R.porActivo[a];
      if (pa && pa.first) partes.push(`${nombreDe(a)} desde el ${pa.first.f.dia} de ${MESES[pa.first.f.mes - 1]}`);
      else partes.push(nombreDe(a));
    }
    vin.push(`<li><strong>Con septiembre y octubre</strong>: ${identidad.meta.grupo_gainers_etiqueta}; ${uneY(partes)}.</li>`);
  }
  for (const a of top.filter((x) => !gainers.includes(x))) {
    const pa = R.porActivo[a];
    vin.push(`<li><strong>${nombreDe(a)}</strong>: ${uneY(mesesDe(pa).map(descMesResumen))}.</li>`);
  }
  if (R.huecos === 0 && R.duplicados === 0 && R.invalidas === 0)
    vin.push(`<li><strong>Huecos, duplicados o filas inválidas</strong>: ninguno en este corte (${R.archivos} archivos revisados).</li>`);
  else
    vin.push(`<li><strong>Incidencias en este corte</strong> (${R.archivos} archivos revisados): ${R.huecos} huecos, ${R.duplicados} duplicados, ${R.invalidas} filas inválidas.</li>`);

  // Los que tienen más historia: párrafos cortos, sin pares ni contadores
  const itemsTop = top.map((a) => {
    const pa = R.porActivo[a];
    const mcap = mcapDe(a);
    const mesesTxt = mayus(uneY(mesesDe(pa).map(descMesResumen))) + '.';
    const inicio = pa.inicioHistorico
      ? `Inicio confirmado: la primera vela abre el ${(() => { const f = fechaDeTiempo(pa.inicioHistorico); return `${f.dia} ${MESES_CORTO[f.mes - 1]} ${String(f.hora).padStart(2, '0')}:00 UTC-4`; })()} y no hay registro más atrás.`
      : 'Inicio sin confirmar: puede haber historia más atrás.';
    return `<li><strong>${nombreDe(a)}</strong> — ${mcap ? fmtMcap(mcap) : 'sin dato'}. ${mesesTxt} ${inicio}</li>`;
  });
  const tituloTop = 'Con más historia';

  // Tabla del resto
  const conMcap = resto.filter((a) => mcapDe(a)).sort((a, b) => mcapDe(b) - mcapDe(a));
  const sinMcap = resto.filter((a) => !mcapDe(a)).sort();
  const filas = [...conMcap, ...sinMcap].map((a, i) => {
    const mcap = mcapDe(a);
    return `<tr><td>${i + 1}</td><td>${nombreDe(a)} — ${mcap ? fmtMcap(mcap) : 'sin dato'}</td></tr>`;
  });

  // Estado de esta copia: moda de las fechas tope y excepciones más allá
  const ultimos = new Map();
  for (const a of R.activos) {
    const l = R.porActivo[a].last;
    if (l) ultimos.set(a, l);
  }
  const cuentaTopes = new Map();
  for (const l of ultimos.values()) cuentaTopes.set(l.tiempo, (cuentaTopes.get(l.tiempo) || 0) + 1);
  const topeModa = [...cuentaTopes.entries()].sort((x, y) => y[1] - x[1])[0][0];
  const fModa = [...ultimos.values()].find((l) => l.tiempo === topeModa).f;
  const exc = R.activos.filter((a) => ultimos.get(a) && ultimos.get(a).tiempo > topeModa)
    .map((a) => `${nombreDe(a)}, al ${ultimos.get(a).f.dia}`);
  const excTxt = exc.length ? ` (${exc.join('; ')})` : '';

  const html = `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>El estado del registro · Tesorería Osmancito</title>
<meta name="description" content="Qué hay en el registro de variaciones, activo por activo: qué días están cubiertos, desde cuándo hay historia y qué falta por reconstruir.">
<link rel="icon" href="https://osmancitov.github.io/favicon.ico">
<meta property="og:type" content="article">
<meta property="og:locale" content="es_VE">
<meta property="og:title" content="El estado del registro">
<meta property="og:description" content="Qué hay en el registro de variaciones, activo por activo: qué días están cubiertos, desde cuándo hay historia y qué falta por reconstruir.">
<meta property="og:url" content="https://osmancitov.github.io/tesoreria/html/estado-del-registro.html">
<link rel="stylesheet" href="/css/base.css">
<style>
@media (max-width: 640px) {
  .tabla td, .tabla th { white-space: normal; overflow-wrap: anywhere; }
}
</style>
</head>
<body>
<main>
<p>${fechaLarga(hoy)}</p>
<h1>El estado del registro</h1>
<p>El registro es una bitácora propia que guarda, hora a hora, la variación de 24 horas de cada activo con par en USDT en la casa de cambio Binance. Cada activo tiene su carpeta y dentro un archivo por mes. Esta página es su libro: qué activos hay, qué días están cubiertos, desde cuándo hay historia de cada uno y qué falta por reconstruir. Se actualiza cuando el registro cambia.</p>
<hr>
<h2>Lo que hay</h2>
<ul>
${vin.join('\n')}
</ul>
<h2>${tituloTop}</h2>
<ul>
${itemsTop.join('\n')}
</ul>
<h2>Los demás</h2>
<p>Todos tienen ${coberturaCorta} y nada más atrás todavía: su historia anterior está pendiente de reconstrucción. Ordenados por capitalización (M = millones de dólares; «sin dato» cuando la fuente no la ofrece con claridad).</p>
<div class="tabla"><table>
<thead><tr><th>N.º</th><th>Activo y capitalización</th></tr></thead>
<tbody>
${filas.join('\n')}
</tbody>
</table></div>
<h2>Cómo se lee</h2>
<ul>
<li>Cada fila del registro guarda el cierre de una vela de una hora: «10:59:59.999» es el cierre del intervalo 10:00–11:00. Las horas están en UTC-4.</li>
<li>«Primera variación 24h» es la entrada más antigua registrada y llega siempre 24 horas después de la primera vela: la variación necesita un día completo previo.</li>
<li>«Pendiente de reconstrucción» es historia anterior que aún no se ha recuperado de la fuente.</li>
<li>En las acciones tokenizadas (bStocks), la capitalización mostrada es la del token, no la bursátil de la empresa subyacente.</li>
</ul>
<h2>Estado de esta copia</h2>
<p>Esta página describe la copia pública del registro tal como quedó el ${fechaLarga(hoy, true)}: sus datos llegan al ${fModa.dia} de ${MESES[fModa.mes - 1]}${excTxt}. El registro vivo sigue creciendo hora a hora en otra máquina; esta copia se pone al día en cada sincronización, y esta página, con ella.</p>
<hr>
<h2>Fuentes</h2>
<p>Contenido del registro: la copia pública de los datos, revisada archivo por archivo (${R.archivos} archivos) el ${fechaLarga(hoy)}. Nombre e identidad de cada activo: su par listado en Binance según CoinGecko. Capitalización: CoinGecko. Ambas consultas ${identidad.meta.consulta_identidad}.</p>
<p>Esta página informa; no aconseja comprar ni vender.</p>
<p>© 2026 Osmancito</p>
</main>
<p><a href="../tesoreria.html">Volver a Tesorería</a></p>
</body>
</html>
`;

  const tmp = SALIDA + '.tmp';
  fs.writeFileSync(tmp, html);
  fs.renameSync(tmp, SALIDA);
  return { archivos: R.archivos, activos: R.activos.length, top: top.length, resto: resto.length, huecos: R.huecos, duplicados: R.duplicados, invalidas: R.invalidas, horasComunes };
}

(async () => {
  if (!SIN_RED) {
    try {
      const identidad = JSON.parse(fs.readFileSync(ARCHIVO_IDENTIDAD, 'utf8'));
      await refrescarMcap(identidad);
      console.log('Capitalizaciones actualizadas desde CoinGecko; libro/identidad.json reescrito.');
    } catch (e) {
      console.warn(`Aviso: no se pudieron actualizar las capitalizaciones (${e.message}); se usan las guardadas.`);
    }
  }
  const r = generar();
  console.log(`Página escrita en ${SALIDA}`);
  console.log(`Corte: ${r.activos} activos, ${r.archivos} archivos de mes, cobertura común ${r.horasComunes} h, ${r.top} con más historia, ${r.resto} en la tabla. Incidencias: ${r.huecos} huecos, ${r.duplicados} duplicados, ${r.invalidas} inválidas.`);
})();
