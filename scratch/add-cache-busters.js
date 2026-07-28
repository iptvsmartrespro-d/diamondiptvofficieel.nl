const fs = require('fs');
const path = require('path');

const version = '1.3'; // bump version to bust cache
const rootDir = 'c:\\Users\\Awais Ahmed\\OneDrive\\Documents\\GitHub\\Diamond IPTV';

function addCacheBusters() {
  const files = fs.readdirSync(rootDir).filter(f => f.endsWith('.html'));

  files.forEach(file => {
    const filePath = path.join(rootDir, file);
    let htmlContent = fs.readFileSync(filePath, 'utf8');

    // Replace css references with ?v=version
    // E.g., href="css/global.css" => href="css/global.css?v=1.3"
    // E.g., href="css/global.css?v=1.1" => href="css/global.css?v=1.3"
    
    const updatedHtml = htmlContent.replace(/(href="css\/[^"]+\.css)(?:\?v=[^"]+)?(")/g, `$1?v=${version}$2`);
    
    if (updatedHtml !== htmlContent) {
      fs.writeFileSync(filePath, updatedHtml, 'utf8');
      console.log(`Updated cache busters in ${file}`);
    }
  });
}

addCacheBusters();
