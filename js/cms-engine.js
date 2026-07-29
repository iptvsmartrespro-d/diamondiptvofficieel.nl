/* ============================================
   DIAMOND IPTV — CMS State Hydration Engine
   ============================================ */

(function () {
  const DEFAULT_CONFIG = {
    general: {
      siteName: "Diamond IPTV",
      whatsappNumber: "31612345678",
      supportEmail: "support@diamondiptv.nl",
      trialOfferText: "7 Dagen Niet Goed, Geld Terug",
      googleVerification: "vs5-Y_Gm8tMF5BSvLdS51FgQs3wSBYpBpK0BJIvl9MI"
    },
    pricing: {
      plan1m: { price: "€15,99", oldPrice: "", period: "/maand" },
      plan3m: { price: "€29,99", oldPrice: "was €39.99", period: "/3 maanden" },
      plan12m: { price: "€59,99", oldPrice: "was €79.99", period: "/jaar", badge: "MEEST GEKOZEN" },
      plan24m: { price: "€49,99", oldPrice: "was €119.99", period: "/jaar" }
    },
    seo: {
      homeTitle: "Diamond IPTV | De Beste IPTV Service in Nederland - 24.000+ Zenders",
      homeMetaDesc: "Diamond IPTV biedt premium IPTV in Nederland ✓ 24.000+ live zenders ✓ 100.000+ VOD & Series ✓ 4K/8K kwaliteit ✓ 99.9% uptime ✓ 7 dagen geld terug. Bestel nu!"
    }
  };

  function getActiveConfig() {
    try {
      const saved = localStorage.getItem('diamond_iptv_admin_config');
      if (saved) {
        return Object.assign({}, DEFAULT_CONFIG, JSON.parse(saved));
      }
    } catch (e) {
      console.warn("CMS Engine: Local storage unavailable, using defaults.", e);
    }
    return DEFAULT_CONFIG;
  }

  function hydratePage() {
    const config = getActiveConfig();

    // Hydrate Google Verification Meta Tag if missing/updated
    if (config.general.googleVerification) {
      let meta = document.querySelector('meta[name="google-site-verification"]');
      if (meta) {
        meta.setAttribute('content', config.general.googleVerification);
      }
    }

    // Hydrate WhatsApp links
    if (config.general.whatsappNumber) {
      document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
        link.href = `https://wa.me/${config.general.whatsappNumber}?text=Hallo%20Diamond%20IPTV,%20ik%20heb%20een%20vraag`;
      });
    }

    // Hydrate Pricing Plan 1 Month
    if (config.pricing.plan1m) {
      const p1 = document.querySelectorAll('.pricing-card:nth-child(1) .pricing-card__amount');
      p1.forEach(el => el.textContent = config.pricing.plan1m.price);
    }

    // Hydrate Pricing Plan 3 Months
    if (config.pricing.plan3m) {
      const p3 = document.querySelectorAll('.pricing-card:nth-child(2) .pricing-card__amount');
      p3.forEach(el => el.textContent = config.pricing.plan3m.price);
    }

    // Hydrate Pricing Plan 12 Months
    if (config.pricing.plan12m) {
      const p12 = document.querySelectorAll('.pricing-card--accent .pricing-card__amount, .pricing-card:nth-child(3) .pricing-card__amount');
      p12.forEach(el => el.textContent = config.pricing.plan12m.price);
    }

    // Hydrate Pricing Plan 24 Months
    if (config.pricing.plan24m) {
      const p24 = document.querySelectorAll('.pricing-card:nth-child(4) .pricing-card__amount');
      p24.forEach(el => el.textContent = config.pricing.plan24m.price);
    }
  }

  // Expose global API
  window.DiamondCMS = {
    getConfig: getActiveConfig,
    saveConfig: function (newConfig) {
      localStorage.setItem('diamond_iptv_admin_config', JSON.stringify(newConfig));
      hydratePage();
    },
    resetConfig: function () {
      localStorage.removeItem('diamond_iptv_admin_config');
      hydratePage();
    }
  };

  document.addEventListener('DOMContentLoaded', hydratePage);
})();
