import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from '../Icons.jsx';

const SERVICES = [
  { id: 'svc-web', name: <>Web development</>, to: '/services#web-development', label: 'Web development: read more', img: 'IMG_9851.JPG', alt: 'Web development', reveal: 'reveal' },
  { id: 'svc-cyber', name: <>Cyber security</>, to: '/services#cyber-security', label: 'Cyber security: read more', img: 'IMG_9855.JPG', alt: 'Cyber security', reveal: 'reveal delay-1' },
  { id: 'svc-app', name: <>App development</>, to: '/services#app-development', label: 'App development: read more', img: 'IMG_9849.JPG', alt: 'App development', reveal: 'reveal' },
  { id: 'svc-data', name: <>Data &amp; Automation</>, to: '/services#data-automation', label: 'Data and Automation: read more', img: 'IMG_9852.JPG', alt: 'Data and Automation', reveal: 'reveal delay-1' },
];

export default function ServicesSection() {
  const [active, setActive] = useState(null);

  /* Services tabs: scroll to the matching card and highlight the tab */
  const pick = (id) => {
    const target = document.getElementById(id);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setActive(id);
  };

  return (
    <section className="services" id="services">

      <div className="services-inner">
        <h2 className="services-title reveal">Our<br />Services</h2>

        {/* Tabs row (fades at the edges, scrolls sideways on small screens) */}
        <nav className="services-tabs reveal delay-1">
          {SERVICES.map((s) => (
            <button
              key={s.id}
              className={'tab' + (active === s.id ? ' active' : '')}
              onClick={() => pick(s.id)}
            >
              {s.name}
            </button>
          ))}
        </nav>

        <div className="services-grid">
          {SERVICES.map((s) => (
            <article className="service" id={s.id} key={s.id}>
              <h3 className="service-name">{s.name}</h3>
              <Link className={'card service-card ' + s.reveal} to={s.to} aria-label={s.label}>
                <img loading="lazy" decoding="async" src={'/about images/' + s.img} alt={s.alt} />
                <span className="card-go" aria-hidden="true">
                  <ArrowUpRight width="18" height="18" />
                </span>
              </Link>
            </article>
          ))}
        </div>

      </div>

    </section>
  );
}
