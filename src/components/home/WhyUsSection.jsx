import { ArrowUpRight } from '../Icons.jsx';

export default function WhyUsSection() {
  return (
    <section className="whyus" id="why-us">
      <div className="whyus-inner">

        <h2 className="whyus-title reveal">Why Us</h2>

        <p className="whyus-text reveal delay-1">
          We combine innovation, technical expertise, and a problem-solving
          mindset to build reliable, secure, and scalable technology solutions.
          From system design and software development to cybersecurity and
          emerging technologies, we focus on understanding your needs and
          turning your ideas into practical digital solutions. Our goal is not
          just to build technology, but to create lasting value, support your
          growth, and help your business thrive in an ever-evolving digital
          world.
        </p>

        <a href="#services" className="btn-3d reveal delay-2">
          <span>View Our Projects</span>
          <ArrowUpRight className="btn-arrow" aria-hidden="true" />
        </a>

      </div>

      {/* Curved bottom edge: flattens as you scroll (see hooks/useCurves.js) */}
      <div className="curve" aria-hidden="true"><span></span></div>
    </section>
  );
}
