/**
 * Amanel Website Build Script
 *
 * Liest die Quell-Seiten aus _pages/ und fügt nav und footer aus _partials/ ein.
 * Kopiert CSS, JS und Images in den dist/-Ordner.
 * Ausführen: node build.js
 *
 * Neue Seite hinzufügen:
 *   1. Neue Datei in _pages/ anlegen ({{nav}} und {{footer}} als Platzhalter verwenden)
 *   2. Eintrag in der `pages`-Liste unten ergänzen
 *   3. node build.js ausführen
 */

const fs   = require('fs');
const path = require('path');

const OUT = 'dist';

const nav    = fs.readFileSync('_partials/nav.html',    'utf8');
const footer = fs.readFileSync('_partials/footer.html', 'utf8');

const pages = [
  { src: '_pages/index.html',          out: `${OUT}/index.html` },
  { src: '_pages/imprint.html',        out: `${OUT}/imprint/index.html` },
  { src: '_pages/privacy-policy.html', out: `${OUT}/privacy-policy/index.html` },
  { src: '_pages/jobs.html',           out: `${OUT}/jobs/index.html` },
  { src: '_pages/spielzeug.html',      out: `${OUT}/spielzeug/index.html` },
  { src: '_pages/kinderwagen.html',    out: `${OUT}/kinderwagen/index.html` },
  { src: '_pages/tragen.html',         out: `${OUT}/tragen/index.html` },
  { src: '_pages/kleidung.html',       out: `${OUT}/kleidung/index.html` },
  { src: '_pages/autositze.html',      out: `${OUT}/autositze/index.html` },
];

// HTML-Seiten verarbeiten
for (const page of pages) {
  let html = fs.readFileSync(page.src, 'utf8');
  html = html.replace('{{nav}}', nav).replace('{{footer}}', footer);
  fs.mkdirSync(path.dirname(page.out), { recursive: true });
  fs.writeFileSync(page.out, html, 'utf8');
  console.log(`Gebaut:   ${page.out}`);
}

// Statische Dateien kopieren
function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(s, d);
    else fs.copyFileSync(s, d);
  }
}

copyDir('css',    `${OUT}/css`);
copyDir('js',     `${OUT}/js`);
copyDir('images', `${OUT}/images`);
copyDir('fonts',  `${OUT}/fonts`);

console.log(`Kopiert:  ${OUT}/css/, ${OUT}/js/, ${OUT}/images/, ${OUT}/fonts/`);
console.log(`\nFertig! Deploy-Ordner: ./${OUT}/`);
