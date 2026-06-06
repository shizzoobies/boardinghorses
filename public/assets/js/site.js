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
