/**
 * Amanel Website Build Script
 *
 * Liest die Quell-Seiten aus _pages/ und fügt nav und footer aus _partials/ ein.
 * Ausführen: node build.js
 *
 * Neue Seite hinzufügen:
 *   1. Neue Datei in _pages/ anlegen ({{nav}} und {{footer}} als Platzhalter verwenden)
 *   2. Eintrag in der `pages`-Liste unten ergänzen
 *   3. node build.js ausführen
 */

const fs   = require('fs');
const path = require('path');

const nav    = fs.readFileSync('_partials/nav.html',    'utf8');
const footer = fs.readFileSync('_partials/footer.html', 'utf8');

const pages = [
  { src: '_pages/index.html',          out: 'index.html' },
  { src: '_pages/imprint.html',        out: 'imprint/index.html' },
  { src: '_pages/privacy-policy.html', out: 'privacy-policy/index.html' },
  { src: '_pages/jobs.html',           out: 'jobs/index.html' },
];

for (const page of pages) {
  let html = fs.readFileSync(page.src, 'utf8');
  html = html.replace('{{nav}}', nav).replace('{{footer}}', footer);
  fs.mkdirSync(path.dirname(page.out), { recursive: true });
  fs.writeFileSync(page.out, html, 'utf8');
  console.log(`Gebaut: ${page.out}`);
}

console.log('\nFertig! Alle Seiten wurden erfolgreich erstellt.');
