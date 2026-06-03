import fs from 'node:fs';
import path from 'node:path';

const DEFAULT_SITE_URL = 'https://calculator-website-puce.vercel.app';
const SITE_URL = (process.env.VITE_SITE_URL || process.env.SITE_URL || DEFAULT_SITE_URL)
  .trim()
  .replace(/\/+$/, '');
const root = process.cwd();
const toolsPath = path.join(root, 'src', 'data', 'tools.ts');
const articlesPath = path.join(root, 'src', 'data', 'articles.ts');
const publicDir = path.join(root, 'public');

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

const writeUrlset = (fileName, routes) => {
  const outputPath = path.join(publicDir, fileName);
  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...routes.map(toEntry),
    '</urlset>',
    '',
  ].join('\n');
  fs.writeFileSync(outputPath, xml, 'utf8');
  return outputPath;
};

const writeSitemapIndex = (fileName, sitemapFiles) => {
  const outputPath = path.join(publicDir, fileName);
  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...sitemapFiles.map(
      (sitemapFile) =>
        `  <sitemap>\n    <loc>${SITE_URL}/${sitemapFile}</loc>\n    <lastmod>${today}</lastmod>\n  </sitemap>`
    ),
    '</sitemapindex>',
    '',
  ].join('\n');
  fs.writeFileSync(outputPath, xml, 'utf8');
  return outputPath;
};

const writeRobots = () => {
  const outputPath = path.join(publicDir, 'robots.txt');
  const lines = [
    '# robots.txt for WorkMoney Tools',
    'User-agent: *',
    'Allow: /',
    'Disallow: /api/',
    'Disallow: /icon-demo',
    '',
    `Sitemap: ${SITE_URL}/sitemap-index.xml`,
    `Sitemap: ${SITE_URL}/sitemap.xml`,
    '',
    'User-agent: Googlebot',
    'Allow: /',
    '',
    'User-agent: Bingbot',
    'Allow: /',
    '',
    'User-agent: Slurp',
    'Allow: /',
    '',
  ];
  fs.writeFileSync(outputPath, lines.join('\n'), 'utf8');
  return outputPath;
};

const groupedSitemaps = [
  { file: 'sitemap-pages.xml', routes: staticRoutes },
  { file: 'sitemap-categories.xml', routes: categoryLinks },
  { file: 'sitemap-tools.xml', routes: [...new Set(toolLinks)] },
  { file: 'sitemap-blog.xml', routes: articleLinks },
];

for (const sitemap of groupedSitemaps) {
  writeUrlset(sitemap.file, sitemap.routes);
}

const sitemapFiles = groupedSitemaps.map((item) => item.file);
const indexPath = writeSitemapIndex('sitemap-index.xml', sitemapFiles);
const legacyIndexPath = writeSitemapIndex('sitemap.xml', sitemapFiles);
const robotsPath = writeRobots();

const totalUrls = groupedSitemaps.reduce((sum, sitemap) => sum + sitemap.routes.length, 0);
console.log(
  `Generated ${sitemapFiles.length} grouped sitemaps (${totalUrls} URLs) -> ${indexPath}; mirrored index -> ${legacyIndexPath}; robots -> ${robotsPath}`
);
