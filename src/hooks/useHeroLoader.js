import { useEffect } from 'react';

/* =========================================================
   Home page only (was script.js):
   - keeps the hero video always playing
   - pauses it while the hero is off screen
   - drives the loading animation (progress bar + curtains)
   ========================================================= */
export default function useHeroLoader({ videoRef, preloaderRef, barRef, numRef }) {
  useEffect(() => {
    const video = videoRef.current;
    const preloader = preloaderRef.current;
    const progressBar = barRef.current;
    const progressNum = numRef.current;
    if (!video || !preloader || !progressBar || !progressNum) return undefined;

    const undo = []; // everything we must clean up when the page is left
    const on = (target, type, fn, opts) => {
      target.addEventListener(type, fn, opts);
      undo.push(() => target.removeEventListener(type, fn, opts));
    };
    const safePlay = () => {
      const p = video.play();
      if (p !== undefined) p.catch(() => {});
    };

    /* ---------- Video: always playing ---------- */
    video.muted = true;
    const first = video.play();
    if (first !== undefined) {
      first.catch(() => {
        // autoplay blocked: start on the first tap / click
        on(document, 'click', safePlay, { once: true });
        on(document, 'touchstart', safePlay, { once: true });
      });
    }

    on(video, 'ended', () => {
      video.currentTime = 0;
      safePlay();
    });

    let heroVisible = true;
    on(video, 'pause', () => {
      if (!document.hidden && heroVisible) safePlay();
    });

    /* Stop decoding + blurring the video while the hero is off screen */
    const hero = video.closest('.hero');
    if (hero) {
      const io = new IntersectionObserver(
        (entries) => {
          heroVisible = entries[0].isIntersecting;
          if (heroVisible) safePlay();
          else video.pause();
        },
        { threshold: 0 }
      );
      io.observe(hero);
      undo.push(() => io.disconnect());
    }

    /* ---------- Loading animation ---------- */
    const MIN_TIME = 1800;
    const MAX_TIME = 4000;
    const startTime = Date.now();

    let progress = 0;
    let target = 0;
    let videoReady = false;
    const pageReady = true;
    let finished = false;
    let rafId = 0;
    const timers = [];

    // We only wait for what the first screen needs (the hero video), NOT the whole page.
    // Images further down load lazily in the background.
    const markVideoReady = () => {
      videoReady = true;
    };
    on(video, 'canplay', markVideoReady);
    on(video, 'canplaythrough', markVideoReady);
    on(video, 'error', markVideoReady); // never get stuck if the video fails
    video.querySelectorAll('source').forEach((s) => on(s, 'error', markVideoReady));
    on(video, 'loadeddata', () => {
      target = Math.max(target, 60);
    });
    if (video.readyState >= 3) markVideoReady(); // already loaded (cached) before we listened

    function finish() {
      finished = true;
      preloader.classList.add('done');
      timers.push(
        setTimeout(() => {
          document.body.classList.remove('is-loading'); // page can scroll now
          document.body.classList.add('loaded');
        }, 500)
      );
      timers.push(setTimeout(() => preloader.classList.add('hidden'), 2000));
    }

    function tick() {
      if (finished) return;

      const elapsed = Date.now() - startTime;
      const timeProgress = Math.min((elapsed / MIN_TIME) * 100, 100);

      const ready = (videoReady && pageReady) || elapsed > MAX_TIME;
      const cap = ready ? 100 : 90;

      target = Math.min(Math.max(timeProgress, target), cap);

      progress += (target - progress) * 0.12;
      if (target - progress < 0.4) progress = target;

      const value = Math.round(progress);
      progressBar.style.width = value + '%';
      progressNum.textContent = value;

      if (value >= 100 && elapsed >= MIN_TIME) {
        finish();
        return;
      }
      rafId = requestAnimationFrame(tick);
    }
    rafId = requestAnimationFrame(tick);

    return () => {
      finished = true;
      cancelAnimationFrame(rafId);
      timers.forEach(clearTimeout);
      undo.forEach((fn) => fn());
    };
  }, [videoRef, preloaderRef, barRef, numRef]);
}
