import { Link } from 'react-router-dom';
import usePageMeta from '../hooks/usePageMeta.js';
import useBodyId from '../hooks/useBodyId.js';
import useReveal from '../hooks/useReveal.js';
import useCurves from '../hooks/useCurves.js';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import { ArrowUpRight } from '../components/Icons.jsx';

const CURVES = [
  ['#values', '.about-hero .curve', '.values-inner'],
  ['#team', '.values .curve', '.team-inner'],
];

const VALUES = [
  ['01', 'Integrity', 'We are honest and trustworthy.'],
  ['02', 'Security', 'We protect systems, data, and people.'],
  ['03', 'Innovation', 'We seek better ways to solve problems.'],
  ['04', 'Accountability', 'We own our work, decisions, and results.'],
  ['05', 'Collaboration', 'We build better solutions together.'],
  ['06', 'Excellence', 'We deliver quality, not just completion.'],
];

export default function About() {
  usePageMeta('About Us | CODE.Z', 'The CODE.Z vision, mission, core values and team.');
  useBodyId('top');
  useReveal();
  useCurves(CURVES);

  return (
    <>
      <Navbar current="about" />

      {/* ABOUT HERO: brand, vision, mission */}
      <section className="about-hero">
        <div className="about-hero-inner">

          <div className="about-brand reveal">
            <h1 className="sr-only">About CODE.Z</h1>
            <img src="/LOGO/logo.png" alt="CODEZ" />
            <p>Tech Solutions Company</p>
          </div>

          <div className="vm-grid">
            <div className="vm reveal delay-1">
              <h2 className="vm-title">Vision</h2>
              <p>
                To be the leading technology solutions company that helps
                organizations and individuals solve complex problems through
                software, cybersecurity, and innovative digital systems.
              </p>
            </div>

            <div className="vm reveal delay-2">
              <h2 className="vm-title">Mission</h2>
              <p>
                To help organizations and individuals solve real world problems by
                designing, developing, securing, and maintaining reliable
                technology solutions while creating opportunities for skilled
                technology professionals to do meaningful work.
              </p>
            </div>
          </div>

        </div>

        <div className="curve" aria-hidden="true"><span></span></div>
      </section>

      {/* CORE VALUES */}
      <section className="values" id="values">
        <div className="values-inner">
          <h2 className="section-title reveal">Core Values</h2>

          <div className="values-grid">
            {VALUES.map(([num, title, text]) => (
              <div className="value reveal" key={num}>
                <span className="value-num">{num}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="curve" aria-hidden="true"><span></span></div>
      </section>

      {/* TEAM */}
      <section className="team" id="team">
        <div className="team-inner">
          <h2 className="section-title reveal">Meet The Team</h2>
          <p className="team-sub reveal delay-1">
            Skilled people who care about doing meaningful work, and who build
            every project as if it were their own.
          </p>

          <div className="crew-grid">

  {/* Card 1: the founder (has a photo) */}
  <article className="crew-card is-lead reveal">
    <div className="crew-photo" style={{ '--tone': '#5b3ef0' }}>
<img loading="lazy" decoding="async" src="/stuff/Confident Smile in Sky Blue.png" alt="Asante Elijah Nziza, Founder and CEO" />

    </div>
    <div className="crew-info">
      <span className="crew-num">01</span>
      <div>
        <div className="crew-line"></div>
        <h3 className="crew-name">Madam Amoit Ruth</h3>
        <p className="crew-role">Manager</p>
      </div>
    </div>
  </article>

  {/* Card 2: no photo yet. To add one, replace the crew-glyph line with:
      <img src={asset('team/photo.jpg')} alt="Name" />   (put the file in the public folder) */}
  <article className="crew-card reveal delay-1">
    <div className="crew-photo" style={{ '--tone': '#e6eff0' }}>
      <img loading="lazy" decoding="async" src="/stuff/ChatGPT Image Sep 30, 2026, 02_02_31 AM.png" alt="Asante Elijah Nziza, Founder and CEO" />

    </div>
    <div className="crew-info">
      <span className="crew-num">02</span>
      <div>
        <div className="crew-line"></div>
        <h3 className="crew-name">Asante Elijah Nziza</h3>
        <p className="crew-role">Vision Bearer /UX/UI Designer</p>
      </div>
    </div>
  </article>

  <article className="crew-card reveal">
    <div className="crew-photo" style={{ '--tone': '#efe3d3' }}>
      <img loading="lazy" decoding="async" src="/stuff/" alt="Asante Elijah Nziza, Founder and CEO" />

    </div>
    <div className="crew-info">
      <span className="crew-num">03</span>
      <div>
        <div className="crew-line"></div>
        <h3 className="crew-name">Obalim Fransis</h3>
        <p className="crew-role">Head Software Engneer</p>
      </div>
    </div>
  </article>

  <article className="crew-card reveal delay-1">
    <div className="crew-photo" style={{ '--tone': '#d9d9d9' }}>

<img loading="lazy" decoding="async" src="/stuff/Smiling Woman by Modern Brick Building.png" alt="Asante Elijah Nziza, Founder and CEO" />

    </div>
    <div className="crew-info">
      <span className="crew-num">04</span>
      <div>
        <div className="crew-line"></div>
        <h3 className="crew-name">Madam Magal Patience Joan</h3>
        <p className="crew-role">Head of Finance &amp; Development</p>
      </div>
    </div>
  </article>

</div>

          <div className="team-cta reveal">
            <Link to="/#contact" className="btn-3d">
              <span>Work with us</span>
              <ArrowUpRight className="btn-arrow" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
