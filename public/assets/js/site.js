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

/* CONTACT MODAL: intercept any link to the contact page and open a popup instead */
(function () {
  var MODAL_HTML =
    '<div class="modal" id="contactModal" aria-hidden="true">' +
      '<div class="modal__backdrop" data-close></div>' +
      '<div class="modal__panel" role="dialog" aria-modal="true" aria-labelledby="cmTitle">' +
        '<button class="modal__close" type="button" aria-label="Close" data-close>&times;</button>' +
        '<p class="eyebrow">Get in touch</p>' +
        '<h2 id="cmTitle" style="margin:0.4rem 0 0.5rem;">Let’s connect.</h2>' +
        '<p class="modal__sub">Send us a message and we’ll be in touch — or reach us directly below.</p>' +
        '<form class="form-grid" novalidate>' +
          '<div class="field"><label for="cm-name">Full name</label><input id="cm-name" name="name" type="text" autocomplete="name" /></div>' +
          '<div class="field"><label for="cm-email">Email address</label><input id="cm-email" name="email" type="email" autocomplete="email" /></div>' +
          '<div class="field"><label for="cm-phone">Phone</label><input id="cm-phone" name="phone" type="tel" autocomplete="tel" /></div>' +
          '<div class="field"><label for="cm-interest">I’m interested in</label>' +
            '<select id="cm-interest" name="interest"><option>Riding lessons</option><option>Clubs &amp; programs</option><option>Horse camp</option><option>Training</option><option>Careers / volunteering</option><option>General inquiry</option></select></div>' +
          '<div class="field full"><label for="cm-message">How can we help?</label><textarea id="cm-message" name="message" placeholder="Tell us about the rider, their age, and experience…"></textarea></div>' +
          '<div class="field full"><button class="btn" type="submit">Send Message</button></div>' +
        '</form>' +
        '<p class="modal__direct">Prefer to call? <a href="tel:+16025359577">(602) 535-9577</a> &middot; <a href="mailto:contact@jordanstables.com">contact@jordanstables.com</a></p>' +
      '</div>' +
    '</div>';

  var holder = document.createElement('div');
  holder.innerHTML = MODAL_HTML;
  var modal = holder.firstElementChild;
  document.body.appendChild(modal);

  var lastFocus = null;
  function openModal(e) {
    if (e) e.preventDefault();
    lastFocus = document.activeElement;
    // close mobile nav if open
    var nav = document.querySelector('.nav.open');
    if (nav) { nav.classList.remove('open'); var t = document.querySelector('.nav-toggle'); if (t) t.classList.remove('active'); }
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    var first = modal.querySelector('#cm-name');
    if (first) setTimeout(function () { first.focus(); }, 60);
  }
  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  modal.addEventListener('click', function (e) { if (e.target.closest('[data-close]')) closeModal(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && modal.classList.contains('open')) closeModal(); });

  // intercept any anchor that points at the contact page (or #contact)
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a');
    if (!a) return;
    var href = a.getAttribute('href') || '';
    if (/(^|\/)contact\.html(\?.*)?(#.*)?$/.test(href) || href === '#contact') openModal(e);
  });

  // demo submit (matches the rest of the site's fake-success forms)
  var form = modal.querySelector('form');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    form.querySelectorAll('input,select,textarea,button').forEach(function (el) { el.disabled = true; });
    if (!form.querySelector('.form-note')) {
      var n = document.createElement('p');
      n.className = 'form-note';
      n.textContent = 'Thank you — we’ll be in touch soon.';
      form.appendChild(n);
    }
  });
})();
