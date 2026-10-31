import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/* =========================================================
   Curve transition: a section lifts off the one underneath
   (was CZ.initCurves in common.js — same maths, same numbers)

   Each definition is [nextSelector, curveSelector, innerSelector]
     next  = the section underneath (its content drifts down into place)
     curve = the arch at the bottom of the section on top
     inner = the content wrapper inside the section underneath
   ========================================================= */

function makeCurve([nextSelector, curveSelector, innerSelector], reduceMotion) {
  const next = document.querySelector(nextSelector);
  const curve = document.querySelector(curveSelector);
  const inner = document.querySelector(innerSelector);
  if (!next || !curve || !inner) return null;

  let maxCurve = 0;
  let maxShift = 0;
  let lastP = -1;
  let shift = 0;
  let nextP = 0;

  function measure() {
    maxCurve = Math.min(window.innerWidth * 0.08, 130); // how deep the curve is (px)
    maxShift = Math.min(window.innerHeight * 0.3, 260); // how far the content starts "under" the top section (px)
    curve.style.setProperty('--curve-max', maxCurve + 'px');
    lastP = -1;
  }

  // Reading layout and writing styles in separate steps stops the browser
  // from recalculating the page twice per frame when there are several curves.
  function read() {
    const vh = window.innerHeight;
    const top = next.getBoundingClientRect().top;

    // 0 = the section underneath just entering at the bottom of the screen
    // 1 = it reached the top, the curve is completely flat
    let p = (1 - top / vh) * 1.15;
    p = Math.min(Math.max(p, 0), 1);
    if (reduceMotion) p = 1;
    nextP = p;
  }

  function write() {
    const p = nextP;
    if (Math.abs(p - lastP) < 0.002) return; // nothing changed, do no work
    lastP = p;
    shift = -(1 - p) * maxShift;

    curve.style.transform = 'scaleY(' + (1 - p).toFixed(4) + ')';
    inner.style.transform = 'translate3d(0,' + shift.toFixed(1) + 'px,0)';
  }

  function update() {
    read();
    write();
  }

  measure();
  update();
  return { measure, read, write, update, inner, getShift: () => shift };
}

export default function useCurves(defs) {
  const location = useLocation();
  const apiRef = useRef(null);
  const lastKey = useRef(null);

  /* ---- set up the curves, the anchor-click handler and the listeners ---- */
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const curves = defs.map((d) => makeCurve(d, reduceMotion)).filter(Boolean);
    if (!curves.length) return undefined;

    let ticking = false;
    let rafId = 0;
    const run = () => {
      if (ticking) return;
      ticking = true;
      rafId = requestAnimationFrame(() => {
        curves.forEach((c) => c.read());
        curves.forEach((c) => c.write());
        ticking = false;
      });
    };
    const onResize = () => {
      curves.forEach((c) => c.measure());
      run();
    };
    window.addEventListener('scroll', run, { passive: true });
    window.addEventListener('resize', onResize);
    window.addEventListener('load', run);

    // Images and fonts finishing loading change the height of the page. Re-check the
    // curves when that happens, so they start in the right place even if the visitor
    // hasn't scrolled yet (the original page only ever measured once, at start-up).
    let resizeObserver = null;
    if ('ResizeObserver' in window) {
      resizeObserver = new ResizeObserver(run);
      resizeObserver.observe(document.body);
    }

    /* Anchor jumps: the content under an arch is shifted while it slides in, so we
       aim at where the element will REALLY be once the transition has finished. */
    function scrollToEl(el, behavior) {
      let ty = 0;
      curves.forEach((c) => {
        if (c.inner.contains(el)) ty = c.getShift();
      });
      const margin = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
      const y = el.getBoundingClientRect().top + window.scrollY - ty - margin;
      window.scrollTo({ top: y, behavior });
    }

    const onClick = (e) => {
      const a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = decodeURIComponent(a.getAttribute('href').slice(1));
      const el = id && document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      scrollToEl(el, reduceMotion ? 'auto' : 'smooth');
      window.history.replaceState(window.history.state, '', '#' + id);
    };
    document.addEventListener('click', onClick);

    apiRef.current = {
      // Smooth scroll (same page, e.g. clicking "Contact" while already on the home page)
      smoothTo(id) {
        const el = document.getElementById(id);
        if (el) scrollToEl(el, reduceMotion ? 'auto' : 'smooth');
      },
      // Instant jump (arriving from another page with #something in the address)
      jumpTo(id) {
        const el = document.getElementById(id);
        if (!el) return;
        curves.forEach((c) => c.update());
        scrollToEl(el, 'instant');
        curves.forEach((c) => c.update());
      },
    };

    return () => {
      window.removeEventListener('scroll', run);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('load', run);
      if (resizeObserver) resizeObserver.disconnect();
      document.removeEventListener('click', onClick);
      cancelAnimationFrame(rafId);
      apiRef.current = null;
    };
  }, [defs]);

  /* ---- #hash in the address: on arrival, and on every later navigation ---- */
  useEffect(() => {
    const api = apiRef.current;
    const { hash, key } = location;

    // "fresh" = this page was just opened (a repeated key only happens when React
    // re-runs effects in dev mode); otherwise the person clicked a link on this same page
    const fresh = lastKey.current === null || lastKey.current === key;
    lastKey.current = key;

    if (!api || !hash) return undefined;
    const id = decodeURIComponent(hash.slice(1));

    if (!fresh) {
      api.smoothTo(id);
      return undefined;
    }

    // Jump now, then once more when fonts / the page have finished loading,
    // because late layout shifts would otherwise leave us a little off target.
    const t0 = performance.now();
    let cancelled = false;
    const again = () => {
      if (!cancelled && performance.now() - t0 < 2500) api.jumpTo(id);
    };
    api.jumpTo(id);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(again);
    if (document.readyState !== 'complete') window.addEventListener('load', again, { once: true });

    return () => {
      cancelled = true;
      window.removeEventListener('load', again);
    };
  }, [location]);
}