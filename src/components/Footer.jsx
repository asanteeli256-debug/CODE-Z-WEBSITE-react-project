import { Link } from 'react-router-dom';
import { ArrowUp } from './Icons.jsx';

/* home: on the home page the logo and "Back to top" go to the hero section;
   on the other pages they go to the top of the page / home */
export default function Footer({ home = false }) {
  const topHref = home ? '#hero' : '#top';

  return (
    <footer className="footer">
      <div className="footer-inner">

        <div className="footer-top">

          <div className="footer-brand reveal">
            {home ? (
              <a href="#hero" className="footer-logo" aria-label="CODEZ, back to top">
                <img loading="lazy" decoding="async" src="/LOGO/logo.png" alt="CODEZ" />
              </a>
            ) : (
              <Link to="/" className="footer-logo" aria-label="CODEZ home">
                <img loading="lazy" decoding="async" src="/LOGO/logo.png" alt="CODEZ" />
              </Link>
            )}
            <p className="footer-tagline">
              Building reliable, secure and scalable technology that turns your ideas into lasting value.
            </p>
          </div>

          <nav className="footer-col reveal delay-1" aria-label="Footer navigation">
            <h3>Menu</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/projects">Projects</Link></li>
              <li><Link to="/#why-us">Why Us</Link></li>
              <li><Link to="/#contact">Work With Us</Link></li>
            </ul>
          </nav>

          <div className="footer-col reveal delay-2">
            <h3>Services</h3>
            <ul>
              <li><Link to="/services#web-development">Web development</Link></li>
              <li><Link to="/services#cyber-security">Cyber security</Link></li>
              <li><Link to="/services#app-development">App development</Link></li>
              <li><Link to="/services#data-automation">Data &amp; Automation</Link></li>
            </ul>
          </div>

          <div className="footer-col reveal delay-3">
            <h3>Contact</h3>
            <ul>
              {/* TODO: replace with your real email, phone and social links */}
              <li><a href="mailto:helloocodez@gmail.com">helloocodez@gmail.com</a></li>
              <li><a href="tel:+256747223376">+256 747223376</a></li>
              <li className="footer-social">
                <a href="#" aria-label="LinkedIn">LinkedIn</a>
                <a href="#" aria-label="Instagram">Instagram</a>
                <a href="#" aria-label="X">X</a>
                <a href="#" aria-label="GitHub">GitHub</a>
              </li>
            </ul>
          </div>

        </div>

        <div className="footer-bottom">
          <p>&copy; <span id="year">{new Date().getFullYear()}</span> CODE.Z. All rights reserved.</p>
          <a href={topHref} className="btn-3d footer-top-btn">
            <span>Back to top</span>
            <ArrowUp className="btn-arrow" aria-hidden="true" />
          </a>
        </div>

      </div>
    </footer>
  );
}
