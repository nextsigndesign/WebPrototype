// Elegan, ringan, dan fungsional
// Gabungan, perbaikan, dan penyempurnaan dari skrip yang diberikan.
// Tempelkan seluruh blok ini menggantikan skrip lama.

(() => {
  'use strict';

  // Utility: safe query
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  // Form handler (single, bersih)
  function handleForm(e) {
    e.preventDefault();
    const form = e.target;
    const name = (form.name && form.name.value || '').trim();
    const email = (form.email && form.email.value || '').trim();
    const message = (form.message && form.message.value || '').trim();

    if (!name || !email || !message) {
      // Ganti alert dengan UI inline jika diinginkan
      alert('Mohon isi semua field.');
      return false;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn ? submitBtn.textContent : 'Kirim';
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Mengirim...';
    }

    // Simulasi request; ganti dengan fetch ke endpoint produksi
    setTimeout(() => {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      }
      alert('Terima kasih! Pesan Anda telah dikirim. Kami akan menghubungi dalam 24 jam kerja.');
      form.reset();
      if (form.name) form.name.focus();
    }, 900);

    return false;
  }

  // Mailto helper
  function openMail() {
    const subject = encodeURIComponent('Permintaan Konsultasi dari Website');
    const body = encodeURIComponent('Halo, saya ingin berdiskusi mengenai pembuatan website.\n\nNama:\nPerusahaan:\nPesan:\n');
    window.location.href = `mailto:hello@domain.com?subject=${subject}&body=${body}`;
  }

  // DOM ready
  document.addEventListener('DOMContentLoaded', () => {
    // Footer year
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Mobile nav toggle (defensive)
    const navToggle = document.getElementById('nav-toggle');
    const nav = document.getElementById('nav');
    if (navToggle) {
      navToggle.addEventListener('click', () => {
        const expanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', String(!expanded));
        if (nav) nav.classList.toggle('show');
      });
    }

    // Smooth scroll for internal links
    $$('a[href^="#"]').forEach(a => {
      a.addEventListener('click', (e) => {
        const href = a.getAttribute('href');
        if (!href || href === '#') return;
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          // close mobile nav if open
          if (nav && nav.classList.contains('show')) {
            nav.classList.remove('show');
            if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
          }
        }
      });
    });

    // Attach form handler to forms with data-ajax or .contact-form
    $$('form[data-ajax], form.contact-form').forEach(f => {
      f.addEventListener('submit', handleForm);
    });

    // Fade-up simple animation for [data-animate]
    (function initDataAnimate() {
      const animated = $$('[data-animate]');
      if (!animated.length) return;
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
            entry.target.style.transition = 'opacity .6s ease, transform .6s cubic-bezier(.2,.9,.2,1)';
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.18 });

      animated.forEach((el, i) => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(18px)';
        el.style.transition = 'none';
        setTimeout(() => observer.observe(el), i * 120);
      });
    })();

    // Scroll reveal (.reveal -> .revealed)
    (function initReveal() {
      const reveals = $$('.reveal');
      if (!reveals.length) return;
      const ro = new IntersectionObserver((entries, obs) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('revealed');
            obs.unobserve(e.target);
          }
        });
      }, { threshold: 0.18 });
      reveals.forEach(el => ro.observe(el));
    })();

    // Button ripple
    (function initRipple() {
      $$('.btn').forEach(btn => {
        btn.addEventListener('click', function (e) {
          const rect = this.getBoundingClientRect();
          const ripple = document.createElement('span');
          ripple.className = 'ripple';
          const size = Math.max(rect.width, rect.height) * 1.2;
          ripple.style.width = ripple.style.height = size + 'px';
          ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
          ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
          this.appendChild(ripple);
          requestAnimationFrame(() => ripple.style.transform = 'scale(1)');
          setTimeout(() => ripple.style.opacity = '0', 400);
          setTimeout(() => ripple.remove(), 900);
        });
      });
    })();

    // Tilt effect for .tilt
    (function initTilt() {
      $$('.tilt').forEach(card => {
        const inner = card.querySelector('.tilt-inner') || card;
        card.addEventListener('pointermove', (e) => {
          const r = card.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width;
          const py = (e.clientY - r.top) / r.height;
          const rx = (py - 0.5) * 6;
          const ry = (px - 0.5) * -6;
          inner.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
        });
        card.addEventListener('pointerleave', () => inner.style.transform = 'rotateX(0) rotateY(0)');
      });
    })();

    // Parallax hero subtle movement
    (function initParallax() {
      const hero = document.querySelector('.hero-parallax');
      if (!hero) return;
      window.addEventListener('scroll', () => {
        const sc = window.scrollY;
        hero.style.backgroundPosition = `center ${Math.max(-20, -sc * 0.12)}px`;
      }, { passive: true });
    })();

    // Animated counters
    (function initCounters() {
      const counters = $$('.counter[data-target]');
      if (!counters.length) return;
      const counterObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const target = +el.dataset.target;
            const duration = 1200;
            const start = performance.now();
            requestAnimationFrame(function step(ts) {
              const progress = Math.min((ts - start) / duration, 1);
              el.textContent = Math.floor(progress * target).toLocaleString();
              if (progress < 1) requestAnimationFrame(step);
            });
            obs.unobserve(el);
          }
        });
      }, { threshold: 0.4 });
      counters.forEach(c => counterObserver.observe(c));
    })();

    // SVG draw
    (function initSvgDraw() {
      $$('.svg-draw').forEach(svg => {
        const io = new IntersectionObserver((entries, o) => {
          entries.forEach(en => {
            if (en.isIntersecting) { svg.classList.add('drawn'); o.unobserve(svg); }
          });
        }, { threshold: 0.2 });
        io.observe(svg);
      });
    })();

    // Topbar hide/show on scroll
    (function initTopbar() {
      const topbar = document.getElementById('topbar');
      if (!topbar) return;
      document.body.classList.add('has-topbar-padding');
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduce) return;

      let lastScroll = window.scrollY;
      let scrollTimer = null;
      const threshold = 8;
      const hideDelay = 60;

      function onScroll() {
        const current = window.scrollY;
        const delta = current - lastScroll;
        if (delta > threshold && current > 80) {
          topbar.classList.add('hidden');
          topbar.setAttribute('aria-hidden', 'true');
        } else if (delta < -threshold) {
          topbar.classList.remove('hidden');
          topbar.setAttribute('aria-hidden', 'false');
        }
        lastScroll = current <= 0 ? 0 : current;
      }

      window.addEventListener('scroll', () => {
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(onScroll, hideDelay);
      }, { passive: true });

      window.addEventListener('resize', () => {
        topbar.classList.remove('hidden');
        topbar.setAttribute('aria-hidden', 'false');
      });
    })();

  }); // DOMContentLoaded end

  // Expose helpers to global if needed
  window.handleForm = handleForm;
  window.openMail = openMail;

})();
