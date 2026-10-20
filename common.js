/* =========================================================
   Shared by every page: navbar, scroll reveal, curve
   transitions, footer year.
   ========================================================= */
(function () {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Navbar ---------- */
  const navbar = document.getElementById('navbar');
  const toggle = document.getElementById('navToggle');
  const links  = document.getElementById('navLinks');

  if (navbar) {
    const onScroll = () => navbar.classList.toggle('is-solid', window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  if (navbar && toggle && links) {
    const setOpen = (open) => {
      navbar.classList.toggle('nav-open', open);
      document.body.classList.toggle('nav-lock', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    };
    toggle.addEventListener('click', () => setOpen(!navbar.classList.contains('nav-open')));
    links.addEventListener('click', (e) => { if (e.target.closest('a')) setOpen(false); });
    window.addEventListener('keydown', (e) => { if (e.key === 'Escape') setOpen(false); });
    window.matchMedia('(min-width: 801px)').addEventListener('change', (e) => { if (e.matches) setOpen(false); });
  }

  /* ---------- Reveal elements when they enter the screen ---------- */
  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealItems.forEach((el) => observer.observe(el));
  } else {
    revealItems.forEach((el) => el.classList.add('in-view'));
  }

  /* ---------- Curve transition: a section lifts off the one underneath ----------
     next  = the section underneath (its content drifts down into place)
     curve = the arch at the bottom of the section on top
     inner = the content wrapper inside the section underneath            */
  function makeCurve(nextSelector, curveSelector, innerSelector) {
    const next  = document.querySelector(nextSelector);
    const curve = document.querySelector(curveSelector);
    const inner = document.querySelector(innerSelector);
    if (!next || !curve || !inner) return null;

    let maxCurve = 0, maxShift = 0, lastP = -1, shift = 0;

    function measure() {
      maxCurve = Math.min(window.innerWidth * 0.08, 130);   // how deep the curve is (px)
      maxShift = Math.min(window.innerHeight * 0.3, 260);   // how far the content starts "under" the top section (px)
      curve.style.setProperty('--curve-max', maxCurve + 'px');
      lastP = -1;
    }

    function update() {
      const vh  = window.innerHeight;
      const top = next.getBoundingClientRect().top;

      // 0 = the section underneath just entering at the bottom of the screen
      // 1 = it reached the top, the curve is completely flat
      let p = (1 - top / vh) * 1.15;
      p = Math.min(Math.max(p, 0), 1);
      if (reduceMotion) p = 1;

      if (Math.abs(p - lastP) < 0.002) return;   // nothing changed, do no work
      lastP = p;
      shift = -(1 - p) * maxShift;

      curve.style.transform = 'scaleY(' + (1 - p).toFixed(4) + ')';
      inner.style.transform = 'translate3d(0,' + shift.toFixed(1) + 'px,0)';
    }

    measure();
    update();
    return { measure, update, inner, getShift: () => shift };
  }

  function initCurves(defs) {
    const curves = defs.map((d) => makeCurve(d[0], d[1], d[2])).filter(Boolean);
    if (!curves.length) return;

    let ticking = false;
    const run = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => { curves.forEach((c) => c.update()); ticking = false; });
    };
    window.addEventListener('scroll', run, { passive: true });
    window.addEventListener('resize', () => { curves.forEach((c) => c.measure()); run(); });

    /* Anchor jumps: the content under an arch is shifted while it slides in, so we
       aim at where the element will REALLY be once the transition has finished. */
    function scrollToEl(el, behavior) {
      let ty = 0;
      curves.forEach((c) => { if (c.inner.contains(el)) ty = c.getShift(); });
      const margin = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
      const y = el.getBoundingClientRect().top + window.scrollY - ty - margin;
      window.scrollTo({ top: y, behavior: behavior });
    }

    document.addEventListener('click', (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = decodeURIComponent(a.getAttribute('href').slice(1));
      const el = id && document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      scrollToEl(el, reduceMotion ? 'auto' : 'smooth');
      history.replaceState(null, '', '#' + id);
    });

    // Arriving from another page with #something in the address
    window.addEventListener('load', () => {
      if (!location.hash) return;
      const el = document.getElementById(decodeURIComponent(location.hash.slice(1)));
      if (!el) return;
      curves.forEach((c) => c.update());
      scrollToEl(el, 'instant');
      curves.forEach((c) => c.update());
    });
  }

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  window.CZ = { initCurves };
})();
