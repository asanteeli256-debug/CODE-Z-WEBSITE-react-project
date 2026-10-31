const CARDS = [
  { num: '02', cls: 'card-purple', img: 'IMG_9850.JPG', alt: 'Design and development', title: <>Design &amp; Development</>, text: 'Fast, clean websites and apps people enjoy using.' },
  { num: '03', cls: 'card-teal', img: 'IMG_9856.JPG', alt: 'A handshake between two laptops', title: 'Trusted partnership', text: 'Clear communication and support that lasts after delivery.' },
  { num: '04', cls: 'card-gray', img: 'IMG_9851.JPG', alt: 'Custom digital solutions', title: 'Custom solutions', text: 'Every system is shaped around how your business really works.' },
  { num: '05', cls: 'card-sand', img: 'IMG_9854.JPG', alt: 'Puzzle pieces forming a light bulb', title: 'Smart problem solving', text: 'Technology, security and strategy, fitted together.' },
];

export default function AboutSection() {
  return (
    <section className="about" id="about">

      <div className="about-top">
        <h2 className="about-title reveal">
          Build systems<br />that match<br />no other
        </h2>

        <p className="about-text reveal delay-1">
          We are a technology firm focused on cybersecurity, software
          development, and digital solutions. We build secure, modern
          websites, mobile apps, and custom systems that help businesses
          operate smarter, safer, and more efficiently
        </p>
      </div>

      <div className="about-gallery">

        <div className="gallery-left">
          <div className="card card-big reveal">
            <img loading="lazy" decoding="async" src="/about images/IMG_9853.JPG" alt="A team working together around a table" />
            <figcaption className="card-caption caption-big">
              <span className="cap-num">01</span>
              <h3 className="cap-title">Built together</h3>
              <p className="cap-text">We work side by side with you, from the first idea to launch day and beyond.</p>
            </figcaption>
          </div>
        </div>

        <div className="gallery-side">
          {CARDS.map((c) => (
            <div className={'card ' + c.cls + ' reveal'} key={c.num}>
              <img loading="lazy" decoding="async" src={'/about images/' + c.img} alt={c.alt} />
              <figcaption className="card-caption">
                <span className="cap-num">{c.num}</span>
                <h3 className="cap-title">{c.title}</h3>
                <p className="cap-text">{c.text}</p>
              </figcaption>
            </div>
          ))}
        </div>

      </div>

      {/* Curved bottom edge: flattens as you scroll (see hooks/useCurves.js) */}
      <div className="curve" aria-hidden="true"><span></span></div>

    </section>
  );
}
