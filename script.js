const video       = document.querySelector('.hero-video');
const preloader   = document.getElementById('preloader');
const progressBar = document.getElementById('progressBar');
const progressNum = document.getElementById('progressNum');
const scrollInd   = document.getElementById('scrollIndicator');

/* ---------- Video: always playing ---------- */
function playVideo() {
  video.muted = true;
  const p = video.play();
  if (p !== undefined) {
    p.catch(() => {
      document.addEventListener('click',      () => video.play(), { once: true });
      document.addEventListener('touchstart', () => video.play(), { once: true });
    });
  }
}
playVideo();

video.addEventListener('ended', () => { video.currentTime = 0; video.play(); });
let heroVisible = true;
video.addEventListener('pause', () => { if (!document.hidden && heroVisible) video.play(); });

/* Stop decoding + blurring the video while the hero is off screen */
new IntersectionObserver((entries) => {
  heroVisible = entries[0].isIntersecting;
  if (heroVisible) video.play().catch(() => {});
  else video.pause();
}, { threshold: 0 }).observe(document.querySelector('.hero'));

/* ---------- Loading animation ---------- */
const MIN_TIME = 1800;
const MAX_TIME = 4000;
const startTime = Date.now();

let progress = 0;
let target = 0;
let videoReady = false;
let pageReady = false;
let finished = false;

// We only wait for what the first screen needs (the hero video), NOT the whole page.
// Images further down load lazily in the background.
function markVideoReady() { videoReady = true; }
video.addEventListener('canplay',     markVideoReady);
video.addEventListener('canplaythrough', markVideoReady);
video.addEventListener('error',       markVideoReady);   // never get stuck if the video fails
video.querySelectorAll('source').forEach((s) => s.addEventListener('error', markVideoReady));
video.addEventListener('loadeddata',  () => { target = Math.max(target, 60); });
if (video.readyState >= 3) markVideoReady();             // already loaded (cached) before we listened
pageReady = true;

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
  requestAnimationFrame(tick);
}

function finish() {
  finished = true;
  preloader.classList.add('done');
  setTimeout(() => {
    document.body.classList.remove('is-loading'); // page can scroll now
    document.body.classList.add('loaded');
  }, 500);
  setTimeout(() => preloader.classList.add('hidden'), 2000);
}

requestAnimationFrame(tick);

/* ---------- Scroll indicator: hide after scrolling ---------- */
function handleScroll() {
  if (window.scrollY > 80) {
    scrollInd.classList.add('hide');
  } else {
    scrollInd.classList.remove('hide');
  }
}
window.addEventListener('scroll', handleScroll, { passive: true });

/* ---------- Services tabs ---------- */
const tabs = document.querySelectorAll('.tab');

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const target = document.getElementById(tab.dataset.target);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'center' });

    tabs.forEach((t) => t.classList.remove('active'));
    tab.classList.add('active');
  });
});


/* ---------- Curve transitions (white section lifts off a dark one) ---------- */
CZ.initCurves([
  ['#services', '.about .curve', '.services-inner'],
  ['#contact',  '.whyus .curve', '.contact-inner']
]);


/* ---------- Sign up form ---------- */
const signupForm   = document.getElementById('signupForm');
const signupStatus = document.getElementById('signupStatus');

if (signupForm) {
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();   // the browser already checked the required fields

    // TODO: send the data somewhere (see notes). For now we only confirm on screen.
    const data = Object.fromEntries(new FormData(signupForm).entries());
    console.log('Sign up:', data);

    signupStatus.textContent = 'Thank you! We have received your details and will be in touch soon.';
    signupForm.reset();
  });
}
