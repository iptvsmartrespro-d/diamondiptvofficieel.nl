/* ============================================
   DIAMOND IPTV — Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  /* ── Mobile Navigation ─────────────────── */
  const navToggle = document.getElementById('nav-toggle');
  const mainNav = document.getElementById('main-nav');
  const header = document.getElementById('header');
  const mobileOverlay = document.getElementById('mobile-overlay');

  function closeNav() {
    if (navToggle) navToggle.classList.remove('active');
    if (mainNav) mainNav.classList.remove('active');
    if (mobileOverlay) mobileOverlay.classList.remove('active');
    document.body.classList.remove('nav-open');
  }

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      const isOpen = navToggle.classList.contains('active');
      if (isOpen) {
        closeNav();
      } else {
        navToggle.classList.add('active');
        mainNav.classList.add('active');
        if (mobileOverlay) mobileOverlay.classList.add('active');
        document.body.classList.add('nav-open');
      }
    });
  }

  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', closeNav);
  }

  // Close nav on link click (mobile)
  document.querySelectorAll('.header__link').forEach(link => {
    link.addEventListener('click', closeNav);
  });

  /* ── Sticky Header ─────────────────────── */
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        if (window.pageYOffset > 50) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
        ticking = false;
      });
      ticking = true;
    }
  });

  /* ── Scroll Reveal Animations ──────────── */
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    revealElements.forEach(el => revealObserver.observe(el));
  }

  /* ── Counter Animation ─────────────────── */
  const counters = document.querySelectorAll('[data-count]');

  if (counters.length > 0) {
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseFloat(el.dataset.count);
            const suffix = el.dataset.suffix || '';
            const prefix = el.dataset.prefix || '';
            const decimals = el.dataset.decimals ? parseInt(el.dataset.decimals) : 0;
            const duration = 2000;
            const startTime = performance.now();

            function easeOutQuart(t) {
              return 1 - Math.pow(1 - t, 4);
            }

            function animate(currentTime) {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const easedProgress = easeOutQuart(progress);
              const current = easedProgress * target;

              if (decimals > 0) {
                el.textContent = prefix + current.toFixed(decimals).replace('.', ',') + suffix;
              } else {
                el.textContent = prefix + Math.floor(current).toLocaleString('nl-NL') + suffix;
              }

              if (progress < 1) {
                requestAnimationFrame(animate);
              }
            }

            requestAnimationFrame(animate);
            counterObserver.unobserve(el);
          }
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach(el => counterObserver.observe(el));
  }

  /* ── FAQ Accordion ─────────────────────── */
  document.querySelectorAll('.faq__question').forEach(question => {
    question.addEventListener('click', () => {
      const item = question.closest('.faq__item');
      const isOpen = item.classList.contains('active');

      // Close all items in the same FAQ container
      const container = item.closest('.faq');
      if (container) {
        container.querySelectorAll('.faq__item').forEach(i => {
          i.classList.remove('active');
        });
      }

      // Toggle clicked item
      if (!isOpen) {
        item.classList.add('active');
      }
    });
  });

  /* ── Active Nav Link ───────────────────── */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.header__link').forEach(link => {
    const href = link.getAttribute('href');
    link.classList.remove('active');
    if (
      href === currentPage ||
      (currentPage === '' && href === 'index.html') ||
      (currentPage === '/' && href === 'index.html')
    ) {
      link.classList.add('active');
    }
  });

  /* ── Smooth Scroll for Anchor Links ────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        closeNav();
      }
    });
  });

  /* ── Parallax-lite for hero backgrounds ── */
  const parallaxElements = document.querySelectorAll('[data-parallax]');
  if (parallaxElements.length > 0) {
    window.addEventListener('scroll', () => {
      const scrollY = window.pageYOffset;
      parallaxElements.forEach(el => {
        const speed = parseFloat(el.dataset.parallax) || 0.3;
        el.style.transform = `translateY(${scrollY * speed}px)`;
      });
    });
  }
});
