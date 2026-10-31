import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

/* current: 'home' | 'about' | 'services'  (which link gets aria-current="page")
   intro:   true on the home page, where the navbar fades in after the preloader */
export default function Navbar({ current, intro = false }) {
  const [solid, setSolid] = useState(false);
  const [past, setPast] = useState(false);   // scrolled beyond the hero section
  const [open, setOpen] = useState(false);
  const [fade, setFade] = useState(false);   // lets the full-screen menu fade (set only after a click)

  const solidRef = useRef(false);
  const pastRef = useRef(false);
  const heroRef = useRef(null);

  /* Solid background after a little scrolling; "past" once the hero section is gone */
  useEffect(() => {
    const onScroll = () => {
      const nextSolid = window.scrollY > 60;
      if (nextSolid !== solidRef.current) {
        solidRef.current = nextSolid;
        setSolid(nextSolid);
      }

      if (!heroRef.current || !heroRef.current.isConnected) {
        heroRef.current = document.querySelector('.hero, .about-hero, .page-hero');
      }
      const nextPast = heroRef.current
        ? heroRef.current.getBoundingClientRect().bottom < 90
        : window.scrollY > window.innerHeight;
      if (nextPast !== pastRef.current) {
        pastRef.current = nextPast;
        setPast(nextPast);
        setFade(false); // no fading overlay while the bar swaps into the hamburger
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Menu open: lock page scroll (and keep the layout from jumping when the scrollbar vanishes) */
  useEffect(() => {
    const root = document.documentElement;
    if (open) {
      root.style.setProperty('--sbw', window.innerWidth - root.clientWidth + 'px');
    }
    document.body.classList.toggle('nav-lock', open);
    return () => {
      document.body.classList.remove('nav-lock');
      root.style.removeProperty('--sbw');
    };
  }, [open]);

  /* Escape closes the menu; so does resizing between phone and desktop layouts */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    const mq = window.matchMedia('(min-width: 801px)');
    const onMq = () => setOpen(false);
    window.addEventListener('keydown', onKey);
    mq.addEventListener('change', onMq);
    return () => {
      window.removeEventListener('keydown', onKey);
      mq.removeEventListener('change', onMq);
    };
  }, []);

  const aria = (name) => (current === name ? 'page' : undefined);
  const className =
    'navbar' +
    (intro ? ' navbar-intro' : '') +
    (solid ? ' is-solid' : '') +
    (past ? ' is-past' : '') +
    (open ? ' nav-open' : '') +
    (fade ? ' nav-fade' : '');

  return (
    <header className={className} id="navbar">
      <Link to="/" className="nav-logo" aria-label="CODEZ home">
        <img src="/LOGO/logo.png" alt="CODEZ" />
      </Link>

      <nav
        className="nav-links"
        id="navLinks"
        aria-label="Main"
        onClick={(e) => {
          if (e.target.closest('a')) {
            setFade(true);
            setOpen(false);
          }
        }}
      >
        <Link to="/" aria-current={aria('home')}>Home</Link>
        <Link to="/about" aria-current={aria('about')}>About</Link>
        <Link to="/services" aria-current={aria('services')}>Services</Link>
        <Link to="/projects" aria-current={aria('projects')}>Projects</Link>
        <Link to="/#contact">Contact</Link>
      </nav>

      <button
        className="nav-toggle"
        id="navToggle"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        aria-controls="navLinks"
        onClick={() => {
          setFade(true);
          setOpen((o) => !o);
        }}
      >
        <span></span><span></span><span></span>
      </button>
    </header>
  );
}