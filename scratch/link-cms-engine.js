const fs = require('fs');
const path = require('path');

const rootDir = 'c:\\Users\\Awais Ahmed\\OneDrive\\Documents\\GitHub\\Diamond IPTV';

function linkCmsEngine() {
  const files = fs.readdirSync(rootDir).filter(f => f.endsWith('.html') && f !== 'admin.html');

  files.forEach(file => {
    const filePath = path.join(rootDir, file);
    let htmlContent = fs.readFileSync(filePath, 'utf8');

    if (!htmlContent.includes('js/cms-engine.js')) {
      htmlContent = htmlContent.replace('<script src="js/main.js"></script>', '<script src="js/cms-engine.js?v=1.3"></script>\n  <script src="js/main.js"></script>');
      fs.writeFileSync(filePath, htmlContent, 'utf8');
      console.log(`Linked cms-engine.js in ${file}`);
    }
  });
}

linkCmsEngine();
