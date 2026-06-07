// Horse Haven — interactions: header state, scroll reveals, mobile nav.
(function () {
  const header = document.querySelector('.site-header');
  const hero = document.querySelector('.hero');

  // Header turns solid once past the hero (or after 80px if no hero).
  const trigger = () => (hero ? hero.offsetHeight - 90 : 80);
  const onScroll = () => {
    if (window.scrollY > trigger()) header.classList.add('solid');
    else header.classList.remove('solid');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Mobile nav toggle.
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.classList.toggle('active', open);
      toggle.setAttribute('aria-expanded', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    nav.querySelectorAll('a').forEach((a) =>
      a.addEventListener('click', () => {
        nav.classList.remove('open');
        toggle.classList.remove('active');
        document.body.style.overflow = '';
      })
    );
  }

  // Scroll reveals.
  const items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
        });
      },
      { threshold: 0.14, rootMargin: '0px 0px -8% 0px' }
    );
    items.forEach((el) => io.observe(el));
  } else {
    items.forEach((el) => el.classList.add('in'));
  }

  // Hero reveals fire immediately on load (staggered via data-delay).
  window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.hero .reveal').forEach((el) => el.classList.add('in'));
  });

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Parallax on full-bleed media (hero / page-hero / closing invite).
  if (!reduce) {
    const layers = document.querySelectorAll('.hero__media, .page-hero__media, .invite__media');
    if (layers.length) {
      let ticking = false;
      const update = () => {
        const vh = window.innerHeight;
        layers.forEach((el) => {
          const sec = el.parentElement;
          const r = sec.getBoundingClientRect();
          if (r.bottom < -200 || r.top > vh + 200) return; // offscreen, skip
          const secCenter = r.top + r.height / 2;
          const max = el.offsetHeight * 0.07;
          let offset = (secCenter - vh / 2) * -0.07;
          offset = Math.max(-max, Math.min(max, offset));
          el.style.transform = 'translate3d(0,' + offset.toFixed(1) + 'px,0)';
        });
        ticking = false;
      };
      const onParallax = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
      update();
      window.addEventListener('scroll', onParallax, { passive: true });
      window.addEventListener('resize', onParallax, { passive: true });
    }
  }

  // Count-up for stat numerals (only plain integers, optional trailing "+").
  const nums = document.querySelectorAll('.values__n');
  if (nums.length && 'IntersectionObserver' in window && !reduce) {
    const countObs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target;
        countObs.unobserve(el);
        const m = el.textContent.trim().match(/^(\d+)(\+?)$/);
        if (!m) return;
        const target = parseInt(m[1], 10);
        const suffix = m[2] || '';
        const dur = 1100;
        const start = performance.now();
        const tick = (now) => {
          const p = Math.min(1, (now - start) / dur);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(target * eased) + (p === 1 ? suffix : '');
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
    }, { threshold: 0.6 });
    nums.forEach((n) => countObs.observe(n));
  }

  // Gallery category filter.
  const filters = document.querySelector('.filters');
  if (filters) {
    const figures = document.querySelectorAll('.gallery figure');
    filters.addEventListener('click', (e) => {
      const btn = e.target.closest('button');
      if (!btn) return;
      const cat = btn.dataset.filter;
      filters.querySelectorAll('button').forEach((b) => b.classList.toggle('active', b === btn));
      figures.forEach((f) => {
        f.classList.toggle('hide', cat !== 'all' && f.dataset.cat !== cat);
      });
    });
  }
})();
