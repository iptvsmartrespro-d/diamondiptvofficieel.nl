const fs = require('fs');
const path = require('path');

const DOMAIN = 'https://www.diamondiptvofficieel.nl';
const ROOT_DIR = 'c:\\Users\\Awais Ahmed\\OneDrive\\Documents\\GitHub\\Diamond IPTV';

function generateSitemap() {
  const files = fs.readdirSync(ROOT_DIR).filter(f => f.endsWith('.html'));

  const urlEntries = files.map(file => {
    const filePath = path.join(ROOT_DIR, file);
    const stats = fs.statSync(filePath);
    const lastmod = stats.mtime.toISOString().split('T')[0];

    let priority = '0.8';
    let changefreq = 'weekly';

    if (file === 'index.html') {
      priority = '1.0';
      changefreq = 'daily';
    } else if (file === 'iptv-kopen.html' || file === 'installatie.html') {
      priority = '0.9';
    } else if (file === 'blog.html') {
      priority = '0.8';
      changefreq = 'daily';
    } else if (file === 'contact.html') {
      priority = '0.7';
      changefreq = 'monthly';
    } else if (file === 'admin.html') {
      return null; // Exclude admin panel from public sitemap
    }

    const relativeUrl = file === 'index.html' ? '' : file;

    return `  <url>
    <loc>${DOMAIN}/${relativeUrl}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  }).filter(Boolean);

  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries.join('\n')}
</urlset>`;

  fs.writeFileSync(path.join(ROOT_DIR, 'sitemap.xml'), xmlContent, 'utf8');
  console.log(`Successfully generated sitemap.xml with ${urlEntries.length} pages.`);
}

generateSitemap();
