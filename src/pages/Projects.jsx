import { Link } from 'react-router-dom';
import usePageMeta from '../hooks/usePageMeta.js';
import useBodyId from '../hooks/useBodyId.js';
import useReveal from '../hooks/useReveal.js';
import useCurves from '../hooks/useCurves.js';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import { ArrowUpRight } from '../components/Icons.jsx';
import '../styles/projects.css';

const CURVES = [['#proj-list', '.page-hero .curve', '.proj-list-inner']];

/* =========================================================
   ADD A NEW PROJECT: copy one block below, paste it at the end
   of the list (before the closing ]) and change the details.

   name : project name
   type : short label under the name
   url  : the link a visitor is taken to (opens in a new tab)
   img  : picture or logo, e.g. '/projects/sandstone.jpg'
          (put the file inside the  public/projects  folder).
          Leave it as '' and a coloured box with initials shows instead.
   logo : true  = the image is a logo (shown whole, with space around it)
          false = the image is a photo (fills the box)
   tone : background colour of the box
   ========================================================= */
const PROJECTS = [
  {
    name: 'Sandstone School of Languages',
    type: 'School website',
    url: '', // TODO: paste the link to the Sandstone School of Languages website
    img: '/projects/ChatGPT Image Sep 9, 2026, 10_27_58 PM.png', // TODO: e.g. '/projects/sandstone.jpg'
    logo: false,
    tone: '#efe3d3',
  },
  {
    name: 'Zenas Estates',
    type: 'Real estate website',
    url: '', // TODO: paste the link to the Zenas Estates website
    img: '/projects/WhatsApp Image 2026-05-08 at 4.30.25 PM.jpeg', // TODO: e.g. '/projects/zenas.png'
    logo: true,
    tone: '#5b3ef0',
  },
];

function initials(name) {
  return name
    .split(' ')
    .filter((w) => /^[A-Z]/.test(w))
    .slice(0, 2)
    .map((w) => w[0])
    .join('');
}

function ProjectCard({ p, index }) {
  const delay = ['', ' delay-1', ' delay-2'][index % 3];

  const content = (
    <>
      <div
        className={'card proj-media' + (p.logo ? ' is-logo' : '')}
        style={{ '--tone': p.tone }}
      >
        {p.img ? (
          <img loading="lazy" decoding="async" src={p.img} alt={p.name} />
        ) : (
          <span className="proj-glyph" aria-hidden="true">{initials(p.name)}</span>
        )}
        {p.url && (
          <span className="proj-go" aria-hidden="true">
            <ArrowUpRight />
          </span>
        )}
      </div>

      <div className="proj-info">
        <span className="proj-num">{String(index + 1).padStart(2, '0')}</span>
        <h3 className="proj-name">{p.name}</h3>
        <p className="proj-type">{p.type}</p>
      </div>
    </>
  );

  return (
    <li className={'reveal' + delay}>
      {p.url ? (
        <a
          className="proj"
          href={p.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={p.name + ' (opens in a new tab)'}
        >
          {content}
        </a>
      ) : (
        <div className="proj is-static">{content}</div>
      )}
    </li>
  );
}

export default function Projects() {
  usePageMeta(
    'Our Projects | CODE.Z',
    'Websites and systems CODE.Z has built for schools, real estate companies and more.'
  );
  useBodyId('top');
  useReveal();
  useCurves(CURVES);

  return (
    <>
      <Navbar current="projects" />

      {/* PAGE HERO */}
      <section className="page-hero">
        <div className="page-hero-inner">

          <div>
            <p className="eyebrow reveal">Our work</p>
            <h1 className="page-title reveal">Our<br />Projects</h1>
          </div>

          <div className="page-hero-side reveal delay-1">
            <p className="page-intro">
              A look at some of the people and businesses we have built for. Pick any
              project to visit it live.
            </p>
            <Link to="/#contact" className="btn-3d proj-hero-btn">
              <span>Start a project</span>
              <ArrowUpRight className="btn-arrow" aria-hidden="true" />
            </Link>
          </div>

        </div>

        {/* Curved bottom edge: flattens as you scroll (see hooks/useCurves.js) */}
        <div className="curve" aria-hidden="true"><span></span></div>
      </section>

      {/* PROJECTS */}
      <section className="proj-list" id="proj-list">
        <div className="proj-list-inner">
          <ul className="proj-grid">
            {PROJECTS.map((p, i) => (
              <ProjectCard p={p} index={i} key={p.name} />
            ))}

            {/* The invitation box: always last */}
            <li className={'reveal' + ['', ' delay-1', ' delay-2'][PROJECTS.length % 3]}>
              <Link to="/#contact" className="proj proj-next" aria-label="Start your project with us">
                <div className="proj-media proj-media-next">
                  <span className="proj-plus" aria-hidden="true">+</span>
                </div>
                <div className="proj-info">
                  <span className="proj-num">Next</span>
                  <h3 className="proj-name">Your project</h3>
                  <p className="proj-type">Let&rsquo;s build it together</p>
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <Footer />
    </>
  );
}