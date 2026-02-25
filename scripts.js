// Elegan, ringan, dan fungsional
document.addEventListener('DOMContentLoaded', () => {
  // Footer year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav toggle
  const navToggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('nav');
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('show');
  });

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({behavior: 'smooth', block: 'start'});
        // close mobile nav if open
        if (nav.classList.contains('show')) {
          nav.classList.remove('show');
          navToggle.setAttribute('aria-expanded', 'false');
        }
      }
    });
  });
});

// Form handler: demo with fetch placeholder
function handleForm(e) {
  e.preventDefault();
  const form = e.target;
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();
  if (!name || !email || !message) {
    alert('Mohon isi semua field.');
    return false;
  }}

  // Visual feedback
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  submitBtn.disabled = true;
  submitBtn.textContent = 'Mengirim...';

  // Demo: simulate network request
  setTimeout(() => {
    alert('Terima kasih! Pesan Anda telah dikirim.');
    form.reset();
    submitBtn.disabled = false;
    submitBtn.textContent = originalText;
  }, 900);
  // buka email default dengan subject dan body template
function openMail() {
  const subject = encodeURIComponent('Permintaan Konsultasi dari Website');
  const body = encodeURIComponent('Halo, saya ingin berdiskusi mengenai pembuatan website.\n\nNama:\nPerusahaan:\nPesan:\n');
  window.location.href = `mailto:hello@domain.com?subject=${subject}&body=${body}`;
}

// form handler dengan validasi ringan dan feedback inline
function handleForm(e) {
  e.preventDefault();
  const form = e.target;
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();

  if (!name || !email || !message) {
    alert('Mohon isi semua field.');
    return false;
  }

  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  submitBtn.disabled = true;
  submitBtn.textContent = 'Mengirim...';

  // simulasi request; ganti dengan fetch ke endpoint produksi
  setTimeout(() => {
    // sukses
    submitBtn.disabled = false;
    submitBtn.textContent = originalText;
    alert('Terima kasih! Pesan Anda telah dikirim. Kami akan menghubungi dalam 24 jam kerja.');
    form.reset();
    form.name.focus();
  }, 900);

  return false;
}
// Animasi sederhana: fade-up saat elemen muncul di viewport
(function () {
  const animated = document.querySelectorAll('[data-animate]');
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
    // staggered reveal
    setTimeout(() => observer.observe(el), i * 120);
  });
})();
document.addEventListener('DOMContentLoaded', () => {
  // 1. Scroll reveal using IntersectionObserver
  const reveals = document.querySelectorAll('.reveal');
  const ro = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('revealed');
        obs.unobserve(e.target);
      }
    });
  }, {threshold: 0.18});
  reveals.forEach(el => ro.observe(el));

  // 2. Button ripple
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      const size = Math.max(rect.width, rect.height) * 1.2;
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size/2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size/2) + 'px';
      this.appendChild(ripple);
      requestAnimationFrame(()=> ripple.style.transform = 'scale(1)');
      setTimeout(()=> ripple.style.opacity = '0', 400);
      setTimeout(()=> ripple.remove(), 900);
    });
  });

  // 3. Tilt effect for cards on pointer move
  document.querySelectorAll('.tilt').forEach(card => {
    const inner = card.querySelector('.tilt-inner') || card;
    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      const rx = (py - 0.5) * 6; // tilt strength
      const ry = (px - 0.5) * -6;
      inner.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
    });
    card.addEventListener('pointerleave', () => inner.style.transform = 'rotateX(0) rotateY(0)');
  });

  // 4. Parallax hero subtle movement on scroll
  const hero = document.querySelector('.hero-parallax');
  if (hero) {
    window.addEventListener('scroll', () => {
      const sc = window.scrollY;
      hero.style.backgroundPosition = `center ${Math.max(-20, -sc * 0.12)}px`;
    }, {passive:true});
  }

  // 5. Animated counters
  const counters = document.querySelectorAll('.counter[data-target]');
  const counterObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = +el.dataset.target;
        const duration = 1200;
        const start = performance.now();
        requestAnimationFrame(function step(ts){
          const progress = Math.min((ts - start) / duration, 1);
          el.textContent = Math.floor(progress * target).toLocaleString();
          if (progress < 1) requestAnimationFrame(step);
        });
        obs.unobserve(el);
      }
    });
  }, {threshold:0.4});
  counters.forEach(c => counterObserver.observe(c));

  // 6. SVG draw when visible
  document.querySelectorAll('.svg-draw').forEach(svg => {
    const io = new IntersectionObserver((entries, o) => {
      entries.forEach(en => {
        if (en.isIntersecting) { svg.classList.add('drawn'); o.unobserve(svg); }
      });
    }, {threshold:0.2});
    io.observe(svg);
  });
  
});
document.addEventListener('DOMContentLoaded', () => {
  const topbar = document.getElementById('topbar');
  if (!topbar) return;

  // beri padding pada body agar konten tidak tertutup
  document.body.classList.add('has-topbar-padding');

  // respect reduced motion
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) return;

  let lastScroll = window.scrollY;
  let ticking = false;
  const threshold = 8; // minimal pergerakan untuk trigger
  const hideDelay = 60; // ms debounce kecil

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const current = window.scrollY;
      const delta = current - lastScroll;

      // jika scroll ke bawah dan melewati threshold -> sembunyikan
      if (delta > threshold && current > 80) {
        topbar.classList.add('hidden');
        topbar.setAttribute('aria-hidden', 'true');
      }
      // jika scroll ke atas -> tampilkan
      else if (delta < -threshold) {
        topbar.classList.remove('hidden');
        topbar.setAttribute('aria-hidden', 'false');
      }

      lastScroll = current <= 0 ? 0 : current;
      ticking = false;
    });
  }

  // tambahkan sedikit debounce untuk stabilitas pada mobile
  let scrollTimer = null;
  window.addEventListener('scroll', () => {
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(onScroll, hideDelay);
  }, { passive: true });

  // juga tangani resize (mis. perubahan layout)
  window.addEventListener('resize', () => {
    // pastikan topbar terlihat saat ukuran berubah
    topbar.classList.remove('hidden');
    topbar.setAttribute('aria-hidden', 'false');
  });
});