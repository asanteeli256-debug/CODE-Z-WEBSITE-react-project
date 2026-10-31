import { useEffect, useRef, useState } from 'react';
import Navbar from '../Navbar.jsx';

export default function Hero({ videoRef }) {
  /* Scroll indicator: hide after scrolling */
  const [hideScroll, setHideScroll] = useState(false);
  const hiddenRef = useRef(false);
  useEffect(() => {
    const onScroll = () => {
      const next = window.scrollY > 80;
      if (next === hiddenRef.current) return;
      hiddenRef.current = next;
      setHideScroll(next);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section className="hero" id="hero">

      <video className="hero-video" autoPlay muted loop playsInline preload="auto" ref={videoRef}>
        <source src="/HERO VIDEO/47d34205-9f1e-48a3-a15c-5fbe3cd47c00 (1).mp4" type="video/mp4" />
      </video>

      <div className="hero-overlay"></div>

      <Navbar current="home" intro />

      <div className="hero-center">
        <img src="/LOGO/logo.png" alt="CODEZ" className="hero-logo" />
      </div>

      <a
        href="#about"
        className={'scroll-indicator' + (hideScroll ? ' hide' : '')}
        id="scrollIndicator"
        aria-label="Scroll down"
      >
        <span className="scroll-text">Scroll</span>
        <span className="scroll-line"></span>
      </a>

    </section>
  );
}