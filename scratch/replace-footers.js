const fs = require('fs');
const path = require('path');

const standardFooter = `<footer class="footer">
  <div class="footer__main">
    <div class="container footer__grid">
      <div class="footer__brand">
        <a href="index.html" class="footer__brand-logo">
          <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="36" height="36">
            <path d="M20 2L37 14V28L20 38L3 28V14L20 2Z" fill="#e8192c" opacity="0.9"/>
            <path d="M20 6L33 15V27L20 34L7 27V15L20 6Z" fill="#0a0e17"/>
            <path d="M20 10L28 15.5V24.5L20 30L12 24.5V15.5L20 10Z" fill="#e8192c" opacity="0.6"/>
            <path d="M20 14L24 16.5V21.5L20 24L16 21.5V16.5L20 14Z" fill="#e8192c"/>
          </svg>
          <span>DIAMOND <strong>IPTV</strong></span>
        </a>
        <p>Diamond IPTV biedt de beste IPTV ervaring in Nederland met meer dan 24.000 live zenders, 100.000+ VOD content en 4K/8K kwaliteit.</p>
        <div class="footer__social">
          <a href="#" class="footer__social-link" aria-label="Facebook">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
          </a>
          <a href="#" class="footer__social-link" aria-label="Instagram">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5"/></svg>
          </a>
          <a href="#" class="footer__social-link" aria-label="YouTube">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="#0a0e17"/></svg>
          </a>
          <a href="#" class="footer__social-link" aria-label="Telegram">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M21.198 2.433a2.242 2.242 0 0 0-1.022.215l-8.609 3.33c-2.068.8-4.133 1.598-5.724 2.21a405.15 405.15 0 0 1-2.849 1.09c-.42.147-.99.332-1.473.901-.728.855.075 1.644.357 1.898.397.36 1.024.692 1.45.873l3.066 1.3a1.63 1.63 0 0 0 .388.088.96.96 0 0 0 .533-.16l7.3-4.932c.166-.103.378.132.23.266l-5.665 5.427a.532.532 0 0 0-.166.415l-.012 3.627c0 .543.344.85.596.975a1.253 1.253 0 0 0 1.138-.07l2.5-1.548 3.078 2.304c.248.186.51.27.782.27.397 0 .803-.204 1.07-.607.214-.323.336-.768.408-1.307l2.203-13.424c.127-.733.063-1.393-.343-1.83a1.485 1.485 0 0 0-1.153-.52z"/></svg>
          </a>
        </div>
      </div>
      <div class="footer__col">
        <h4 class="footer__col-title">Snelle Links</h4>
        <div class="footer__col-links">
          <a href="index.html" class="footer__col-link">Home</a>
          <a href="iptv-kopen.html" class="footer__col-link">IPTV Kopen</a>
          <a href="installatie.html" class="footer__col-link">Installatie</a>
          <a href="blog.html" class="footer__col-link">Blog</a>
          <a href="contact.html" class="footer__col-link">Contact</a>
        </div>
      </div>
      <div class="footer__col">
        <h4 class="footer__col-title">Installatie Gids</h4>
        <div class="footer__col-links">
          <a href="installatie.html" class="footer__col-link">Samsung TV</a>
          <a href="installatie.html" class="footer__col-link">Android TV</a>
          <a href="installatie.html" class="footer__col-link">Fire TV Stick</a>
          <a href="installatie.html" class="footer__col-link">iPhone / iPad</a>
          <a href="installatie.html" class="footer__col-link">Windows / Mac</a>
        </div>
      </div>
      <div class="footer__col">
        <h4 class="footer__col-title">Informatie</h4>
        <div class="footer__col-links">
          <a href="#" class="footer__col-link">Over Ons</a>
          <a href="#" class="footer__col-link">Privacybeleid</a>
          <a href="#" class="footer__col-link">Algemene Voorwaarden</a>
          <a href="#" class="footer__col-link">Disclaimer</a>
        </div>
      </div>
      <div class="footer__col">
        <h4 class="footer__col-title">Betaalmethoden</h4>
        <div class="footer__payment">
          <div class="footer__payment-card" title="iDEAL">
            <span class="ideal-logo">iDEAL</span>
          </div>
          <div class="footer__payment-card" title="Visa">
            <i class="fa-brands fa-cc-visa"></i>
          </div>
          <div class="footer__payment-card" title="Mastercard">
            <i class="fa-brands fa-cc-mastercard"></i>
          </div>
          <div class="footer__payment-card" title="PayPal">
            <i class="fa-brands fa-cc-paypal"></i>
          </div>
          <div class="footer__payment-card" title="Apple Pay">
            <i class="fa-brands fa-cc-apple-pay"></i>
          </div>
        </div>
        <div class="footer__apps">
          <a href="#" class="footer__app-btn" aria-label="App Store">
            <i class="fa-brands fa-apple"></i>
            <div class="footer__app-btn-text">
              <span class="footer__app-btn-sub">Download in de</span>
              <span class="footer__app-btn-title">App Store</span>
            </div>
          </a>
          <a href="#" class="footer__app-btn" aria-label="Google Play">
            <i class="fa-brands fa-google-play"></i>
            <div class="footer__app-btn-text">
              <span class="footer__app-btn-sub">ONTDEK HET OP</span>
              <span class="footer__app-btn-title">Google Play</span>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
  <div class="footer__bottom">
    <div class="container footer__bottom-inner">
      <p class="footer__copyright">&copy; 2026 Diamond IPTV. Alle rechten voorbehouden.</p>
      <div class="footer__bottom-links">
        <a href="#" class="footer__bottom-link">Privacybeleid</a>
        <a href="#" class="footer__bottom-link">Algemene Voorwaarden</a>
        <a href="#" class="footer__bottom-link">Cookiebeleid</a>
      </div>
    </div>
  </div>
</footer>`;

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace <footer class="footer">...</footer> with standardFooter
    const footerRegex = /<footer class="footer">[\s\S]*?<\/footer>/g;
    
    if (footerRegex.test(content)) {
        content = content.replace(footerRegex, standardFooter);
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Updated footer in: ${file}`);
    } else {
        console.log(`No footer found in: ${file}`);
    }
});
