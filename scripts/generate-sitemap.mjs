import fs from 'node:fs';
import path from 'node:path';

const SITE_URL = 'https://calculator-website-puce.vercel.app';
const root = process.cwd();
const toolsPath = path.join(root, 'src', 'data', 'tools.ts');
const articlesPath = path.join(root, 'src', 'data', 'articles.ts');
const outputPath = path.join(root, 'public', 'sitemap.xml');

const toUrl = (route) => `${SITE_URL}${route}`;
const today = new Date().toISOString().slice(0, 10);

const read = (filePath) => fs.readFileSync(filePath, 'utf8');

const toolsSource = read(toolsPath);
const articlesSource = read(articlesPath);

const toolLinks = [
  ...toolsSource.matchAll(/link:\s*'([^']+)'/g),
].map((match) => match[1]);

const articleLinks = [
  ...articlesSource.matchAll(/slug:\s*'([^']+)'/g),
].map((match) => `/blog/${match[1]}`);

const toolsByCategoryBlock =
  toolsSource.match(/toolsByCategory:[\s\S]*?\n};\n\nexport const getAllTools/)?.[0] ?? '';

const categoryLinks = [
  ...new Set(
    [...toolsByCategoryBlock.matchAll(/'([a-z-]+)'\s*:\s*\{/g)]
      .map((match) => match[1])
      .map((category) => `/category/${category}`)
  ),
];

const staticRoutes = ['/', '/all-tools', '/blog', '/about', '/contact', '/privacy', '/terms'];

const allRoutes = [...new Set([...staticRoutes, ...categoryLinks, ...toolLinks, ...articleLinks])];

const escapeXml = (value) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');

const toEntry = (route) => {
  const loc = escapeXml(toUrl(route));
  const priority = route === '/' ? '1.0' : route.startsWith('/tools/') ? '0.9' : '0.7';
  const changefreq = route.startsWith('/tools/') ? 'weekly' : route.startsWith('/blog/') ? 'monthly' : 'weekly';
  return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
};

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...allRoutes.map(toEntry),
  '</urlset>',
  '',
].join('\n');

fs.writeFileSync(outputPath, xml, 'utf8');
console.log(`Generated sitemap with ${allRoutes.length} URLs -> ${outputPath}`);
