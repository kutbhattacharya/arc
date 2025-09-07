const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const htmlPath = path.join(__dirname, '..', 'public', 'vendor', 'gorattle.html');
const outPath = path.join(__dirname, '..', 'public', 'vendor', 'gorattle.json');

function extract() {
  if (!fs.existsSync(htmlPath)) {
    console.error(`Missing HTML snapshot at ${htmlPath}`);
    process.exit(1);
  }
  const html = fs.readFileSync(htmlPath, 'utf8');
  const $ = cheerio.load(html);

  const title = $('head > title').first().text().trim();
  const meta = {};
  $('meta').each((_, el) => {
    const name = $(el).attr('name') || $(el).attr('property');
    const content = $(el).attr('content');
    if (name && content) meta[name] = content;
  });

  const stylesheets = [];
  $('link[rel="stylesheet"]').each((_, el) => {
    const href = $(el).attr('href');
    if (href) stylesheets.push(href);
  });

  const headings = [];
  $('h1, h2, h3').each((_, el) => {
    headings.push({ tag: el.tagName?.toLowerCase() || el.name, text: $(el).text().trim() });
  });

  const navLinks = [];
  // Heuristic: top-level anchors in header/nav
  $('header a, nav a').each((_, el) => {
    const text = $(el).text().trim();
    const href = $(el).attr('href');
    if (text && href) navLinks.push({ text, href });
  });

  const data = {
    source: 'https://gorattle.com/',
    fetchedAt: new Date().toISOString(),
    title,
    meta,
    stylesheets,
    navLinks,
    headings,
  };

  fs.writeFileSync(outPath, JSON.stringify(data, null, 2));
  console.log(`Wrote ${outPath}`);
}

extract();

