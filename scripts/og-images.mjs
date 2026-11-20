// Generates Open Graph preview images (1200x630) for every case study in every language.
// Run after changing a case study title or tagline (sharp is not a project dependency):
//   npm install --prefix /tmp/og-tools sharp@0.33.5 && NODE_PATH=/tmp/og-tools/node_modules node scripts/og-images.mjs
// Output: public/og/<lang>/<slug>.png (committed, so the deploy needs no image tooling).
import { readFileSync, readdirSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const sharp = require('sharp');
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const studiesDir = join(root, 'src/content/studies');
const langs = ['en', 'de', 'fr', 'nl', 'it'];
const labels = { en: 'CASE STUDY', de: 'FALLSTUDIE', fr: 'ÉTUDE DE CAS', nl: 'CASESTUDY', it: 'CASO DI STUDIO' };

const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const field = (fm, key) => { const m = fm.match(new RegExp('^' + key + ': (.*)$', 'm')); return m ? m[1].trim().replace(/^"(.*)"$/, '$1') : ''; };
function wrap(text, max) {
  const lines = []; let line = '';
  for (const word of text.split(/\s+/)) {
    if ((line + ' ' + word).trim().length > max && line) { lines.push(line); line = word; } else line = (line + ' ' + word).trim();
  }
  if (line) lines.push(line);
  return lines;
}

for (const lang of langs) {
  const dir = lang === 'en' ? studiesDir : join(studiesDir, lang);
  for (const file of readdirSync(dir).filter(f => f.endsWith('.md'))) {
    const fm = readFileSync(join(dir, file), 'utf8').split('\n---')[0];
    const slug = field(fm, 'slug'), title = field(fm, 'title'), tagline = field(fm, 'tagline'), figure = field(fm, 'figure');
    const wide = join(root, 'public/diagrams', figure + '-wide.svg');
    const diagram = readFileSync(existsSync(wide) ? wide : join(root, 'public/diagrams', figure + '.svg'));
    // Largest title size (64 down to 36) whose wrapped lines fit two lines across the card.
    let titleSize = 64, titleLines = [];
    for (; titleSize >= 36; titleSize -= 2) {
      const perLine = Math.floor(1072 / (titleSize * 0.5));
      titleLines = wrap(title, perLine);
      if (titleLines.length <= 2 && titleLines.every(l => l.length <= perLine)) break;
    }
    const tagLines = wrap(tagline, 72).slice(0, 2);
    const lineH = Math.round(titleSize * 1.12);
    const tagY = 160 + titleSize + (titleLines.length - 1) * lineH + 44;
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#1e1e1c"/>
  <rect x="0" y="618" width="1200" height="12" fill="#2f6bff"/>
  <text x="64" y="78" font-family="Consolas, 'DejaVu Sans Mono', monospace" font-size="19" letter-spacing="3" fill="#b4aa98">VISHVENDRA TOMAR · ${esc(labels[lang])}</text>
  <text x="1136" y="78" text-anchor="end" font-family="'Segoe UI', 'DejaVu Sans', sans-serif" font-size="20" font-weight="600" fill="#afc6ff">vishvendratomar.github.io</text>
  <rect x="64" y="98" width="56" height="4" fill="#2f6bff"/>
  ${titleLines.map((l, i) => `<text x="64" y="${160 + titleSize * 0.85 + i * lineH}" font-family="Georgia, 'DejaVu Serif', serif" font-style="italic" font-size="${titleSize}" fill="#f1e9da">${esc(l)}</text>`).join(String.fromCharCode(10) + '  ')}
  ${tagLines.map((l, i) => `<text x="64" y="${tagY + i * 32}" font-family="'Segoe UI', 'DejaVu Sans', sans-serif" font-size="25" fill="#d8cbb3">${esc(l)}</text>`).join(String.fromCharCode(10) + '  ')}
  <rect x="64" y="378" width="1072" height="212" fill="#151513" stroke="#57554e"/>
  <image x="80" y="388" width="1040" height="192" preserveAspectRatio="xMidYMid meet" href="data:image/svg+xml;base64,${diagram.toString('base64')}"/>
</svg>`;
    const out = join(root, 'public/og', lang);
    mkdirSync(out, { recursive: true });
    await sharp(Buffer.from(svg)).png().toFile(join(out, slug + '.png'));
    console.log('og', lang, slug);
  }
}
