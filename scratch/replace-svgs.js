const fs = require('fs');

let content = fs.readFileSync('index.html', 'utf8');

// 1. Hero features SVGs
const heroFeatureSvg = /<svg xmlns="http:\/\/www.w3.org\/2000\/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"\/><\/svg>/g;
content = content.replace(heroFeatureSvg, '<i class="fa-solid fa-check"></i>');

// 2. Hero stars SVGs
const starSvg = /<svg xmlns="http:\/\/www.w3.org\/2000\/svg" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"\/><\/svg>/g;
content = content.replace(starSvg, '<i class="fa-solid fa-star"></i>');

// 3. Hero visual floats SVGs
const floatSvg1 = /<svg xmlns="http:\/\/www.w3.org\/2000\/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e8192c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"\/><\/svg>/g;
content = content.replace(floatSvg1, '<i class="fa-solid fa-play"></i>');

const floatSvg2 = /<svg xmlns="http:\/\/www.w3.org\/2000\/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e8192c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12a10 10 0 1 0 20 0 10 10 0 1 0-20 0z"\/><path d="M12 8v4l3 3"\/><\/svg>/g;
content = content.replace(floatSvg2, '<i class="fa-solid fa-clock"></i>');

// 4. Stats bar SVGs
const statSvg1 = /<div class="stat-item__icon"><svg xmlns="http:\/\/www.w3.org\/2000\/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="15" rx="2" ry="2"\/><polyline points="17 2 12 7 7 2"\/><\/svg><\/div>/;
content = content.replace(statSvg1, '<div class="stat-item__icon"><i class="fa-solid fa-tv"></i></div>');

const statSvg2 = /<div class="stat-item__icon"><svg xmlns="http:\/\/www.w3.org\/2000\/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"\/><\/svg><\/div>/;
content = content.replace(statSvg2, '<div class="stat-item__icon"><i class="fa-solid fa-film"></i></div>');

const statSvg3 = /<div class="stat-item__icon"><svg xmlns="http:\/\/www.w3.org\/2000\/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="15" rx="2" ry="2"\/><polyline points="17 2 12 7 7 2"\/><\/svg><\/div>/;
content = content.replace(statSvg3, '<div class="stat-item__icon"><i class="fa-solid fa-video"></i></div>');

const statSvg4 = /<div class="stat-item__icon"><svg xmlns="http:\/\/www.w3.org\/2000\/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"\/><\/svg><\/div>/;
content = content.replace(statSvg4, '<div class="stat-item__icon"><i class="fa-solid fa-chart-line"></i></div>');

const statSvg5 = /<div class="stat-item__icon"><svg xmlns="http:\/\/www.w3.org\/2000\/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"\/><\/svg><\/div>/;
content = content.replace(statSvg5, '<div class="stat-item__icon"><i class="fa-solid fa-headset"></i></div>');

const statSvg6 = /<div class="stat-item__icon"><svg xmlns="http:\/\/www.w3.org\/2000\/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"\/><path d="M21 3v5h-5"\/><\/svg><\/div>/;
content = content.replace(statSvg6, '<div class="stat-item__icon"><i class="fa-solid fa-rotate-left"></i></div>');

// 5. Pricing card features SVGs
const pricingFeatureSvg = /<svg xmlns="http:\/\/www.w3.org\/2000\/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"\/><\/svg>/g;
content = content.replace(pricingFeatureSvg, '<i class="fa-solid fa-check"></i>');

// 6. Blog preview read more SVGs
const readMoreSvg = /<svg xmlns="http:\/\/www.w3.org\/2000\/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"\/><polyline points="12 5 19 12 12 19"\/><\/svg>/g;
content = content.replace(readMoreSvg, '<i class="fa-solid fa-arrow-right"></i>');

// 7. CTA Banner trust block to standard trust-bar
const ctaTrustBlock = /<div class="cta-banner__trust">[\s\S]*?<\/div>/;
const newTrustBar = `<div class="trust-bar" style="margin-top: 20px;">
          <div class="trust-bar__item"><i class="fa-solid fa-bolt"></i> Snelle Activatie</div>
          <div class="trust-bar__item"><i class="fa-solid fa-shield-halved"></i> Veilige Betaling</div>
          <div class="trust-bar__item"><i class="fa-solid fa-headset"></i> 24/7 Support</div>
          <div class="trust-bar__item"><i class="fa-solid fa-rotate-left"></i> Geld Terug Garantie</div>
        </div>`;
content = content.replace(ctaTrustBlock, newTrustBar);

fs.writeFileSync('index.html', content, 'utf8');
console.log("Successfully replaced inline SVGs with FontAwesome icons in index.html!");
