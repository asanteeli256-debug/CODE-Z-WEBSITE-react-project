import { useState } from 'react';
import { ArrowUpRight } from '../Icons.jsx';

export default function ContactSection() {
  const [status, setStatus] = useState('');

  const onSubmit = (e) => {
    e.preventDefault(); // the browser already checked the required fields
    const form = e.currentTarget;

    // TODO: send the data somewhere (see notes). For now we only confirm on screen.
    const data = Object.fromEntries(new FormData(form).entries());
    console.log('Sign up:', data);

    setStatus('Thank you! We have received your details and will be in touch soon.');
    form.reset();
  };

  return (
    <section className="contact" id="contact">
      <div className="contact-inner">

        <h2 className="contact-title reveal">
          Work<br />With<br />Us
        </h2>

        <div className="contact-panel reveal delay-1">
          <form className="signup" id="signupForm" onSubmit={onSubmit}>
            <p className="signup-intro">Tell us a little about your idea and we will get back to you.</p>

            <div className="field">
              <label htmlFor="su-name">Full name</label>
              <input type="text" id="su-name" name="name" autoComplete="name" placeholder="Your name" required />
            </div>

            <div className="field">
              <label htmlFor="su-email">Email</label>
              <input type="email" id="su-email" name="email" autoComplete="email" placeholder="you@company.com" required />
            </div>

            <div className="field">
              <label htmlFor="su-service">What do you need?</label>
              <select id="su-service" name="service" defaultValue="" required>
                <option value="" disabled>Choose a service</option>
                <option>Web development</option>
                <option>Cyber security</option>
                <option>App development</option>
                <option>Data &amp; Automation</option>
                <option>Something else</option>
              </select>
            </div>

            <div className="field">
              <label htmlFor="su-message">Your idea</label>
              <textarea id="su-message" name="message" rows="3" placeholder="A few words about your project"></textarea>
            </div>

            <button type="submit" className="btn-3d btn-submit">
              <span>Send</span>
              <ArrowUpRight className="btn-arrow" aria-hidden="true" />
            </button>

            <p className="signup-status" id="signupStatus" role="status" aria-live="polite">{status}</p>
          </form>
        </div>

      </div>
    </section>
  );
}
