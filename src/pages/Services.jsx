import { Link } from 'react-router-dom';
import usePageMeta from '../hooks/usePageMeta.js';
import useBodyId from '../hooks/useBodyId.js';
import useReveal from '../hooks/useReveal.js';
import useCurves from '../hooks/useCurves.js';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import { ArrowDown, ArrowUpRight } from '../components/Icons.jsx';

const CURVES = [['#svc-list', '.page-hero .curve', '.svc-list-inner']];

const SERVICES = [
  {
    id: 'web-development',
    num: '01',
    title: <>Web development</>,
    img: 'IMG_9851.JPG',
    alt: 'Hands drawing on a computer screen',
    lead: 'Fast, clean websites and web platforms built around your business.',
    text: 'We design and build websites that load quickly, look sharp on every screen and are easy for your team to update. From a simple company site to a full online platform, we build it to last.',
    points: [
      'Company and portfolio websites',
      'Online shops and booking platforms',
      'Web apps, portals and dashboards',
      'Speed, SEO and accessibility',
      'Hosting, maintenance and support',
    ],
  },
  {
    id: 'cyber-security',
    num: '02',
    title: <>Cyber security</>,
    img: 'IMG_9855.JPG',
    alt: 'Magnifying glass checking for errors',
    lead: 'We protect your systems, your data and your people.',
    text: 'Security is built in from the first line, not added at the end. We find the weak points before attackers do, then help you fix them and stay protected.',
    points: [
      'Security assessments and vulnerability testing',
      'Secure system design and hardening',
      'Network and cloud security',
      'Staff awareness and training',
      'Monitoring and incident response',
    ],
  },
  {
    id: 'app-development',
    num: '03',
    title: <>App development</>,
    img: 'IMG_9849.JPG',
    alt: 'Hands typing on a keyboard',
    lead: 'Mobile and desktop apps people actually enjoy using.',
    text: 'We turn an idea into a working app, with simple design, solid code and a smooth launch. We keep improving it with you after it goes live.',
    points: [
      'Android and iOS apps',
      'Cross-platform apps from one codebase',
      'UI and UX design',
      'Backend and API integration',
      'Launch, updates and support',
    ],
  },
  {
    id: 'data-automation',
    num: '04',
    title: <>Data &amp; Automation</>,
    img: 'IMG_9852.JPG',
    alt: 'People and a laptop working with data',
    lead: 'Turn the information you already have into time saved.',
    text: 'Most businesses sit on useful data and repeat the same manual tasks every week. We organise the data, connect your tools and automate the routine work.',
    points: [
      'Dashboards and reporting',
      'Data cleaning and pipelines',
      'Workflow and task automation',
      'Connecting the tools you already use',
      'AI-assisted tools for your team',
    ],
  },
];

export default function Services() {
  usePageMeta(
    'Our Services | CODE.Z',
    'Web development, cyber security, app development and data automation from CODE.Z.'
  );
  useBodyId('top');
  useReveal();
  useCurves(CURVES);

  return (
    <>
      <Navbar current="services" />

      {/* PAGE HERO */}
      <section className="page-hero">
        <div className="page-hero-inner">

          <div>
            <p className="eyebrow reveal">What we do</p>
            <h1 className="page-title reveal">Our<br />Services</h1>
          </div>

          <div className="page-hero-side reveal delay-1">
            <p className="page-intro">
              Four ways we help you build, protect and run your technology. Pick one to
              see what is included.
            </p>
            <ol className="svc-index">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <a href={'#' + s.id}>
                    <span className="n">{s.num}</span>
                    <span>{s.title}</span>
                    <ArrowDown aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ol>
          </div>

        </div>

        {/* Curved bottom edge: flattens as you scroll (see hooks/useCurves.js) */}
        <div className="curve" aria-hidden="true"><span></span></div>
      </section>

      {/* SERVICES LIST */}
      <section className="svc-list" id="svc-list">
        <div className="svc-list-inner">

          {SERVICES.map((s) => (
            <article className="svc" id={s.id} key={s.id}>
              <div className="card svc-media reveal">
                <img loading="lazy" decoding="async" src={'/about images/' + s.img} alt={s.alt} />
              </div>

              <div className="svc-body">
                <span className="svc-num reveal">{s.num}</span>
                <h2 className="svc-title reveal">{s.title}</h2>
                <p className="svc-lead reveal delay-1">{s.lead}</p>
                <p className="svc-text reveal delay-1">{s.text}</p>
                <ul className="svc-points reveal delay-2">
                  {s.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
                <Link to="/#contact" className="btn-3d reveal delay-2">
                  <span>Contact Us</span>
                  <ArrowUpRight className="btn-arrow" aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}

        </div>
      </section>

      <Footer />
    </>
  );
}
