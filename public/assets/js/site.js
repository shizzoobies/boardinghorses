// Jordan Stables — interactions
(function () {
  // Mobile nav
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.classList.toggle('active', open);
      toggle.setAttribute('aria-expanded', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    nav.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => {
      nav.classList.remove('open'); toggle.classList.remove('active'); document.body.style.overflow = '';
    }));
  }

  // Scroll reveals
  const items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }), { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    items.forEach((el) => io.observe(el));
  } else { items.forEach((el) => el.classList.add('in')); }

  // Gallery filter
  const filters = document.querySelector('.filters');
  if (filters) {
    const figs = document.querySelectorAll('.gallery figure');
    filters.addEventListener('click', (e) => {
      const b = e.target.closest('button'); if (!b) return;
      const c = b.dataset.filter;
      filters.querySelectorAll('button').forEach((x) => x.classList.toggle('active', x === b));
      figs.forEach((f) => f.classList.toggle('hide', c !== 'all' && f.dataset.cat !== c));
    });
  }

  // Lightbox
  const gallery = document.querySelector('.gallery');
  if (gallery) {
    const box = document.createElement('div');
    box.className = 'lightbox';
    box.innerHTML = '<button class="lightbox__close" aria-label="Close">&times;</button><img alt="">';
    document.body.appendChild(box);
    const big = box.querySelector('img');
    const close = () => { box.classList.remove('open'); document.body.style.overflow = ''; };
    gallery.addEventListener('click', (e) => {
      const img = e.target.closest('figure')?.querySelector('img'); if (!img) return;
      big.src = img.src; big.alt = img.alt; box.classList.add('open'); document.body.style.overflow = 'hidden';
    });
    box.addEventListener('click', (e) => { if (e.target === box || e.target.closest('.lightbox__close')) close(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
  }

  // Fake-success forms (demo)
  document.querySelectorAll('form[data-demo]').forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      form.querySelectorAll('input,select,textarea,button').forEach((el) => (el.disabled = true));
      if (!form.querySelector('.form-note')) {
        const n = document.createElement('p');
        n.className = 'form-note';
        n.textContent = form.dataset.demo === 'newsletter' ? 'You’re on the list — see you at the barn!' : 'Thank you — we’ll be in touch soon.';
        form.appendChild(n);
      }
    });
  });
})();

/* hero video: respect reduced-motion */
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.hero__media video').forEach((v) => { v.removeAttribute('autoplay'); v.pause(); });
  }
})();

/* HOME: transparent->solid header on scroll + freeze hero video off-top */
(function () {
  if (!document.body.classList.contains('home')) return;
  const header = document.querySelector('.site-header');
  const video = document.querySelector('.hero__media video');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const onScroll = () => {
    const y = window.scrollY || window.pageYOffset;
    if (header) header.classList.toggle('solid', y > 40);
    if (video && !reduce) {
      if (y <= 12) { if (video.paused) video.play().catch(() => {}); }
      else if (!video.paused) { video.pause(); }
    }
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
})();
