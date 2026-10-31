import { useLayoutEffect, useRef } from 'react';
import usePageMeta from '../hooks/usePageMeta.js';
import useReveal from '../hooks/useReveal.js';
import useCurves from '../hooks/useCurves.js';
import useHeroLoader from '../hooks/useHeroLoader.js';
import Preloader from '../components/home/Preloader.jsx';
import Hero from '../components/home/Hero.jsx';
import AboutSection from '../components/home/AboutSection.jsx';
import ServicesSection from '../components/home/ServicesSection.jsx';
import IdeasSection from '../components/home/IdeasSection.jsx';
import WhyUsSection from '../components/home/WhyUsSection.jsx';
import ContactSection from '../components/home/ContactSection.jsx';
import Footer from '../components/Footer.jsx';

/* Curve transitions (white section lifts off a dark one) */
const CURVES = [
  ['#services', '.about .curve', '.services-inner'],
  ['#contact', '.whyus .curve', '.contact-inner'],
];

export default function Home() {
  const videoRef = useRef(null);
  const preloaderRef = useRef(null);
  const barRef = useRef(null);
  const numRef = useRef(null);

  usePageMeta('CODE.Z');

  /* The page can't scroll while loading (was <body class="is-loading">) */
  useLayoutEffect(() => {
    document.body.classList.add('is-loading');
    return () => document.body.classList.remove('is-loading', 'loaded');
  }, []);

  useHeroLoader({ videoRef, preloaderRef, barRef, numRef });
  useReveal();
  useCurves(CURVES);

  return (
    <>
      <Preloader preloaderRef={preloaderRef} barRef={barRef} numRef={numRef} />
      <Hero videoRef={videoRef} />
      <AboutSection />
      <ServicesSection />
      <IdeasSection />
      <WhyUsSection />
      <ContactSection />
      <Footer home />
    </>
  );
}
