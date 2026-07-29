/* ============================================
   DIAMOND IPTV — Admin Panel JavaScript
   ============================================ */

// Global function for editing page directly from table
window.editPageFromTable = function(pageUrl) {
  const contentTabBtn = document.querySelector('[data-tab="content"]');
  const selectPage = document.getElementById('select-edit-page');
  
  if (contentTabBtn) contentTabBtn.click();
  if (selectPage) {
    selectPage.value = pageUrl;
    selectPage.dispatchEvent(new Event('change'));
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const PIN_KEY = 'diamond_admin_pin';
  const DEFAULT_PIN = '1234';

  const loginOverlay = document.getElementById('admin-login-overlay');
  const pinInput = document.getElementById('admin-pin-input');
  const loginBtn = document.getElementById('admin-login-btn');
  const loginError = document.getElementById('admin-login-error');

  // Check Auth status
  function checkAuth() {
    const authenticated = sessionStorage.getItem('diamond_admin_auth');
    if (authenticated === 'true') {
      loginOverlay.style.display = 'none';
    } else {
      loginOverlay.style.display = 'flex';
    }
  }

  // Handle Login
  function handleLogin() {
    const savedPin = localStorage.getItem(PIN_KEY) || DEFAULT_PIN;
    if (pinInput.value === savedPin) {
      sessionStorage.setItem('diamond_admin_auth', 'true');
      loginOverlay.style.display = 'none';
      showToast('Succesvol ingelogd in Admin Panel!');
      loadConfigToForms();
    } else {
      loginError.style.display = 'block';
      pinInput.value = '';
    }
  }

  if (loginBtn) loginBtn.addEventListener('click', handleLogin);
  if (pinInput) {
    pinInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') handleLogin();
    });
  }

  // Logout
  const logoutBtn = document.getElementById('admin-logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      sessionStorage.removeItem('diamond_admin_auth');
      checkAuth();
    });
  }

  // Sidebar Tab Navigation
  const navItems = document.querySelectorAll('.admin-nav-item');
  const tabContents = document.querySelectorAll('.admin-tab-content');

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const targetTab = item.getAttribute('data-tab');

      navItems.forEach(n => n.classList.remove('active'));
      tabContents.forEach(t => t.classList.remove('active'));

      item.classList.add('active');
      const activeEl = document.getElementById(`tab-${targetTab}`);
      if (activeEl) activeEl.classList.add('active');
    });
  });

  // Load active CMS configuration into form fields
  function loadConfigToForms() {
    const config = window.DiamondCMS ? window.DiamondCMS.getConfig() : {};

    // General & Contact
    if (config.general) {
      if (document.getElementById('input-whatsapp')) document.getElementById('input-whatsapp').value = config.general.whatsappNumber || '';
      if (document.getElementById('input-email')) document.getElementById('input-email').value = config.general.supportEmail || '';
      if (document.getElementById('input-verification')) document.getElementById('input-verification').value = config.general.googleVerification || '';
    }

    // Pricing
    if (config.pricing) {
      if (config.pricing.plan1m && document.getElementById('price-1m')) document.getElementById('price-1m').value = config.pricing.plan1m.price || '';
      if (config.pricing.plan3m && document.getElementById('price-3m')) document.getElementById('price-3m').value = config.pricing.plan3m.price || '';
      if (config.pricing.plan12m && document.getElementById('price-12m')) document.getElementById('price-12m').value = config.pricing.plan12m.price || '';
      if (config.pricing.plan24m && document.getElementById('price-24m')) document.getElementById('price-24m').value = config.pricing.plan24m.price || '';
    }

    // SEO
    if (config.seo) {
      if (document.getElementById('input-hometitle')) document.getElementById('input-hometitle').value = config.seo.homeTitle || '';
      if (document.getElementById('input-homedesc')) document.getElementById('input-homedesc').value = config.seo.homeMetaDesc || '';
    }
  }

  // Handle Page Content Editor selection
  const selectEditPage = document.getElementById('select-edit-page');
  if (selectEditPage) {
    selectEditPage.addEventListener('change', () => {
      const pageUrl = selectEditPage.value;
      const config = window.DiamondCMS ? window.DiamondCMS.getConfig() : {};
      const pagesData = config.pages || {};
      const pageData = pagesData[pageUrl] || {};

      document.getElementById('edit-page-title').value = pageData.title || '';
      document.getElementById('edit-page-h1').value = pageData.h1 || '';
      document.getElementById('edit-page-desc').value = pageData.desc || '';
      document.getElementById('edit-page-meta').value = pageData.meta || '';
    });
  }

  // Save Specific Page Content
  const savePageContentBtn = document.getElementById('admin-save-page-content');
  if (savePageContentBtn) {
    savePageContentBtn.addEventListener('click', () => {
      const pageUrl = document.getElementById('select-edit-page').value;
      const config = window.DiamondCMS ? window.DiamondCMS.getConfig() : {};
      
      if (!config.pages) config.pages = {};
      
      config.pages[pageUrl] = {
        title: document.getElementById('edit-page-title').value,
        h1: document.getElementById('edit-page-h1').value,
        desc: document.getElementById('edit-page-desc').value,
        meta: document.getElementById('edit-page-meta').value
      };

      if (window.DiamondCMS) {
        window.DiamondCMS.saveConfig(config);
      }

      showToast(`Content voor ${pageUrl} opgeslagen & live gepubliceerd!`);
    });
  }

  // Save Forms to CMS
  const saveAllBtn = document.getElementById('admin-save-all');
  if (saveAllBtn) {
    saveAllBtn.addEventListener('click', () => {
      const currentConfig = window.DiamondCMS ? window.DiamondCMS.getConfig() : {};

      const updatedConfig = Object.assign({}, currentConfig, {
        general: {
          siteName: "Diamond IPTV",
          whatsappNumber: document.getElementById('input-whatsapp') ? document.getElementById('input-whatsapp').value : currentConfig.general.whatsappNumber,
          supportEmail: document.getElementById('input-email') ? document.getElementById('input-email').value : currentConfig.general.supportEmail,
          googleVerification: document.getElementById('input-verification') ? document.getElementById('input-verification').value : currentConfig.general.googleVerification
        },
        pricing: {
          plan1m: { price: document.getElementById('price-1m') ? document.getElementById('price-1m').value : "€15,99" },
          plan3m: { price: document.getElementById('price-3m') ? document.getElementById('price-3m').value : "€29,99" },
          plan12m: { price: document.getElementById('price-12m') ? document.getElementById('price-12m').value : "€59,99" },
          plan24m: { price: document.getElementById('price-24m') ? document.getElementById('price-24m').value : "€49,99" }
        },
        seo: {
          homeTitle: document.getElementById('input-hometitle') ? document.getElementById('input-hometitle').value : "",
          homeMetaDesc: document.getElementById('input-homedesc') ? document.getElementById('input-homedesc').value : ""
        }
      });

      if (window.DiamondCMS) {
        window.DiamondCMS.saveConfig(updatedConfig);
      }

      showToast('Alle wijzigingen succesvol opgeslagen!');
    });
  }

  // Save Custom PIN
  const savePinBtn = document.getElementById('btn-save-new-pin');
  if (savePinBtn) {
    savePinBtn.addEventListener('click', () => {
      const newPin = document.getElementById('input-new-pin').value;
      const confirmPin = document.getElementById('input-confirm-pin').value;

      if (!newPin || newPin.length < 4) {
        showToast('PIN-code moet minstens 4 tekens bevatten!');
        return;
      }
      if (newPin !== confirmPin) {
        showToast('PIN-codes komen niet overeen!');
        return;
      }

      localStorage.setItem(PIN_KEY, newPin);
      document.getElementById('input-new-pin').value = '';
      document.getElementById('input-confirm-pin').value = '';
      showToast('Beheerders PIN-code succesvol gewijzigd!');
    });
  }

  // Export JSON Config
  const exportBtn = document.getElementById('admin-export-json');
  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      const config = window.DiamondCMS ? window.DiamondCMS.getConfig() : {};
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(config, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", "diamond-iptv-config.json");
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      showToast('Configuratie gedownload als JSON!');
    });
  }

  // Toast Helper
  function showToast(message) {
    const toast = document.getElementById('admin-toast');
    const toastText = document.getElementById('admin-toast-text');
    if (toast && toastText) {
      toastText.textContent = message;
      toast.classList.add('show');
      setTimeout(() => {
        toast.classList.remove('show');
      }, 3500);
    }
  }

  // Initial check
  checkAuth();
  if (sessionStorage.getItem('diamond_admin_auth') === 'true') {
    loadConfigToForms();
  }
});
